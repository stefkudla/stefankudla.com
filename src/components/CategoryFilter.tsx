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
  return (
    <ul className="flex flex-wrap gap-2 sm:gap-y-0 my-4 ">
      <li key={'All'}>
        <button
          className={'All' === selected ? 'filter-item-active' : 'filter-item'}
          onClick={() => handleSelection('All')}
        >
          All
        </button>
      </li>
      {categories.map(category => (
        <li key={category.title}>
          <button
            className={
              category.title === selected ? 'filter-item-active' : 'filter-item'
            }
            onClick={() => handleSelection(category.title)}
          >
            {category.title}
          </button>
        </li>
      ))}
    </ul>
  )
}
export default CategoryFilter
