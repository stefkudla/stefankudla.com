#!/usr/bin/env node
/**
 * Archive the full Cosmic bucket to JSON.
 *
 * Usage: node scripts/export-cosmic.mjs
 * Reads NEXT_PUBLIC_COSMIC_BUCKET_SLUG and NEXT_PUBLIC_COSMIC_READ_KEY from .env.
 * Output (gitignored): scripts/cosmic-export/
 *   - objects.json          all objects, one array
 *   - by-type/<type>.json   objects grouped by object type
 */
import { mkdir, writeFile, readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT_DIR = path.join(ROOT, 'scripts', 'cosmic-export')
const PROPS = 'slug,title,type,content,metadata,created_at,published_at,modified_at'

async function loadEnv() {
  const raw = await readFile(path.join(ROOT, '.env'), 'utf8')
  for (const line of raw.split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '')
  }
}

async function fetchAll(slug, key) {
  const objects = []
  let skip = 0
  const limit = 100
  for (;;) {
    const url =
      `https://api.cosmicjs.com/v3/buckets/${slug}/objects` +
      `?props=${PROPS}&limit=${limit}&skip=${skip}&read_key=${key}`
    const res = await fetch(url)
    if (!res.ok) throw new Error(`Cosmic ${res.status}: ${await res.text()}`)
    const data = await res.json()
    objects.push(...data.objects)
    if (objects.length >= data.total || data.objects.length === 0) break
    skip += limit
  }
  return objects
}

async function main() {
  await loadEnv()
  const slug = process.env.NEXT_PUBLIC_COSMIC_BUCKET_SLUG
  const key = process.env.NEXT_PUBLIC_COSMIC_READ_KEY
  if (!slug || !key) throw new Error('Missing NEXT_PUBLIC_COSMIC_BUCKET_SLUG / _READ_KEY')

  const objects = await fetchAll(slug, key)
  await mkdir(path.join(OUT_DIR, 'by-type'), { recursive: true })
  await writeFile(
    path.join(OUT_DIR, 'objects.json'),
    JSON.stringify({ exported_at: new Date().toISOString(), bucket: slug, total: objects.length, objects }, null, 2)
  )

  const byType = new Map()
  for (const o of objects) {
    if (!byType.has(o.type)) byType.set(o.type, [])
    byType.get(o.type).push(o)
  }
  for (const [type, items] of byType) {
    await writeFile(path.join(OUT_DIR, 'by-type', `${type}.json`), JSON.stringify(items, null, 2))
  }

  console.log(`Exported ${objects.length} objects to ${path.relative(ROOT, OUT_DIR)}`)
  for (const [type, items] of [...byType].sort()) console.log(`  ${type}: ${items.length}`)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
