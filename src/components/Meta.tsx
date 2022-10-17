import Head from 'next/head'

export const Meta: React.FC = () => (
  <Head>
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="/favicon/apple-touch-icon.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="/favicon/favicon-32x32.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="/favicon/favicon-16x16.png"
    />
    <link rel="manifest" href="/favicon/site.webmanifest" />
    <link
      rel="mask-icon"
      href="/favicon/safari-pinned-tab.svg"
      color="#000000"
    />
    <link rel="shortcut icon" href="/favicon/favicon.ico" />
    <meta name="msapplication-TileColor" content="#000000" />
    <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
    <meta name="theme-color" content="#000" />
    <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
  </Head>
)

export const PageMeta: React.FC<{
  title: string
  description: string
  url: string
}> = ({ title, description, url }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta
        property="og:image"
        content="https://imgix.cosmicjs.com/19acc550-cd9f-11ec-831d-dfdedfe3228f-stefankudlaogImage.jpg"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@stefankudla" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta
        name="twitter:image"
        content="https://imgix.cosmicjs.com/19acc550-cd9f-11ec-831d-dfdedfe3228f-stefankudlaogImage.jpg"
      />
    </Head>
  )
}

export const PostMeta: React.FC<{
  title: string
  description: string
  slug: string
  page: string
  imageUrl: string
  canonical?: string
}> = ({ title, description, slug, page, imageUrl, canonical }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta
        property="og:url"
        content={
          canonical ? canonical : `https://stefankudla.com/${page}/${slug}`
        }
      />
      <meta property="og:type" content="article" />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@stefankudla" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      {canonical && <link rel="canonical" href={canonical}></link>}
    </Head>
  )
}
