import { describe, expect, it } from 'vitest'
import { breadcrumbList, SITE_URL } from '@/lib/structured-data'

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Posts', href: '/posts' },
  { name: 'A Post Title' },
]
const pageUrl = `${SITE_URL}/posts/a-post`

describe('breadcrumbList', () => {
  const graph = breadcrumbList(crumbs, pageUrl) as any

  it('numbers positions from one, in order', () => {
    expect(graph.itemListElement.map((i: any) => [i.position, i.name])).toEqual([
      [1, 'Home'],
      [2, 'Posts'],
      [3, 'A Post Title'],
    ])
  })

  it('gives every linked crumb an absolute item URL', () => {
    expect(graph.itemListElement[0].item).toBe(`${SITE_URL}/`)
    expect(graph.itemListElement[1].item).toBe(`${SITE_URL}/posts`)
  })

  it('leaves the current page without an item', () => {
    expect(graph.itemListElement[2]).not.toHaveProperty('item')
  })

  it('uses the @id convention the rest of the graph will reference', () => {
    expect(graph['@id']).toBe(`${pageUrl}#breadcrumb`)
  })
})
