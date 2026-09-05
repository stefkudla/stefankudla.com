#!/usr/bin/env node
/**
 * Download every imgix.cosmicjs.com asset referenced by the site into
 * assets/cosmic-archive/<post-slug>/<filename> (site-wide OG under _site/),
 * and write scripts/asset-manifest.json.
 *
 * Sources: post cover_image.imgix_url, imgix URLs inside post metadata.content,
 * and the site-wide OG image hardcoded in src/components/Meta.tsx.
 *
 * Requires scripts/cosmic-export/ (run scripts/export-cosmic.mjs first).
 * Known-dead assets return 403 and are recorded with status "dead".
 *
 * WARNING: two entries in the manifest carry status "recovered" — files pulled
 * from the Wayback Machine (T-03) that imgix still 403s. Re-running this script
 * overwrites the manifest and re-marks them "dead", losing local_path and
 * recovered_from. The files themselves survive on disk; restore those two
 * entries by hand, or do not re-run — the salvage it performs (T-02) is done.
 */
import { mkdir, writeFile, readFile, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const EXPORT = path.join(ROOT, 'scripts', 'cosmic-export', 'by-type', 'posts.json')
const DEST = path.join(ROOT, 'assets', 'cosmic-archive')
const MANIFEST = path.join(ROOT, 'scripts', 'asset-manifest.json')
const META = path.join(ROOT, 'src', 'components', 'Meta.tsx')

const IMGIX_RE = /https:\/\/imgix\.cosmicjs\.com\/[A-Za-z0-9._-]+/g

const stripQuery = url => url.split('?')[0]
const fileNameOf = url => decodeURIComponent(stripQuery(url).split('/').pop())

async function collectRefs() {
  const posts = JSON.parse(await readFile(EXPORT, 'utf8'))
  const refs = []
  const seen = new Set()
  const add = (url, slug, source) => {
    const clean = stripQuery(url)
    const key = `${slug}::${clean}`
    if (seen.has(key)) return
    seen.add(key)
    refs.push({ url: clean, slug, source })
  }

  for (const post of posts) {
    const cover = post.metadata?.cover_image?.imgix_url
    if (cover) add(cover, post.slug, 'cover_image')
    for (const m of (post.metadata?.content || '').match(IMGIX_RE) || []) {
      add(m, post.slug, 'content')
    }
  }

  const meta = await readFile(META, 'utf8')
  for (const m of meta.match(IMGIX_RE) || []) add(m, '_site', 'Meta.tsx')

  return refs
}

async function download(ref) {
  const dir = path.join(DEST, ref.slug)
  const file = path.join(dir, fileNameOf(ref.url))
  const entry = {
    url: ref.url,
    local_path: path.relative(ROOT, file),
    post_slug: ref.slug,
    source: ref.source,
    content_type: null,
    bytes: null,
    status: 'ok',
  }

  const res = await fetch(ref.url)
  if (!res.ok) {
    entry.status = 'dead'
    entry.local_path = null
    entry.http_status = res.status
    return entry
  }

  const declared = Number(res.headers.get('content-length'))
  const buf = Buffer.from(await res.arrayBuffer())
  await mkdir(dir, { recursive: true })
  await writeFile(file, buf)
  const onDisk = (await stat(file)).size

  entry.content_type = res.headers.get('content-type')
  entry.bytes = onDisk
  if (Number.isFinite(declared) && declared > 0 && declared !== onDisk) {
    entry.status = 'truncated'
    entry.content_length = declared
  }
  return entry
}

async function main() {
  const refs = await collectRefs()
  const assets = []
  for (const ref of refs) {
    const entry = await download(ref)
    assets.push(entry)
    console.log(`${entry.status.padEnd(9)} ${entry.bytes ?? '-'}\t${ref.url}`)
  }

  const ok = assets.filter(a => a.status === 'ok')
  const dead = assets.filter(a => a.status === 'dead')
  const bad = assets.filter(a => a.status === 'truncated')
  const gifs = ok.filter(a => (a.content_type || '').includes('gif'))
  const summary = {
    generated_at: new Date().toISOString(),
    total_references: assets.length,
    downloaded: ok.length,
    dead: dead.length,
    truncated: bad.length,
    gif_count: gifs.length,
    total_bytes: ok.reduce((n, a) => n + a.bytes, 0),
  }
  await writeFile(MANIFEST, JSON.stringify({ summary, assets }, null, 2))
  console.log('\n' + JSON.stringify(summary, null, 2))
  if (bad.length) process.exitCode = 1
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
