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
    <ul className="flex flex-wrap gap-y-2 sm:gap-y-0 gap-x-4 my-4">
      <li
        className={
          'All' === selected
            ? 'cursor-pointer font-bold filter--active transition'
            : 'cursor-pointer text-fore-subtle transition'
        }
        key={'All'}
      >
        <button onClick={() => handleSelection('All')}>All</button>
      </li>
      {categories.map(category => (
        <li
          className={
            category.title === selected
              ? 'cursor-pointer font-bold filter--active transition'
              : 'cursor-pointer text-fore-subtle transition hover:text-accent'
          }
          key={category.title}
        >
          <button onClick={() => handleSelection(category.title)}>
            {category.title}
          </button>
        </li>
      ))}
    </ul>
  )
}
export default CategoryFilter
