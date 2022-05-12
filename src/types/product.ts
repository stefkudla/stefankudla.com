export interface ProductProps {
  allProducts: [
    {
      metadata: {
        category: string
        description: string
        product_image: {
          imgix_url: string
        }
        product_link: string
      }
      title: string
    }
  ]
}
