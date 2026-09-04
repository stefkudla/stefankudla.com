import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { getRouteManifest } from './route-manifest'

const legacy: { staticRoutes: string[]; postSlugs: string[] } = JSON.parse(
  fs.readFileSync(
    path.join(
      fileURLToPath(new URL('..', import.meta.url)),
      'content',
      'legacy-slugs.json'
    ),
    'utf8'
  )
)

describe('legacy routes', () => {
  it('are all still present in the generated route manifest', () => {
    const manifest = new Set(getRouteManifest())
    const required = [
      ...legacy.staticRoutes,
      ...legacy.postSlugs.map(slug => `/posts/${slug}`),
    ]

    const missing = required.filter(route => !manifest.has(route))

    expect(missing).toEqual([])
  })
})
