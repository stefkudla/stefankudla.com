#!/usr/bin/env node
/**
 * T-20 · Import the 11 Cosmic posts into content/posts/<slug>/index.mdx.
 *
 * Run once against the T-01 archive (scripts/cosmic-export/), which is the
 * source of truth — never against rendered HTML (§2.1 of the migration plan).
 * Kept in the repo the way export-cosmic.mjs and download-assets.mjs are: it
 * documents exactly what was converted, and the conversions are the part a
 * reviewer needs to be able to check.
 *
 * Everything it changes is listed in CONVERSIONS below. It invents nothing:
 * titles, excerpts and prose come from the archive verbatim except where D-04
 * requires a rewrite, and those rewrites are quoted from the decision.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const ARCHIVE = path.join(ROOT, 'assets', 'cosmic-archive')
const DEST = path.join(ROOT, 'content', 'posts')
const posts = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'scripts', 'cosmic-export', 'by-type', 'posts.json'), 'utf8')
)

/** D-09's remap, copied from the decision rather than re-derived. */
const CATEGORY = {
  'coding-your-design-system-with-tailwind-css': 'tutorial',
  'how-to-use-nextjs-image-with-a-headless-cms': 'tutorial',
  'building-react-components-from-headless-cms-markdown': 'tutorial',
  'how-to-deploy-a-static-html-css-and-javascript-website-to-vercel': 'tutorial',
  'simple-scroll-animations-with-html-and-javascript-quick-guide': 'tutorial',
  'how-to-create-a-marquee-with-framer-motion-and-react': 'tutorial',
  'how-im-using-cosmic-to-optimize-my-website': 'tutorial',
  'creativity-and-software-development-is-a-wonderful-combination': 'essay',
  'how-i-started-freelancing-as-a-web-developer-in-2022': 'essay',
  'heres-why-all-musicians-need-a-website-in-2022': 'essay',
  'i-built-a-free-sitemap-comparison-tool': 'project',
}

/** The four dead imgix assets. Two were recovered (T-03) and are in the
 *  archive; two are dropped, and D-04 dictates the prose that replaces them. */
const DROPPED_IMAGES = [
  'aafe7660-0527-11ed-b7be-d956591ad437-image-bucket.png',
  '89c95c50-2226-11ed-8337-95a76fda76ff-react-markdown-ast-diagram.png',
]

/** Verbatim from D-04. Each entry must match exactly once or the run aborts. */
const PROSE_REWRITES = {
  'building-react-components-from-headless-cms-markdown': [
    [
      'To further understand this component, let’s reference the diagram above step-by-step.',
      'To further understand this component, let’s walk through what it does step-by-step.',
    ],
  ],
  'how-im-using-cosmic-to-optimize-my-website': [
    [
      "As you can see here, I have all of my images stored in the 'Media' folder, which is there by default.",
      "All of my images live in the 'Media' folder, which is there by default.",
    ],
    // The gag depends on the screenshot being on screen; with no screenshot
    // there is no gag, and D-04 forbids repointing it at images that become
    // repo-local in this very task.
    [' Maybe you guessed it, but even the image of my images is hosted in my image hosting Bucket. *Mind blown*.', ''],
  ],
}

