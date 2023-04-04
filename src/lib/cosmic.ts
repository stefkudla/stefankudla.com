const { createBucketClient } = require('@cosmicjs/sdk')

const BUCKET_SLUG = process.env.NEXT_PUBLIC_COSMIC_BUCKET_SLUG
const READ_KEY = process.env.NEXT_PUBLIC_COSMIC_READ_KEY

const cosmic = createBucketClient({
  bucketSlug: BUCKET_SLUG,
  readKey: READ_KEY,
})

/*
Get all posts
*/
export async function getAllPosts(preview?: boolean, postCount?: number) {
  try {
    const data = await cosmic.objects
      .find({
        type: 'posts',
      })
      .props('title,slug,metadata.excerpt,metadata.category,created_at')
      .limit(postCount)
      .sort('-created_at')
      .status(preview ? 'any' : 'published')
    return data.objects
  } catch (error) {
    throw error
  }
}

/*
Get all post paths
*/
export async function getAllPostPaths() {
  try {
    const data = await cosmic.objects
      .find({
        type: 'posts',
      })
      .props('slug')
      .status('published')
    return data.objects
  } catch (error) {
    throw error
  }
}

/*
Get all post categories
*/

export async function getAllPostCategories() {
  try {
    const data = await cosmic.objects
      .find({
        type: 'post-categories',
      })
      .props('title')
      .status('published')
    return data.objects
  } catch (error) {
    throw error
  }
}

/*
Get a single post via slug
*/
export async function getSinglePost(slug: string, preview?: boolean | null) {
  try {
    const data = await cosmic.objects
      .findOne({
        slug: slug,
      })
      .props(
        'slug,title,metadata.cover_image.imgix_url,metadata.canonical,metadata.content,metadata.category,created_at,metadata.excerpt'
      )
      .status(preview ? 'any' : 'published')
    return data.object
  } catch {
    return null
  }
}
/*
Get a preview post via slug
*/
export async function getPreviewPostBySlug(slug: string) {
  try {
    const data = await cosmic.objects
      .findOne({
        slug: slug,
      })
      .props('slug')
      .status('any')
    return data.object
  } catch (error) {
    throw error
  }
}
/*
Get all products
*/

export async function getAllProducts() {
  try {
    const data = await cosmic.objects
      .find({
        type: 'products',
      })
      .props(
        'title,metadata.category,metadata.product_link,metadata.description,metadata.product_image.imgix_url'
      )
      .status('published')
    return data.objects
  } catch (error) {
    throw error
  }
}

export async function getObjectsByType(type: string) {
  try {
    const data = await cosmic.objects
      .find({
        type: type,
      })
      .props('title,slug,metadata')
      .status('published')
    return data.objects
  } catch (error) {
    throw error
  }
}

export async function getSingleObjectByType({
  type,
  slug,
  props,
}: {
  type: string
  slug: string
  props?: string
}): Promise<any> {
  try {
    const data = await cosmic.objects
      .find({
        type: type,
        slug: slug,
      })
      .props(props ?? 'title,slug,metadata')
      .status('published')
    return data.objects
  } catch (error) {
    throw error
  }
}
