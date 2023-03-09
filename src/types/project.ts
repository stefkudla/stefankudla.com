import { CosmicImage } from './generics'

export interface ProjectPageData {
  title: string
  metadata: {
    subheading: string
  }
}

export interface Project {
  title: string
  slug: string
  metadata: {
    subheading?: string
    image?: CosmicImage
    info?: { title: string }[]
    tech?: { title: string }[]
    project_url: string
  }
}
