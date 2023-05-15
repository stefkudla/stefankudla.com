import React from 'react'
import cn from 'classnames'

interface Props {
  fullWidth?: boolean
  innerPadding?: boolean | number
  noPadding?: boolean
  classNames?: string
  children: React.ReactNode
  bgColor?: 'white' | 'off-white' | 'bg-subtle'
  as?: 'section' | 'div'
}

const SectionWrapper: React.FC<Props> = ({
  fullWidth,
  innerPadding,
  noPadding,
  classNames,
  children,
  bgColor,
  as = 'section',
}) => {
  const padding = innerPadding
  return as === 'section' ? (
    <section
      className={cn(
        classNames,
        'h-auto py-20',
        { 'w-screen': fullWidth },
        { 'px-2 md:px-6': innerPadding },
        { '!py-0': !innerPadding },
        { padding: typeof innerPadding === 'number' },
        {
          'bg-off-white': bgColor === 'off-white',
          'bg-white': bgColor === 'white',
          'bg-back-subtle': bgColor === 'bg-subtle',
        }
      )}
    >
      {children}
    </section>
  ) : (
    <div
      className={cn(
        classNames,
        'h-auto py-20',
        { 'w-screen': fullWidth },
        { 'px-6': innerPadding },
        { padding: typeof innerPadding === 'number' },
        {
          'bg-off-white': bgColor === 'off-white',
          'bg-white': bgColor === 'white',
          'bg-back-subtle': bgColor === 'bg-subtle',
        }
      )}
    >
      {children}
    </div>
  )
}

export default SectionWrapper
