import React from 'react'
import cn from 'classnames'

interface Props {
  fullWidth?: boolean
  innerPadding?: boolean | number
  classNames?: string
  children: React.ReactNode
  bgColor?: 'white' | 'off-white' | 'bg-subtle'
}

const SectionWrapper: React.FC<Props> = ({
  fullWidth,
  innerPadding,
  classNames,
  children,
  bgColor,
}) => {
  const padding = typeof innerPadding === 'number' ? innerPadding : null
  return (
    <section
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
    </section>
  )
}

export default SectionWrapper
