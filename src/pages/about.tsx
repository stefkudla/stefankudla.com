import React from 'react'
import { NextPage } from 'next'
import SocialIcons from '@/components/SocialIcons'
import { ProductProps } from '@/types/product'
import Image from 'next/image'
import avatar from '../../public/images/sk-portrait-min.jpg'
import { PageMeta } from '@/components/Meta'
import Layout from '@/components/Layout'
import { useRouter } from 'next/router'
import { Timeline, type TimelineEntry } from '@/components/ui/timeline'
import { LogoIcon } from '@/components/Logo'

const workHistory: TimelineEntry[] = [
  {
    title: 'Sep 2024 — Present',
    icon: { src: '/images/logos/euronet_worldwide_logo.jpeg', alt: 'Euronet Worldwide logo' },
    content: (
      <div>
        <h4 className="text-lg font-semibold text-fore-primary mb-4">
          Euronet Worldwide
        </h4>
        <p className="text-sm text-fore-subtle mb-4">
          Now leading a team of engineers on a white-label React Native
          platform that serves multiple casino operators. Built a CLI tool to
          automate multi-platform builds and releases, and migrated the content
          system to a hybrid i18n + headless CMS architecture so non-engineering
          teams could update content on their own.
        </p>
        <p className="text-sm text-fore-subtle mb-4">
          Before that, built a self-service onboarding platform that cut
          operator go-live timelines from months to weeks, and shipped React
          Native apps across iOS and Android for multiple casino brands.
        </p>
        <p className="text-sm text-fore-subtle">
          Started out building web apps with Vue.js, Nuxt.js, and Laravel
          serving 100+ operators — payment processing, access control, and
          casino management workflows.
        </p>
      </div>
    ),
  },
  {
    title: 'Nov 2023 — Aug 2024',
    icon: { src: '/images/logos/strictly-logo.png', alt: 'Strictly logo' },
    content: (
      <div>
        <h4 className="text-lg font-semibold text-fore-primary mb-4">
          Strictly
        </h4>
        <p className="text-sm text-fore-subtle mb-4">
          Led development of a SaaS website builder on Next.js and TypeScript.
          Integrated AI-powered content generation so users could create site
          copy in seconds, and built the auth system, i18n support, and a UI
          component library with Tailwind and Radix.
        </p>
        <p className="text-sm text-fore-subtle">
          Handled Stripe payments, Intercom integration, and managed AWS
          infrastructure for production deployments. Ran standups, sprint
          planning, and code reviews with the engineering team.
        </p>
      </div>
    ),
  },
  {
    title: 'Jun 2022 — Oct 2023',
    icon: { src: '/images/logos/cosmic-logo.png', alt: 'Cosmic logo' },
    content: (
      <div>
        <h4 className="text-lg font-semibold text-fore-primary mb-4">
          Cosmic
        </h4>
        <p className="text-sm text-fore-subtle mb-4">
          Software engineer at a headless CMS company. Built serverless apps
          with Node.js and React, shipped reusable component libraries, and
          created starter templates with Next.js and Astro that helped
          developers go from zero to production faster.
        </p>
        <p className="text-sm text-fore-subtle">
          Also wrote technical content on headless CMS patterns and ran SEO
          strategy for the knowledge base and docs. Built automated email
          marketing flows with MJML and third-party APIs.
        </p>
      </div>
    ),
  },
  {
    title: 'Feb 2022 — Sep 2023',
    icon: <LogoIcon className="w-full h-full text-accent" />,
    content: (
      <div>
        <h4 className="text-lg font-semibold text-fore-primary mb-4">
          Freelance Consulting
        </h4>
        <p className="text-sm text-fore-subtle mb-4">
          Built marketing websites and developer-facing content for SaaS
          clients. Created research-driven content strategies, solutions pages,
          and product demo scripts.
        </p>
        <p className="text-sm text-fore-subtle">
          Managed vendor workflows through Notion and GitHub, and published
          educational resources to help developers adopt clients&apos;
          products.
        </p>
      </div>
    ),
  },
  {
    title: 'May 2021 — Jul 2022',
    icon: { src: '/images/logos/projex-logo.png', alt: 'Projex logo' },
    content: (
      <div>
        <h4 className="text-lg font-semibold text-fore-primary mb-4">
          Software Projex
        </h4>
        <p className="text-sm text-fore-subtle mb-4">
          WordPress developer who rebuilt a learning management platform and
          brought sales up to $2–4k/month. Shipped a storefront with
          WooCommerce payment integration and built custom features with
          JavaScript, CSS, and PHP.
        </p>
        <p className="text-sm text-fore-subtle">
          Also handled tech support, helping a few customers per week to
          improve retention.
        </p>
      </div>
    ),
  },
]

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
      <div className="relative w-full overflow-clip">
        <Timeline
          data={workHistory}
          title="Work History"
          description="A timeline of my professional journey through the tech industry."
        />
      </div>
    </Layout>
  )
}

export default About
