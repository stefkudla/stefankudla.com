import type { Metadata } from 'next'

const SITE_OG_IMAGE =
  'https://imgix.cosmicjs.com/19acc550-cd9f-11ec-831d-dfdedfe3228f-stefankudlaogImage.jpg'

/** The page-level tags `PageMeta` used to render through `next/head`. */
export const pageMetadata = ({
  title,
  description,
  url,
}: {
  title: string
  description: string
  url: string
}): Metadata => ({
  title,
  description,
  openGraph: {
    title,
    description,
    url,
    images: [SITE_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@stefankudla',
    title,
    description,
    images: [SITE_OG_IMAGE],
  },
})

/** The post-level tags `PostMeta` used to render through `next/head`. */
export const postMetadata = ({
  title,
  description,
  canonical,
  imageUrl,
}: {
  title: string
  description: string
  canonical: string
  imageUrl: string
}): Metadata => ({
  title,
  description,
  alternates: {
    canonical,
    types: { 'application/rss+xml': '/feed.xml' },
  },
  openGraph: {
    title,
    description,
    url: canonical,
    type: 'article',
    images: [imageUrl],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@stefankudla',
    title,
    description,
    images: [imageUrl],
  },
})
