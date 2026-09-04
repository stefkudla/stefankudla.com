import fs from 'node:fs'
import path from 'node:path'

export type ImageRecord = {
  src: string
  width?: number
  height?: number
  blurDataURL?: string
  animated: boolean
}

const MANIFEST = path.join(
  process.cwd(),
  'content',
  '.generated',
  'images.json'
)

/**
 * Written by `scripts/copy-content-images.ts` during `prebuild`. Missing means
 * the script has not run — `bun run dev` on a fresh clone, say — in which case
 * colocated images resolve to their public path without dimensions.
 */
const manifest: Record<string, ImageRecord> = fs.existsSync(MANIFEST)
  ? JSON.parse(fs.readFileSync(MANIFEST, 'utf8'))
  : {}

/**
 * Resolves an image reference from a post's MDX or its `cover` frontmatter.
 * Absolute paths and remote URLs pass through untouched, so a post can still
 * point at `/images/…` or an imgix URL; anything else is treated as colocated.
 */
export const resolveImage = (slug: string, src: string): ImageRecord => {
  if (src.startsWith('/') || src.startsWith('http')) {
    return { src, animated: src.toLowerCase().endsWith('.gif') }
  }

  const key = `${slug}/${src.replace(/^\.\//, '')}`
  return manifest[key] ?? { src: `/content/posts/${key}`, animated: false }
}
