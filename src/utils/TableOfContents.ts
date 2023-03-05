import { Dispatch, SetStateAction, useEffect, useRef } from 'react'

type SetActiveId = Dispatch<SetStateAction<unknown>>
type Headings = IntersectionObserverEntry[]
type HeadingsMap = { [key: string]: IntersectionObserverEntry }
type GetIndexFromId = (id: string) => number

export const useIntersectionObserver = (setActiveId: SetActiveId) => {
  const headingElementsRef = useRef({})
  useEffect(() => {
    const callback = (headings: Headings) => {
      headingElementsRef.current = headings.reduce(
        (map: HeadingsMap, headingElement) => {
          map[headingElement.target.id] = headingElement
          return map
        },
        headingElementsRef.current
      )
      const visibleHeadings: Headings = []
      Object.keys(headingElementsRef.current).forEach(key => {
        const headingElement = (headingElementsRef.current as Headings)[
          key as unknown as number
        ]
        if (headingElement.isIntersecting) visibleHeadings.push(headingElement)
      })

      const getIndexFromId: GetIndexFromId = id =>
        headingElements.findIndex(heading => heading.id === id)

      if (visibleHeadings.length === 1) {
        setActiveId(visibleHeadings[0].target.id)
      } else if (visibleHeadings.length > 1) {
        const sortedVisibleHeadings = visibleHeadings.sort(
          (a, b): any =>
            getIndexFromId(a.target.id) > getIndexFromId(b.target.id)
        )
        setActiveId(sortedVisibleHeadings[0].target.id)
      }
    }

    const observer = new IntersectionObserver(callback, {
      rootMargin: '0px 0px -40% 0px',
    })

    const headingElements = Array.from(document.querySelectorAll('h2'))

    headingElements.forEach(element => observer.observe(element))

    return () => observer.disconnect()
  }, [setActiveId])
}
