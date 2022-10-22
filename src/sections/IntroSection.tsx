import SocialIcons from '@/components/SocialIcons'
import React from 'react'
import { PaperIcon } from '@/configs/icons'
import Image from 'next/image'
import avatar from '../../public/images/avatar-july-2022-min.png'

const IntroSection: React.VFC = () => (
  <section className="w-full flex flex-col-reverse md:flex-row justify-start">
    <div className="flex-1 flex flex-col gap-y-4">
      <h1>Stefan Kudla</h1>
      <h2 className="max-w-lg">
        Freelance Software Developer, Technical Content Creator and Developer
        Experience Engineer at <strong>Cosmic</strong>
      </h2>
      <p className="mb-2">
        I create and contribute to products, documentation, articles, and
        software application templates.
      </p>
      <div className="flex items-center">
        <a href="/Stefan_Kudla_Resume.pdf" className="resume-btn">
          <span className="mr-2">
            <PaperIcon />
          </span>
          Resume
        </a>
        <SocialIcons />
      </div>
    </div>
    <div className="relative w-24 h-24 md:w-44 md:h-44 mb-6 md:mb-0 rounded-full overflow-hidden">
      <Image
        src={avatar}
        layout="fill"
        alt="Stefan Kudla"
        priority
        className="rounded-full"
      />
    </div>
  </section>
)

export default IntroSection
