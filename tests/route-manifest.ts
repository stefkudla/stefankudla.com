import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const REPO_ROOT = fileURLToPath(new URL('..', import.meta.url))

/** Where the MDX migration will land post content. */
const POSTS_CONTENT_DIR = path.join(REPO_ROOT, 'content', 'posts')

/**
 * Snapshot of the routes in the sitemap that `next build && next-sitemap`
 * generated (`public/sitemap.xml`).
 *
 * Why a snapshot: post routes are currently produced at build time from the
 * Cosmic API (`getAllPostPaths()` in src/lib/cosmic.ts), and the generated
 * sitemap itself is gitignored. Reading either would make this test depend on
 * the network and on a prior build. The snapshot keeps the test offline and
 * deterministic, and is honest about being a point-in-time copy of real
 * generated output rather than a hand-written list.
 *
 * Refresh it with `bun run build` followed by re-extracting the <loc> values
 * from public/sitemap.xml.
 */
const SITEMAP_SNAPSHOT = path.join(
  REPO_ROOT,
  'tests',
  'fixtures',
  'generated-sitemap-routes.json'
)

/**
 * The site's route manifest, as a list of pathnames.
 *
 * This is the single seam to repoint after the MDX migration: once
 * `content/posts/*.mdx` exists it becomes the source of truth for post routes
 * automatically, and the snapshot only supplies the non-post routes.
 */
export function getRouteManifest(): string[] {
  const snapshot: string[] = JSON.parse(
    fs.readFileSync(SITEMAP_SNAPSHOT, 'utf8')
  )
  const nonPostRoutes = snapshot.filter(route => !route.startsWith('/posts/'))

  if (!fs.existsSync(POSTS_CONTENT_DIR)) {
    return snapshot
  }

  const postRoutes = fs
    .readdirSync(POSTS_CONTENT_DIR)
    .filter(file => file.endsWith('.mdx'))
    .map(file => `/posts/${file.replace(/\.mdx$/, '')}`)

  return [...nonPostRoutes, ...postRoutes]
}
