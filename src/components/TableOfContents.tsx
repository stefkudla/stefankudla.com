import { useState, useEffect, useRef, SetStateAction, Dispatch } from 'react'
import { useIntersectionObserver } from '@/utils/TableOfContents'
import cn from 'classnames'

interface Section {
  topic: string
  heading: string
  isActive: boolean
}

type SetActiveId = Dispatch<SetStateAction<unknown>>

type TableofContentsProps = {
  wrapperClassNames?: string
}

const TableOfContents = ({ wrapperClassNames }: TableofContentsProps) => {
  const [sections, setSections] = useState<Section[]>([])
  const [activeId, setActiveId] = useState()
  const refs = useRef<{ [index: number]: HTMLLIElement }>({})

  useIntersectionObserver(setActiveId as SetActiveId)

  useEffect(() => {
    const els: HTMLElement[] = Array.from(document.querySelectorAll('h2'))
    const allSections =
      els?.map((el: HTMLElement, index: number) => {
        return {
          topic: el?.getAttribute('id')!,
          heading: el?.innerText,
          isActive: index === 0,
        }
      }) || []
    setSections(allSections)
  }, [])

  return (
    <div
      className={cn(
        'sticky top-4 py-2 xl:top-0 xl:absolute xl:h-full z-10  hidden lg:block',
        wrapperClassNames
      )}
    >
      <nav
        aria-label="Table of contents"
        className="lg:h-screen max-w-full lg:sticky lg:top-10 text-sm z-20 text-gray-500 dark:text-dark-gray-500 px-2 ml-2 lg:w-[260px]"
      >
        <span className="hidden lg:block text-xs py-1 px-2 text-gray-400 dark:text-dark-gray-400 uppercase font-semibold mb-2">
          Table of contents
        </span>
        <ul className="flex lg:flex-col items-center lg:items-start w-full max-w-xl mx-auto gap-x-4 lg:gap-x-0 py-2 lg:py-0 whitespace-nowrap lg:whitespace-normal">
          {sections
            .filter(section => section.topic !== null)
            ?.map((section: Section, index: number) => {
              const getRef = (element: HTMLLIElement) => {
                refs.current[index] = element
              }

              return (
                <li
                  key={section.topic + index}
                  ref={getRef}
                  className={cn(
                    'rounded-lg w-full',
                    activeId === section.topic
                      ? 'bg-back-subtle text-accent font-semibold translate-x-2 transition-transform'
                      : 'transition-transform'
                  )}
                >
                  <a
                    href={`#${section.topic}`}
                    className={cn(
                      'py-2 px-3 hover:text-accent cursor-pointer w-full block transition-transform'
                    )}
                  >
                    {section.heading}
                  </a>
                </li>
              )
            })}
        </ul>
      </nav>
    </div>
  )
}

export default TableOfContents
