import React from 'react'
import { DeskSetupIcon } from '@/configs/icons'
import ProductCard from '@/components/ProductCard'
import { ProductProps } from '@/types/product'

const SetupSection: React.FC<ProductProps> = ({ allProducts }) => {
  const officeProducts = allProducts.filter(
    products => products.metadata.category === 'office'
  )
  return (
    <section className="mt-24">
      <span className="flex items-center mb-8">
        <div className="icon-border">
          <DeskSetupIcon />
        </div>
        <h4 className="text-xl text-accent font-semibold">Setup</h4>
      </span>
      <p className="mb-12 text-fore-subtle">
        My primary setup used to code and make awesome things
      </p>
      <ul className="flex flex-wrap justify-start md:justify-between gap-8 md:gap-16">
        {officeProducts.map(product => (
          <li className="w-fit" key={product.title}>
            <ProductCard
              productName={product.title}
              description={product.metadata.description}
              imgPath={product.metadata.product_image.imgix_url}
              productLink={product.metadata.product_link}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default SetupSection
