import type { Metadata } from 'next'

const SITE_OG_IMAGE = '/images/stefan_kudla_ogImage.jpg'

/**
 * The share image as a card. 1200×630 measured on the file itself, which is
 * byte-identical to the copy committed at `public/images/stefan_kudla_ogImage.jpg`.
 * The alt text describes only what the image actually shows.
 */
const SITE_OG_IMAGE_CARD = {
  url: SITE_OG_IMAGE,
  width: 1200,
  height: 630,
  alt: 'The SK monogram logo beside the words "stefankudla.com" and "software developer"',
}

/**
 * The name the site gives itself: every page title is suffixed with it.
 * Not a tagline and not a claim the site does not already make.
 */
const SITE_NAME = 'Stefan Kudla'

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
  alternates: {
    canonical: url,
    types: { 'application/rss+xml': '/feed.xml' },
  },
  openGraph: {
    title,
    description,
    url,
    siteName: SITE_NAME,
    locale: 'en_US',
    type: 'website',
    images: [SITE_OG_IMAGE_CARD],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@stefankudla',
    title,
    description,
    images: [SITE_OG_IMAGE_CARD],
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
