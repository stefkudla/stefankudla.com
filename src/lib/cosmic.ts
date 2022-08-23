const Cosmic = require('cosmicjs')
const api = Cosmic()

const BUCKET_SLUG = process.env.COSMIC_BUCKET_SLUG
const READ_KEY = process.env.COSMIC_READ_KEY

const bucket = api.bucket({
  slug: BUCKET_SLUG,
  read_key: READ_KEY,
})

const is404 = (error: any) => /not found/i.test(error.message)

export async function getPreviewPostBySlug(slug: string) {
  const params = {
    query: { slug },
    status: 'any',
    props: 'slug',
  }

  try {
    const data = await bucket.getObjects(params)
    return data.objects[0]
  } catch (error) {
    if (is404(error)) return
    throw error
  }
}

export async function getAllPostsWithSlug() {
  const params = {
    query: { type: 'posts' },
    props: 'title,slug,metadata,created_at',
  }
  const data = await bucket.getObjects(params)
  return data.objects
}

export async function getAllPosts(
  preview?: boolean,
  postType?: string,
  postCount?: number
) {
  const params = {
    query: { type: postType },
    ...(preview && { status: 'any' }),
    props:
      'title,slug,metadata.category,metadata.excerpt,metadata.published_date,created_at,status',
    limit: postCount,
    sort: '-created_at',
  }
  const data = await bucket.getObjects(params)
  return data.objects
}

export async function getPostAndMorePosts(
  slug: string,
  preview?: boolean | null
) {
  const singleObjectParams = {
    query: { slug: slug },
    ...(preview && { status: 'any' }),
    props: 'slug,title,metadata,created_at',
  }
  const moreObjectParams = {
    query: { type: 'posts' },
    ...(preview && { status: 'any' }),
    limit: 3,
    props: 'title,slug,metadata,created_at',
  }
  const data = await bucket
    .getObjects(singleObjectParams)
    .catch((error: unknown) => {
      // Don't throw if a slug doesn't exist
      if (is404(error)) return
      throw error
    })
  const moreObjects = await bucket.getObjects(moreObjectParams)
  const morePosts = moreObjects.objects
    ?.filter(
      ({ slug: object_slug }: { slug: { object_slug?: string } }) =>
        object_slug !== slug
    )
    .slice(0, 2)

  return {
    post: data?.objects[0],
    morePosts,
  }
}

export async function getCosmicObject(type: string, props: string) {
  const params = {
    query: { type: type },
    props: props,
  }
  const data = await bucket.getObjects(params)
  return data.objects
}
