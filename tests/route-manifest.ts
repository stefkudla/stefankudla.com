import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const REPO_ROOT = fileURLToPath(new URL('..', import.meta.url))

/** Where post content lives. */
const POSTS_CONTENT_DIR = path.join(REPO_ROOT, 'content', 'posts')

/**
 * Snapshot of the routes `next build && next-sitemap` generated
 * (`public/sitemap.xml`), which is itself gitignored.
 *
 * **Only its static routes are used now.** T-20 imported all 11 posts, so post
 * routes come from `content/posts/` alone and the snapshot's copies of them are
 * ignored — otherwise a deleted post would still look present and this guard
 * would stop catching the thing it exists to catch.
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
 * Static routes come from the sitemap snapshot; **post routes come from
 * `content/posts/` and nowhere else**, so deleting a post's directory makes
 * this manifest shrink and the slug-parity guard fail — which is the point.
 */
export function getRouteManifest(): string[] {
  const staticRoutes: string[] = JSON.parse(
    fs.readFileSync(SITEMAP_SNAPSHOT, 'utf8')
  ).filter((route: string) => !route.startsWith('/posts/'))

  const localPostRoutes = fs
    .readdirSync(POSTS_CONTENT_DIR, { withFileTypes: true })
    .filter(
      entry =>
        entry.isDirectory() &&
        fs.existsSync(path.join(POSTS_CONTENT_DIR, entry.name, 'index.mdx'))
    )
    .map(entry => `/posts/${entry.name}`)

  return [...new Set([...staticRoutes, ...localPostRoutes])]
}
