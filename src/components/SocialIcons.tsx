import React from 'react'
import { EmailIcon, GithubIcon, LinkedinIcon } from '@/components/icons'

const SocialIcons = () => {
  return (
    <span className="flex gap-x-5">
      <a href="mailto:stefan@stefankudla.com" className="group cursor-pointer">
        <EmailIcon styles="text-xl text-fore-subtle group-hover:-translate-y-2 transition-transform" />
      </a>
      <a href="https://github.com/stefkudla" className="group cursor-pointer ">
        <GithubIcon styles="text-xl text-fore-subtle group-hover:-translate-y-2 transition-transform" />
      </a>
      <a
        href="https://www.linkedin.com/in/stefankudla/"
        className="group cursor-pointer"
      >
        <LinkedinIcon styles="text-xl text-fore-subtle group-hover:-translate-y-2 transition-transform" />
      </a>
    </span>
  )
}

export default SocialIcons
