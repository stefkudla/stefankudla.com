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
import WorkTimeline from '@/components/WorkTimeline'

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
        <div className="my-12">
          <h1 className="text-3xl font-oswald">About Stefan</h1>
          <h3 className="font-oswald text-lg text-fore-subtle">
            Software Developer, Designer
          </h3>
        </div>
        <div className="flex flex-col md:flex-row-reverse border-b border-b-back-subtle pb-12 gap-6 md:gap-16">
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
          <div className="flex-1 mt-12 md:mt-0 flex flex-col justify-start gap-y-8">
            <p>
              I&apos;m a Czech-American Software Developer and Designer based in
              Las Vegas, Nevada, with extensive experience across diverse tech
              domains. My journey into software development was preceded by a
              rich background in music production, where I worked as both a
              recording artist and audio engineer.
            </p>

            <p>
              My journey in the tech world has taken me through various exciting
              fields, including Product Development, SaaS, AI, and Fintech.
              I&apos;ve had the privilege of working on cutting-edge projects
              that have honed my skills in both full stack development and
              design. My experience in Product has taught me to create
              user-centric solutions, while my work in SaaS has given me
              insights into scalable, cloud-based architectures. Diving into AI
              Development has allowed me to explore the frontiers of machine
              learning and data science, and my time in Fintech has sharpened my
              understanding of secure, efficient financial systems.
            </p>
            <div className="flex items-center">
              <SocialIcons />
            </div>
          </div>
        </div>
      </section>
      <WorkTimeline />
    </Layout>
  )
}

export default About
