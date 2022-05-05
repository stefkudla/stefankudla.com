export interface PostTypes {
  post: {
    slug: string
    title: string
    status: string
    metadata: {
      cover_image: {
        imgix_url: string
      }
      excerpt: string
      published_date: string
      created_at: string
      category: string
    }
    content: string
    created_at: string
  }
}
