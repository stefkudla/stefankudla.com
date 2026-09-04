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
 * Post routes come from two places while the migration is in flight: the
 * colocated `content/posts/<slug>/index.mdx` directories (D-08), and the
 * snapshot, which stands in for the posts Cosmic still serves through the
 * fallback in `src/app/posts/[slug]/page.tsx`.
 *
 * **T-20 must delete the snapshot half.** Once all 11 posts are local and the
 * Cosmic branch is gone, the content directory is the only source of truth and
 * this guard goes back to catching a deleted post. Until then a legacy slug is
 * still served either way, so the union is the honest manifest.
 */
export function getRouteManifest(): string[] {
  const snapshot: string[] = JSON.parse(
    fs.readFileSync(SITEMAP_SNAPSHOT, 'utf8')
  )

  if (!fs.existsSync(POSTS_CONTENT_DIR)) {
    return snapshot
  }

  const localPostRoutes = fs
    .readdirSync(POSTS_CONTENT_DIR, { withFileTypes: true })
    .filter(
      entry =>
        entry.isDirectory() &&
        fs.existsSync(path.join(POSTS_CONTENT_DIR, entry.name, 'index.mdx'))
    )
    .map(entry => `/posts/${entry.name}`)

  return [...new Set([...snapshot, ...localPostRoutes])]
}
