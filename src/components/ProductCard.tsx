import Image from 'next/image'

interface ProductCardTypes {
  imgPath: string
  productName: string
  description: string
  productLink: string
}

const ProductCard: React.FC<ProductCardTypes> = ({
  productName,
  imgPath,
  description,
  productLink,
}) => (
  <a href={productLink} className="hover:opacity-100 w-auto transition-opacity">
    <div className="w-[230px] h-[270px] border rounded-md shadow-md hover:shadow-lg shadow-slate-300 hover:shadow-slate-300 transition dark:shadow-accent">
      <div className="flex justify-center items-center bg-back-secondary h-3/5 rounded-t-md">
        <Image
          src={imgPath}
          width={130}
          height={130}
          quality={25}
          alt={productName}
        />
      </div>
      <div className="p-5 bg-white dark:bg-slate-900 rounded-b-md h-2/5">
        <h4 className="font-bold text-sm">{productName}</h4>
        <p className="text-sm pt-2">{description}</p>
      </div>
    </div>
  </a>
)

export default ProductCard
