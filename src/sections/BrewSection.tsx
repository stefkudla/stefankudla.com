import React from 'react'
import { CoffeePotIcon } from '@/components/icons'
import ProductCard from '@/components/ProductCard'
import { ProductProps } from '@/types/product'

const BrewSection: React.FC<ProductProps> = ({ allProducts }) => {
  const coffeeProducts = allProducts.filter(
    product => product.metadata.category === 'coffee'
  )
  return (
    <section className="mt-24">
      <span className="flex items-center mb-8">
        <div className="bg-back-subtle p-2 mr-4 rounded-full">
          <CoffeePotIcon />
        </div>
        <h4 className="text-xl text-accent font-semibold">Brew</h4>
      </span>
      <p className="mb-12 text-fore-subtle">
        I'm a <i>massive</i> coffee nerd and need to make more money just to
        spend it all on more equipment...
      </p>
      <ul className="flex flex-wrap justify-start md:justify-between gap-8 md:gap-16">
        {coffeeProducts.map(product => (
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

export default BrewSection