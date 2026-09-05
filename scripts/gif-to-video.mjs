#!/usr/bin/env node
/**
 * D-05 · Convert every colocated GIF to MP4 and rewrite the posts that use it.
 *
 * Requires ffmpeg on PATH. This is a one-off run against the imported posts,
 * kept in the repo so the encode settings are recoverable rather than folklore.
 *
 * Settings, and why:
 * - H.264 / yuv420p in MP4. Universal playback. VP9/WebM was measured and
 *   rejected: it saves ~0.8 MB across all seven, is *larger* than H.264 on the
 *   marquee clip, and doubles the committed assets for that.
 * - CRF 28. Compared frame-for-frame against the source GIFs on the most
 *   text-heavy capture; indistinguishable, and roughly half the size of CRF 23.
 * - fps=15. Several sources run at 1-4 fps, which some players seek badly.
 *   Duplicate frames cost a low-motion H.264 encode almost nothing.
 * - Even dimensions, because yuv420p requires them.
 *
 * A poster frame is written beside each video. It must be committed, not
 * derived at build time: Vercel's build image has no ffmpeg. The poster is
 * also where `copy-content-images.ts` reads the video's dimensions from, so
 * the two are the same size by construction. It comes from `sharp` rather than
 * ffmpeg because Homebrew's ffmpeg build has no libwebp, and sharp — already a
 * dependency for the image manifest — reads the GIF's first frame directly.
 *
 * The GIFs stay in assets/cosmic-archive/. Two of them exist only because they
 * were recovered from the Wayback Machine (T-03) and cannot be fetched again.
 */
import { execFileSync } from 'node:child_process'
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const POSTS = path.join(ROOT, 'content', 'posts')

const ff = args => execFileSync('ffmpeg', ['-nostdin', '-loglevel', 'error', '-y', ...args])
const SCALE = 'fps=15,scale=trunc(iw/2)*2:trunc(ih/2)*2'
const results = []

for (const slug of fs.readdirSync(POSTS)) {
  const dir = path.join(POSTS, slug)
  if (!fs.statSync(dir).isDirectory()) continue
  const mdxPath = path.join(dir, 'index.mdx')
  let mdx = fs.readFileSync(mdxPath, 'utf8')
  let touched = false

  for (const file of fs.readdirSync(dir)) {
    if (path.extname(file).toLowerCase() !== '.gif') continue
    const base = file.slice(0, -4)
    const gif = path.join(dir, file)
    const mp4 = path.join(dir, `${base}.mp4`)
    const poster = path.join(dir, `${base}.poster.webp`)

    ff(['-i', gif, '-movflags', '+faststart', '-pix_fmt', 'yuv420p', '-vf', SCALE,
        '-c:v', 'libx264', '-crf', '28', '-preset', 'slow', '-an', mp4])
    // page 0 is the first frame; sharp would otherwise stack every frame.
    await sharp(gif, { page: 0 }).webp({ quality: 80 }).toFile(poster)

    const before = fs.statSync(gif).size
    const after = fs.statSync(mp4).size + fs.statSync(poster).size
    results.push({ slug, file, before, after })

    // The markdown stays markdown: `![alt](./x.mp4)`. MdxImage renders a
    // <video> for a video extension, so the alt text survives the conversion
    // into a caption and an aria-label instead of being dropped.
    const ref = `](./${file})`
    if (!mdx.includes(ref)) throw new Error(`${slug}: ${file} is not referenced by index.mdx`)
    mdx = mdx.split(ref).join(`](./${base}.mp4)`)
    touched = true

    fs.unlinkSync(gif) // the original stays in assets/cosmic-archive/
  }

  if (touched) fs.writeFileSync(mdxPath, mdx)
}

let b = 0, a = 0
for (const r of results) {
  b += r.before; a += r.after
  console.log(`${(r.before / 1024).toFixed(0).padStart(6)}K -> ${(r.after / 1024).toFixed(0).padStart(6)}K  ${r.file}`)
}
console.log(`\n${results.length} converted · ${(b / 1048576).toFixed(2)} MB -> ${(a / 1048576).toFixed(2)} MB (${(100 * a / b).toFixed(1)}%, saving ${((b - a) / 1048576).toFixed(2)} MB)`)
