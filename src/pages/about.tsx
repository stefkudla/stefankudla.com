import React from 'react'
import { NextPage } from 'next'
import { PaperIcon } from '@/configs/icons'
import SocialIcons from '@/components/SocialIcons'
import { ProductProps } from '@/types/product'
import Image from 'next/image'
import avatar from '../../public/images/sk-portrait-min.jpg'
import { PageMeta } from '@/components/Meta'
import ContactSection from '@/sections/ContactSection'
import Layout from '@/components/Layout'
import { useRouter } from 'next/router'

const About: NextPage<ProductProps> = () => {
  const router = useRouter()

  return (
    <Layout router={{ route: router.pathname }}>
      <PageMeta
        title="About | Stefan Kudla"
        description="About Stefan Kudla"
        url="https://stefankudla.com/about"
      />
      <section>
        <h1 className="my-12">About Stefan</h1>
        <div className="flex flex-col md:flex-row-reverse border-b border-b-back-subtle pb-12">
          <div className="flex-1 overflow-hidden rounded-md">
            <Image
              src={avatar}
              alt="Portrait of Stefan Kudla, Software Developer in Las Vegas"
              className="rounded-md"
              placeholder="blur"
              priority
              quality={90}
              sizes="100vw"
              style={{
                width: '100%',
                height: 'auto',
              }}
            />
          </div>
          <div className="flex-1 mt-12 md:mt-0 flex flex-col justify-start gap-y-8 pr-20">
            <h2>
              I&apos;m Stefan Kudla, a Software Engineer based in Las Vegas
            </h2>
            <p>
              Software Developer, Music Producer, and Tech Content Creator. When
              I&apos;m not creating, you can usually find me brushing my teeth
              with coffee or looking for the best view atop a mountain.
            </p>
            <p>Get in touch to create something awesome together!</p>
            <div className="flex items-center md:mt-6">
              <a href="/Resume-Stefan-Kudla.pdf" className="resume-btn">
                <span className="mr-2">
                  <PaperIcon />
                </span>
                Resume
              </a>
              <SocialIcons />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default About