const yamlString = value => {
  // Quote anything that could be read as YAML structure. Always safe.
  const escaped = String(value).replace(/\\/g, '\\\\').replace(/"/g, '\\"')
  return `"${escaped}"`
}

const archiveFiles = slug => {
  const dir = path.join(ARCHIVE, slug)
  return fs.existsSync(dir) ? fs.readdirSync(dir) : []
}

const conversions = []
const note = (slug, kind, detail) => conversions.push({ slug, kind, detail })

for (const post of posts) {
  const { slug } = post
  const category = CATEGORY[slug]
  if (!category) throw new Error(`no D-09 category for ${slug}`)

  let body = post.metadata.content
  const files = archiveFiles(slug)

  // 1. Two bare <img> tags are prose references to the HTML element, not
  //    images. MDX reads them as JSX and fails. The live site renders them as
  //    escaped literal text, so entities keep the output identical — and,
  //    unlike backticks, do not invent two new inline code spans.
  const bareImg = (body.match(/<img>/g) || []).length
  if (bareImg) {
    body = body.replace(/<img>/g, '&lt;img&gt;')
    note(slug, 'bare-img', `${bareImg} escaped to &lt;img&gt;`)
  }

  // 2. Colon fence titles are Cosmic's syntax; rehype-pretty-code needs
  //    title="…". Left alone, the language silently fails to resolve and the
  //    filename is lost.
  const fenceTitles = [...body.matchAll(/^```([a-zA-Z0-9]+):(\S+)$/gm)]
  if (fenceTitles.length) {
    body = body.replace(/^```([a-zA-Z0-9]+):(\S+)$/gm, '```$1 title="$2"')
    note(slug, 'fence-title', fenceTitles.map(m => m[2]).join(', '))
  }

  // 3. Dropped images (D-04) go before the URL rewrite, so a dropped file
  //    cannot be mistaken for a missing local asset.
  for (const dead of DROPPED_IMAGES) {
    const line = new RegExp(`\\n?!\\[[^\\]]*\\]\\([^)]*${dead.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\)\\n?`, 'g')
    if (line.test(body)) {
      body = body.replace(line, '\n')
      note(slug, 'dropped-image', dead)
    }
  }

  // 4. D-04's prose rewrites, each required to match exactly once.
  for (const [from, to] of PROSE_REWRITES[slug] ?? []) {
    const count = body.split(from).length - 1
    if (count !== 1) throw new Error(`${slug}: prose rewrite matched ${count}×, expected 1:\n  ${from}`)
    body = body.replace(from, to)
    note(slug, 'prose-rewrite', `${from.slice(0, 48)}…`)
  }

  // 5. Markdown image references become colocated relative paths. Only those:
  //    `how-to-use-nextjs-image-with-a-headless-cms` also mentions imgix URLs
  //    ten times *inside code fences*, and those are the tutorial's own worked
  //    examples of fetching from Cosmic. Rewriting them would corrupt the
  //    prose to fix an image that was never rendered.
  let rewritten = 0
  body = body.replace(/!\[([^\]]*)\]\(https:\/\/imgix\.cosmicjs\.com\/([^\s)"']+)\)/g, (_, alt, file) => {
    if (!files.includes(file)) throw new Error(`${slug}: no archived file for ${file}`)
    rewritten++
    return `![${alt}](./${file})`
  })
  if (rewritten) note(slug, 'image-urls', `${rewritten} rewritten`)

  const outsideFences = body.replace(/^```[\s\S]*?^```/gm, '')
  const stray = outsideFences.match(/imgix\.cosmicjs\.com/g)
  if (stray) throw new Error(`${slug}: ${stray.length} imgix URLs survived outside code fences`)

  // Cover: the same file, colocated.
  const cover = path.basename(new URL(post.metadata.cover_image.imgix_url).pathname)
  if (!files.includes(cover)) throw new Error(`${slug}: cover ${cover} not in archive`)

  // created_at is what the live site renders. Its UTC date part is what
  // reproduces that rendering in every timezone — see the changelog.
  const date = post.created_at.slice(0, 10)

  const frontmatter = [
    '---',
    `title: ${yamlString(post.title)}`,
    `date: ${date}`,
    `excerpt: ${yamlString(post.metadata.excerpt)}`,
    `category: ${category}`,
    `cover: ./${cover}`,
    '---',
    '',
  ].join('\n')

  const dir = path.join(DEST, slug)
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'index.mdx'), frontmatter + body.trim() + '\n')

  // Copy the post's assets in beside it. Dropped images are skipped.
  for (const file of files) {
    if (DROPPED_IMAGES.includes(file)) continue
    fs.copyFileSync(path.join(ARCHIVE, slug, file), path.join(dir, file))
  }
}

console.log(`imported ${posts.length} posts\n`)
for (const c of conversions) console.log(`  ${c.kind.padEnd(14)} ${c.slug}\n${' '.repeat(18)}${c.detail}`)
