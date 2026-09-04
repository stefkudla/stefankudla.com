/**
 * Structured data as pure functions returning plain objects, so a graph can be
 * asserted in a test without rendering a page.
 *
 * `@id` values follow the convention T-28 sets out — `<page-url>#breadcrumb`,
 * `https://stefankudla.com/#person`, and so on — so when T-28 builds the full
 * site and page graphs, consumers stitch these scripts together instead of
 * seeing two unrelated ones.
 */
export const SITE_URL = 'https://stefankudla.com'

export type Crumb = {
  name: string
  /** Absent on the current page, which is a crumb but not a link. */
  href?: string
}

export const breadcrumbList = (crumbs: Crumb[], pageUrl: string) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  '@id': `${pageUrl}#breadcrumb`,
  itemListElement: crumbs.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.name,
    // The final crumb carries no `item`: it is the page being viewed, and
    // Google treats a self-referencing last item as redundant.
    ...(crumb.href ? { item: `${SITE_URL}${crumb.href}` } : {}),
  })),
})
