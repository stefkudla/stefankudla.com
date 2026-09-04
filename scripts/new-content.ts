/**
 * Scaffolds a post or a note from `content/_templates/`.
 *
 *   bun run new:post my-post-slug "My Post Title"
 *   bun run new:note my-note-slug "Optional Title"
 *
 * The slug is the URL and is permanent once published — see AGENTS.md.
 */
import fs from 'node:fs'
import path from 'node:path'

const [kind, slug, title] = process.argv.slice(2)

if (kind !== 'post' && kind !== 'note') {
  console.error('usage: bun scripts/new-content.ts <post|note> <slug> [title]')
  process.exit(1)
}

if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
  console.error(`slug must be lowercase letters, digits and hyphens: got "${slug ?? ''}"`)
  process.exit(1)
}

const root = process.cwd()
const template = fs.readFileSync(
  path.join(root, 'content', '_templates', `${kind}.mdx`),
  'utf8'
)

const file =
  kind === 'post'
    ? path.join(root, 'content', 'posts', slug, 'index.mdx')
    : path.join(root, 'content', 'notes', `${slug}.mdx`)

if (fs.existsSync(file)) {
  console.error(`${path.relative(root, file)} already exists`)
  process.exit(1)
}

const filled = template
  .replace('DATE', new Date().toISOString().slice(0, 10))
  .replace('TITLE', title ?? slug.replace(/-/g, ' '))

fs.mkdirSync(path.dirname(file), { recursive: true })
fs.writeFileSync(file, filled)

console.log(`created ${path.relative(root, file)}`)
if (kind === 'post') {
  console.log(`put this post's images in content/posts/${slug}/ next to the MDX`)
}
