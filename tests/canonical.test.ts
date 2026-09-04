import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { pageMetadata, postMetadata } from '@/lib/metadata'
import { getRouteManifest } from './route-manifest'

const REPO_ROOT = fileURLToPath(new URL('..', import.meta.url))
const APP_DIR = path.join(REPO_ROOT, 'src', 'app')
const SITE_ORIGIN = 'https://stefankudla.com'

/**
 * Every static route's `page.tsx`, as `{ route, source }`.
 *
 * Static only: a `[slug]` segment has no single URL to compare against, and
 * the two dynamic routes are covered by the helper tests below instead.
 */
const staticPages = (): { route: string; file: string; source: string }[] => {
  const out: { route: string; file: string; source: string }[] = []

  const walk = (dir: string, segments: string[]) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        if (entry.name.startsWith('[')) continue
        walk(full, [...segments, entry.name])
      } else if (entry.name === 'page.tsx') {
        out.push({
          route: segments.length ? `/${segments.join('/')}` : '/',
          file: path.relative(REPO_ROOT, full),
          source: fs.readFileSync(full, 'utf8'),
        })
      }
    }
  }

  walk(APP_DIR, [])
  return out.sort((a, b) => a.route.localeCompare(b.route))
}

const PAGES = staticPages()

describe('pageMetadata', () => {
  const meta = pageMetadata({
    title: 'T',
    description: 'D',
    url: 'https://stefankudla.com/about',
  })

  it('sets a self-referencing absolute canonical', () => {
    expect(meta.alternates?.canonical).toBe('https://stefankudla.com/about')
  })

  it('keeps the feed alternate the root layout would otherwise supply', () => {
    // `alternates` replaces the layout's wholesale, so it has to carry this.
    expect(meta.alternates?.types).toEqual({
      'application/rss+xml': '/feed.xml',
    })
  })

  it('declares the page as a website in en_US, named for the site', () => {
    // `OpenGraph` is a union discriminated on `type`, so read it untyped.
    const og = meta.openGraph as Record<string, unknown>
    expect(og.type).toBe('website')
    expect(og.locale).toBe('en_US')
    expect(og.siteName).toBe('Stefan Kudla')
  })

  it('gives the share image dimensions and alt in og and twitter alike', () => {
    const image = {
      url: '/images/stefan_kudla_ogImage.jpg',
      width: 1200,
      height: 630,
      alt: 'The SK monogram logo beside the words "stefankudla.com" and "software developer"',
    }

    expect(meta.openGraph?.images).toEqual([image])
    expect(meta.twitter?.images).toEqual([image])
  })
})

describe('postMetadata', () => {
  const meta = postMetadata({
    title: 'T',
    description: 'D',
    canonical: 'https://stefankudla.com/posts/a-slug',
    imageUrl: 'https://example.com/cover.png',
  })

  it('still sets its canonical, as it always has', () => {
    expect(meta.alternates?.canonical).toBe(
      'https://stefankudla.com/posts/a-slug'
    )
  })

  it('is unchanged: an article whose image is the bare cover URL', () => {
    const og = meta.openGraph as Record<string, unknown>
    expect(og.type).toBe('article')
    expect(meta.openGraph?.images).toEqual(['https://example.com/cover.png'])
    expect(meta.twitter?.images).toEqual(['https://example.com/cover.png'])
    expect(meta.openGraph).not.toHaveProperty('siteName')
    expect(meta.openGraph).not.toHaveProperty('locale')
  })
})

describe('every static route carries its own canonical', () => {
  it.each(PAGES)('$route', ({ route, file, source }) => {
    const helper = source.match(/\b(pageMetadata|postMetadata)\(\{/)
    expect(helper, `${file} builds metadata by hand, so it has no canonical`)
      .not.toBeNull()

    const url = source.match(/\b(?:url|canonical): '([^']+)'/)
    expect(url, `${file} passes no literal URL to ${helper?.[1]}`).not.toBeNull()

    const expected = route === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${route}`
    expect(url?.[1]).toBe(expected)
  })

  it('covers every static route in the manifest', () => {
    const covered = new Set(PAGES.map(page => page.route))
    const staticRoutes = getRouteManifest().filter(
      route => !route.startsWith('/posts/') && !route.startsWith('/notes/')
    )

    expect(staticRoutes.filter(route => !covered.has(route))).toEqual([])
  })
})
