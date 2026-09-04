import { describe, expect, it } from 'vitest'
import { collectContentErrors, getAllPosts } from '@/lib/content'

describe('repo-local content', () => {
  it('has no frontmatter problems', () => {
    expect(collectContentErrors().map(error => error.message)).toEqual([])
  })

  it('parses every post into a slug, frontmatter and body', () => {
    for (const post of getAllPosts()) {
      expect(post.slug).toMatch(/^[a-z0-9-]+$/)
      expect(post.body.trim().length).toBeGreaterThan(0)
    }
  })
})
