import Link from 'next/link'
import React from 'react'
import ArrowRightIcon from './icons/ArrowRightIcon'
import classNames from 'classnames'

const Card = ({
  icon,
  heading,
  content,
  link,
}: {
  icon?: JSX.Element
  heading: string
  content: string
  link?: {
    href: string
    text: string
    arrow?: boolean
  }
}) => {
  return (
    <div className="flex border border-gray-200 dark:border-dark-gray-100 flex-col items-center gap-y-8 rounded-lg custom-shadow-md md:max-w-[420px] bg-card-background  py-20 px-5">
      {icon && <span>{icon}</span>}
      <h3 className="font-bold text-2xl text-fore-primary text-center">
        {heading}
      </h3>
      <p className="text-center text-fore-secondary text-xl">{content}</p>
      {link && (
        <Link
          href={link.href}
          className={classNames(
            'text-accent flex items-center gap-x-2 group transition-opacity hover:opacity-70 transform'
          )}
        >
          {link.text}
          {link.arrow && (
            <span className="group-hover:translate-x-2 transition-transform">
              <ArrowRightIcon />
            </span>
          )}
        </Link>
      )}
    </div>
  )
}

export default Card
