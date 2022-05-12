import React from 'react'

interface ProductCardProps {
  imgPath: string
  productName: string
  description: string
  productLink: string
}

const ProductCard: React.FC<ProductCardProps> = ({
  productName,
  imgPath,
  description,
  productLink,
}) => {
  return (
    <>
      <a
        href={productLink}
        className="hover:opacity-70 w-auto transition-opacity"
      >
        <div className="w-[230px] h-[270px] border rounded-md">
          <div className="flex justify-center items-center bg-back-secondary h-3/5 rounded-t-md">
            <img src={imgPath} className="w-[130px]" />
          </div>
          <div className="p-5 bg-white dark:bg-slate-900 rounded-b-md h-2/5">
            <h4 className="font-bold text-sm">{productName}</h4>
            <p className="text-sm pt-2">{description}</p>
          </div>
        </div>
      </a>
    </>
  )
}

export default ProductCard
