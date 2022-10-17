import React from 'react'
import { NextPage } from 'next'
import { PaperIcon } from '@/configs/icons'
import SocialIcons from '@/components/SocialIcons'
import SetupSection from '@/sections/SetupSection'
import BrewSection from '@/sections/BrewSection'
import { getAllProducts } from '@/lib/cosmic'
import { ProductProps } from '@/types/product'
import TopTracksSection from '@/sections/TopTracksSection'
import Image from 'next/image'
import avatar from '../../public/images/avatar-july-2022-min.png'
import { PageMeta } from '@/components/Meta'
import ContactSection from '@/sections/ContactSection'

const About: NextPage<ProductProps> = ({ allProducts }) => {
  return (
    <>
      <PageMeta
        title="About | Stefan Kudla"
        description="About Stefan Kudla"
        url="https://stefankudla.com/about"
      />
      <section>
        <h1 className="mb-12">About Me</h1>
        <div className="flex flex-col md:flex-row-reverse border-b border-b-back-subtle pb-12">
          <div className="flex-1 overflow-hidden rounded-md">
            <Image
              src={avatar}
              alt="Stefan Kudla"
              layout="responsive"
              className="rounded-md"
              priority
              quality={100}
            />
          </div>
          <div className="flex-1 mt-12 md:mt-0 flex flex-col justify-start gap-y-8 pr-20">
            <p>I love solving problems!</p>
            <p>
              My name is Stefan Kudla. I&apos;m a Software Engineer, Music
              Producer, and Tech Blogger. When I&apos;m not creating, you can
              usually find me brushing my teeth with coffee or looking for the
              best view atop a mountain.
            </p>
            <p>Get in touch to create something awesome together!</p>
            <div className="flex items-center md:mt-6">
              <a href="/Stefan_Kudla_Resume.pdf" className="resume-btn">
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
      <TopTracksSection />
      <SetupSection allProducts={allProducts} />
      <BrewSection allProducts={allProducts} />
      <ContactSection />
    </>
  )
}

export async function getStaticProps() {
  const allProducts = (await getAllProducts()) || []
  return {
    props: { allProducts },
  }
}
export default About
