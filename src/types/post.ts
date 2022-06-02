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

export interface PostsTypes {
  allPosts: [
    {
      metadata: {
        category: {
          title: string
        }
      }
    }
  ]
  allCategories: [
    {
      title: string
    }
  ]
}

export interface PostHeaderTypes {
  post: {
    title: string
    metadata: {
      cover_image: {
        imgix_url: string
      }
      published_date?: string
      live_url?: string
      repo_url?: string
      category: {
        title: string
      }
    }
    created_at: string
  }
}

export interface PostListTypes {
  allPosts: [
    {
      title: string
      slug: string
      created_at: string
      metadata: {
        excerpt: string
        published_date: string
      }
    }
  ]
  bucketType: string
  home?: boolean
}
