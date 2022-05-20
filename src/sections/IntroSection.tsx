import MeshBackground from '@/components/MeshBackground'
import SocialIcons from '@/components/SocialIcons'
import React from 'react'
import { PaperIcon } from '@/configs/icons'

const IntroSection: React.VFC = () => {
  return (
    <section className="h-80 sm:h-96 w-full flex flex-col justify-center">
      <MeshBackground />
      <div className="flex-1 flex flex-col justify-center">
        <h1 className="text-5xl max-w-2xl mb-8 text-fore-primary">
          Hi there, I'm Stefan Kudla.
        </h1>
        <p>
          I'm a software developer with a passion for building <br /> modern web
          apps.
        </p>
      </div>
      <div className="flex items-center">
        <a
          href="/Stefan_Kudla_Resume.pdf"
          className="flex items-center mr-4 text-fore-primary border-2 border-accent w-fit px-4 py-1 rounded cursor-pointer hover:text-accent transition-colors"
        >
          <span className="mr-2">
            <PaperIcon />
          </span>
          Resume
        </a>
        <SocialIcons />
      </div>
    </section>
  )
}

export default IntroSection
