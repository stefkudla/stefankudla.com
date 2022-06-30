export interface PostTypes {
  post: {
    slug: string
    title: string
    status: string
    metadata: {
      content: string
      cover_image: {
        imgix_url: string
      }
      excerpt: string
      created_at: string
      category: {
        title: string
      }
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
  allPostCategories: [
    {
      title: string
    }
  ]
}

export interface WorksTypes {
  allPosts: [
    {
      metadata: {
        category: {
          title: string
        }
      }
    }
  ]
  allWorkCategories: [
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
      status: string
      created_at: string
      metadata: {
        excerpt: string
      }
    }
  ]
  postType: string
  home?: boolean
}
