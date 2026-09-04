import type { Note } from '@/lib/content'

/**
 * A note's title is optional, so its display name falls back to its date.
 * `noteTitle` is what a permalink's `<title>`, the stream heading and the feed
 * all use, so they never disagree.
 */
export const noteTitle = (note: Note): string =>
  note.frontmatter.title ?? `Note — ${note.frontmatter.date}`
