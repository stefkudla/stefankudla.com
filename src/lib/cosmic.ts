const Cosmic = require('cosmicjs')
const api = Cosmic()

const BUCKET_SLUG = process.env.COSMIC_BUCKET_SLUG
const READ_KEY = process.env.COSMIC_READ_KEY

const bucket = api.bucket({
  slug: BUCKET_SLUG,
  read_key: READ_KEY,
})

const is404 = (error: any) => /not found/i.test(error.message)

/*
Get all posts
*/
export async function getAllPosts(preview?: boolean, postCount?: number) {
  try {
    const data = await bucket.objects
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
    const data = await bucket.objects
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
    const data = await bucket.objects
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
    const data = await bucket.objects
      .find({
        slug: slug,
      })
      .props(
        'slug,title,metadata.cover_image.imgix_url,metadata.canonical,metadata.content,metadata.category,created_at'
      )
      .status(preview ? 'any' : 'published')
    return data?.objects[0]
  } catch (error) {
    throw error
  }
}
/*
Get a preview post via slug
*/
export async function getPreviewPostBySlug(slug: string) {
  try {
    const data = await bucket.objects
      .find({
        slug: slug,
      })
      .props('slug')
      .status('any')
    return data.objects[0]
  } catch (error) {
    throw error
  }
}
/*
Get all products
*/

export async function getAllProducts() {
  try {
    const data = await bucket.objects
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
