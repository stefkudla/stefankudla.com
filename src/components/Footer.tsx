import React from 'react'
import MenuItems from './MenuItems'
import { GithubIcon, TwitterIcon, EmailIcon } from './icons'

const Footer: React.VFC = () => {
  return (
    <footer className="flex flex-col justify-end max-w-2xl px-4 lg:px-0 py-8 mx-auto">
      <div className="mb-1">
        <MenuItems />
      </div>
      <div className="flex justify-between items-center">
        <span className="text-xs">
          &copy; 2022 Stefan Kudla. All Rights Reserved.
        </span>
        <span className="flex gap-x-4">
          <a
            href="mailto:stefankudla@gmail.com"
            className="group cursor-pointer"
          >
            <EmailIcon styles="text-2xl text-fore-subtle group-hover:-translate-y-2 transition-transform" />
          </a>
          <a
            href="https://github.com/stefkudla"
            className="group cursor-pointer "
          >
            <GithubIcon styles="text-2xl text-fore-subtle group-hover:-translate-y-2 transition-transform" />
          </a>
          <a
            href="https://twitter.com/stefankudla"
            className="group cursor-pointer"
          >
            <TwitterIcon styles="text-2xl text-fore-subtle group-hover:-translate-y-2 transition-transform" />
          </a>
        </span>
      </div>
    </footer>
  )
}

export default Footer
