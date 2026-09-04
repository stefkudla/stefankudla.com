import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { z } from 'zod'

/**
 * The repo-local content collections.
 *
 * Posts are colocated (D-08): a post is the directory `content/posts/<slug>/`,
 * holding `index.mdx` and, once T-14 lands, that post's images. Notes are
 * short-form and flat — a note that needs a directory of assets is a post.
 */
const CONTENT_DIR = path.join(process.cwd(), 'content')

/** Closed by D-09. A post carrying anything else fails the build. */
export const POST_CATEGORIES = ['tutorial', 'essay', 'project'] as const

/**
 * `date: 2026-09-04` is parsed by YAML into a `Date`, and quoting it is exactly
 * the kind of detail a drafting agent gets wrong, so accept both and normalise
 * to `YYYY-MM-DD`.
 */
const isoDate = z.preprocess(
  value => (value instanceof Date ? value.toISOString().slice(0, 10) : value),
  z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'must be an ISO date (YYYY-MM-DD)')
)

const postFrontmatter = z.object({
  title: z.string().min(1),
  date: isoDate,
  excerpt: z.string().min(1),
  category: z.enum(POST_CATEGORIES),
  cover: z.string().min(1),
  canonical: z.string().url().optional(),
  updated: isoDate.optional(),
  draft: z.boolean().default(false),
})

/** Deliberately looser than posts: date required, title optional. */
const noteFrontmatter = z.object({
  date: isoDate,
  title: z.string().min(1).optional(),
  draft: z.boolean().default(false),
})

export type PostFrontmatter = z.infer<typeof postFrontmatter>
export type NoteFrontmatter = z.infer<typeof noteFrontmatter>

export type Entry<T> = {
  slug: string
  frontmatter: T
  body: string
  /** Repo-relative, for error messages. */
  file: string
}

export type Post = Entry<PostFrontmatter>
export type Note = Entry<NoteFrontmatter>

const collections = {
  posts: { schema: postFrontmatter, layout: 'directory' },
  notes: { schema: noteFrontmatter, layout: 'file' },
} as const

type CollectionName = keyof typeof collections

/** One malformed file. Carries every field that failed, not just the first. */
export class ContentError extends Error {
  constructor(
    public readonly file: string,
    public readonly problems: string[]
  ) {
    super([`${file}`, ...problems.map(p => `  frontmatter.${p}`)].join('\n'))
    this.name = 'ContentError'
  }
}

const listSources = (
  name: CollectionName
): { slug: string; file: string }[] => {
  const dir = path.join(CONTENT_DIR, name)
  if (!fs.existsSync(dir)) return []

  if (collections[name].layout === 'directory') {
    return fs
      .readdirSync(dir, { withFileTypes: true })
      .filter(entry => entry.isDirectory() && !entry.name.startsWith('_'))
      .map(entry => ({
        slug: entry.name,
        file: path.join(name, entry.name, 'index.mdx'),
      }))
      .filter(source => fs.existsSync(path.join(CONTENT_DIR, source.file)))
  }

  return fs
    .readdirSync(dir)
    .filter(file => file.endsWith('.mdx') && !file.startsWith('_'))
    .map(file => ({
      slug: file.replace(/\.mdx$/, ''),
      file: path.join(name, file),
    }))
}

const read = <T>(
  name: CollectionName,
  source: { slug: string; file: string }
) => {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, source.file), 'utf8')
  const { data, content } = matter(raw)
  const parsed = collections[name].schema.safeParse(data)

  if (!parsed.success) {
    throw new ContentError(
      `content/${source.file}`,
      parsed.error.issues.map(
        issue => `${issue.path.join('.') || '(root)'} — ${issue.message}`
      )
    )
  }

  return {
    slug: source.slug,
    frontmatter: parsed.data as T,
    body: content,
    file: `content/${source.file}`,
  }
}

/** Throws a ContentError naming the file and field on the first bad entry. */
export const getAllPosts = (): Post[] =>
  listSources('posts')
    .map(source => read<PostFrontmatter>('posts', source))
    .sort((a, b) => b.frontmatter.date.localeCompare(a.frontmatter.date))

export const getAllNotes = (): Note[] =>
  listSources('notes')
    .map(source => read<NoteFrontmatter>('notes', source))
    .sort((a, b) => b.frontmatter.date.localeCompare(a.frontmatter.date))

export const getPost = (slug: string): Post | null => {
  const source = listSources('posts').find(entry => entry.slug === slug)
  return source ? read<PostFrontmatter>('posts', source) : null
}

/**
 * Every problem across every collection, rather than stopping at the first —
 * what `bun run validate:content` reports.
 */
export const collectContentErrors = (): ContentError[] => {
  const errors: ContentError[] = []

  for (const name of Object.keys(collections) as CollectionName[]) {
    for (const source of listSources(name)) {
      try {
        read(name, source)
      } catch (error) {
        if (error instanceof ContentError) errors.push(error)
        else throw error
      }
    }
  }

  return errors
}
