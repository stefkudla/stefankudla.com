import SocialIcons from '@/components/SocialIcons'
import React from 'react'
import { PaperIcon } from '@/configs/icons'
import Image from 'next/image'
import avatar from '../../public/images/avatar_4.png'

const IntroSection: React.VFC = () => (
  <section className="w-full flex flex-col-reverse md:flex-row justify-start">
    <div className="flex-1 flex flex-col gap-y-4">
      <h1>Stefan Kudla</h1>
      <h2 className="max-w-lg">
        Developer Experience Engineer at <strong>Cosmic</strong>
      </h2>
      <p className="mb-2">
        Helping companies deliver a better developer experience to their users.
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
    <div className="w-[80px] sm:w-[186px] relative mb-6 sm:mb-0">
      <Image
        src={avatar}
        alt="Stefan Kudla"
        height={186}
        width={186}
        className="rounded-full"
        priority
        placeholder="blur"
      />
    </div>
  </section>
)

export default IntroSection
