import cn from 'classnames'
import { motion } from 'framer-motion'
import { useState } from 'react'

interface FilterTypes {
  categories: [category: { title: string }]
  handleSelection: Function
  selected: string
}

const Underline = () => {
  return (
    <motion.span
      layoutId={`underline__category`}
      layout
      className="bg-accent"
      style={{
        width: '100%',
        position: 'absolute',
        bottom: '-2px',
        left: 0,
        height: '2px',
      }}
      transition={{
        type: 'spring',
        bounce: 0,
        duration: 0.6,
        ease: 'easeInOut',
      }}
    />
  )
}

const CategoryFilter: React.FC<FilterTypes> = ({
  categories,
  handleSelection,
  selected,
}) => {
  const [isSelected, setIsSelected] = useState('All')

  return (
    <ul className="flex flex-wrap gap-y-3 gap-x-8 sm:gap-y-0 md:border-b-[2px] border-b-gray-300 dark:border-b-dark-gray-400 w-full pb-0 font-bold text-lg text-fore-subtle">
      <li key={'All'}>
        <button
          className={cn('cursor-pointer relative', {
            'text-fore-primary': selected === 'All',
          })}
          onClick={() => {
            handleSelection('All')
            setIsSelected('All')
          }}
        >
          {isSelected === selected && <Underline />}
          View all
        </button>
      </li>
      {categories.map(category => (
        <li key={category.title}>
          <button
            className={cn(
              'cursor-pointer relative',
              category.title === selected ? 'text-fore-primary' : ''
            )}
            onClick={() => {
              handleSelection(category.title)
              setIsSelected(category.title)
            }}
          >
            {isSelected === category.title && <Underline />}
            {category.title}
          </button>
        </li>
      ))}
    </ul>
  )
}
export default CategoryFilter
