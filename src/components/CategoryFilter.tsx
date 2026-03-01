import cn from 'classnames'
import { motion } from 'framer-motion'

interface FilterTypes {
  categories: [category: { title: string }]
  handleSelection: Function
  selected: string
}

const CategoryFilter: React.FC<FilterTypes> = ({
  categories,
  handleSelection,
  selected,
}) => {
  const allCategories = [{ title: 'All' }, ...categories]

  return (
    <div className="w-full">
      <ul className="flex flex-wrap gap-2 md:gap-3">
        {allCategories.map(category => {
          const isActive =
            category.title === 'All'
              ? selected === 'All'
              : selected === category.title

          return (
            <li key={category.title}>
              <button
                className={cn(
                  'relative cursor-pointer rounded-full px-4 py-1.5 md:px-5 md:py-2 text-sm md:text-base font-semibold whitespace-nowrap transition-colors',
                  isActive ? 'text-white' : 'text-fore-subtle hover:text-fore-primary'
                )}
                onClick={() => handleSelection(category.title)}
              >
                {isActive && (
                  <motion.span
                    layoutId="category-pill"
                    className="absolute inset-0 rounded-full bg-accent"
                    transition={{
                      type: 'spring',
                      bounce: 0.15,
                      duration: 0.5,
                    }}
                  />
                )}
                <span className="relative z-10">
                  {category.title === 'All' ? 'All' : category.title}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
export default CategoryFilter
