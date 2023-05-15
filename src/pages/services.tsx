import Layout from '@/components/Layout'
import Marquee from '@/components/Marquee'
import { PageMeta } from '@/components/Meta'
import SectionWrapper from '@/components/SectionWrapper'
import { cosmic } from '@/lib/cosmic'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import { NextPage } from 'next'
import React from 'react'
import Image from 'next/image'
import featureImage from '@/assets/services/service-feature-1.png'
import featureImageMobile from '@/assets/services/service-feature-1-mobile.png'
import CtaSection from '@/sections/CtaSection'

const Services: NextPage<{ services: { title: string }[] }> = ({
  services,
}) => {
  return (
    <Layout>
      <PageMeta
        title="Services | Stefan Kudla"
        description="View the Web Development Services I offer"
        url="https://stefankudla.com/services"
      />
      <section className="h-auto pt-20">
        <h1
          className={classNames(
            'font-bold font-oswald max-w-[725px] md:leading-[1.2] text-center'
          )}
        >
          I Offer Web Development Services That Bring Your Online Vision{' '}
          <motion.span
            initial={{ textShadow: 'none' }}
            animate={{
              textShadow: '2px 4px 3px rgba(0, 0, 0, 0.3)',
              transition: {
                delay: 0.3,
                duration: 1,
                ease: 'easeIn',
              },
            }}
            className="relative dark:hidden"
          >
            to Life
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{
                scaleX: 1,
                transition: {
                  delay: 0.7,
                  duration: 0.9,
                  type: 'spring',
                  spring: 0.6,
                  damping: 20,
                },
              }}
              className="absolute w-full left-0 bottom-0 h-2 bg-accent rounded-sm custom-shadow-lg-dark"
            />
          </motion.span>
          <motion.span
            initial={{ textShadow: 'none' }}
            animate={{
              textShadow: '1px -1px 10px hsla(221, 100%, 55%, 1)',
              transition: {
                delay: 0.3,
                duration: 1,
                ease: 'easeIn',
              },
            }}
            className="relative hidden dark:inline"
          >
            to Life
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{
                scaleX: 1,
                transition: {
                  delay: 0.7,
                  duration: 0.9,
                  type: 'spring',
                  spring: 0.6,
                  damping: 20,
                },
              }}
              className="absolute w-full left-0 bottom-0 h-2 bg-accent rounded-sm custom-shadow-lg-dark"
            />
          </motion.span>
        </h1>
      </section>
      <SectionWrapper
        as="div"
        fullWidth
        noPadding
        innerPadding={0}
        classNames="!py-0 md:!py-10"
      >
        <Marquee speed={60} gapBetween={8}>
          <div className="relative">
            {services.map((service: { title: string }) => (
              <span
                key={service.title}
                className="text-2xl md:text-4xl text-fore-subtle font-oswald mx-4"
              >
                {service.title}
              </span>
            ))}
          </div>
        </Marquee>
      </SectionWrapper>
      <SectionWrapper classNames="flex gap-x-8 w-full md:justify-evenly">
        <div className="flex flex-col gap-y-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-fore-primary font-oswald font-medium">
            Optimized For Every User
          </h2>
          <div className="md:hidden">
            <Image
              src={featureImageMobile}
              width={323}
              height={270}
              quality={80}
              alt="Website view and mobile view mockups of Ajpropertiesllc.com website designed by Stefan Kudla"
              placeholder="blur"
            />
          </div>
          <p className="md:text-lg text-fore-primary max-w-xs md:max-w-md pr-2">
            I leverage the best web development tools and frameworks to ensure
            that your website will achieve fast page loads, great SEO, and will
            be accessible to a global user base.
          </p>
          <p className="md:text-lg text-fore-primary max-w-xs md:max-w-md pr-2">
            I have a deep understanding of what it takes to optimize your
            website on all devices. With high ranking performance scores, your
            site will not only appeal to real world user experience, but search
            engines will reward you by ranking your pages higher on each search.
          </p>
        </div>
        <div className="hidden md:block">
          <Image
            src={featureImage}
            width={533}
            height={446}
            quality={80}
            alt="Website view and mobile view mockups of Ajpropertiesllc.com website designed by Stefan Kudla"
            className="h-auto"
            placeholder="blur"
          />
        </div>
      </SectionWrapper>
      <SectionWrapper classNames="w-full !py-20 max-w-screen-xl" noPadding>
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-fore-primary font-oswald font-medium max-w-xs sm:max-w-none md:text-center mb-10">
          Web Development Services I Offer
        </h2>
        <div className="flex flex-col md:flex-row justify-between gap-8 md:text-center">
          <div className="flex  justify-start items-start gap-y-4 w-full ">
            <div className="flex flex-col items-start gap-y-4">
              <h3 className="text-xl sm:text-2xl text-fore-primary font-bold text-start">
                Frontend Web Development
              </h3>
              <ul className="prose [&>li]:list-inside [&>li]:list-disc text-fore-subtle text-start font-semibold">
                <li>HTML, CSS, and JavaScript Development</li>
                <li>Custom landing pages</li>
                <li>HTML forms and email lead generation</li>
                <li>Technical SEO</li>
                <li>Image optimization</li>
                <li>Mobile optimization</li>
                <li>Responsive design</li>
                <li>Mobile HTML, CSS, and JavaScript Development</li>
              </ul>
            </div>
          </div>
          <div className="flex md:justify-center items-start gap-y-4 w-full flex-wrap">
            <div className="flex flex-col items-start gap-y-4">
              <h3 className="text-xl sm:text-2xl text-fore-primary font-bold text-start">
                Wordpress Development
              </h3>
              <ul className="prose [&>li]:list-inside [&>li]:list-disc text-fore-subtle text-start font-semibold">
                <li>Custom Wordpress web design</li>
                <li>Elementor development</li>
                <li>Thrive Themes development</li>
                <li>WooCommerce Development</li>
                <li>Blog design</li>
                <li>Wordpress SEO Implementation</li>
                <li>Wordpress speed optimizationn</li>
                <li>Custom PHP development</li>
              </ul>
            </div>
          </div>
          <div className="flex md:justify-end items-start gap-y-4 w-full ">
            <div className="flex flex-col items-start gap-y-4">
              <h3 className="text-xl sm:text-2xl text-fore-primary font-bold text-start">
                Web Design
              </h3>
              <ul className="prose [&>li]:list-inside [&>li]:list-disc text-fore-subtle text-start font-semibold">
                <li>Website mockup and design</li>
                <li>Figma prototype design</li>
                <li>Business card design</li>
                <li>Image editing/optimization</li>
                <li>Mobile mockup and design</li>
                <li>Tablet mockup and design</li>
                <li>Responsive web design mockup</li>
                <li>Image creation and product mockup design</li>
              </ul>
            </div>
          </div>
        </div>
      </SectionWrapper>
      <SectionWrapper classNames="w-full !py-20 max-w-screen-xl" noPadding>
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-fore-primary font-oswald font-medium max-w-xs sm:max-w-none md:text-center mb-10">
          Tools and Frameworks I Use
        </h2>
        <div className="flex flex-col md:flex-row justify-between gap-8 md:text-center">
          <div className="flex  justify-start items-start gap-y-4 w-full ">
            <div className="flex flex-col items-start gap-y-4">
              <h3 className="text-xl sm:text-2xl text-fore-primary font-bold text-start">
                Frontend Web Development
              </h3>
              <ul className="prose [&>li]:list-inside [&>li]:list-disc text-fore-subtle text-start font-semibold">
                <li>Next.js</li>
                <li>React</li>
                <li>Node.js</li>
                <li>Astro</li>
                <li>Framer Motion</li>
                <li>Tailwind CSS</li>
              </ul>
            </div>
          </div>
          <div className="flex md:justify-center items-start gap-y-4 w-full flex-wrap">
            <div className="flex flex-col items-start gap-y-4">
              <h3 className="text-xl sm:text-2xl text-fore-primary font-bold text-start">
                Wordpress Development
              </h3>
              <ul className="prose [&>li]:list-inside [&>li]:list-disc text-fore-subtle text-start font-semibold">
                <li>Elementor</li>
                <li>Thrive Themes</li>
                <li>Blocksy</li>
                <li>Coblocks</li>
                <li>Gutenberg block editor</li>
                <li>Yoast SEO</li>
              </ul>
            </div>
          </div>
          <div className="flex md:justify-end items-start gap-y-4 w-full ">
            <div className="flex flex-col items-start gap-y-4">
              <h3 className="text-xl sm:text-2xl text-fore-primary font-bold text-start">
                Web Design
              </h3>
              <ul className="prose [&>li]:list-inside [&>li]:list-disc text-fore-subtle text-start font-semibold">
                <li>Figma</li>
                <li>Sketch</li>
                <li>Adobe Photoshop</li>
                <li>Adobe Illustrator</li>
                <li>Adobe XD</li>
                <li>Canva</li>
              </ul>
            </div>
          </div>
        </div>
      </SectionWrapper>
      <CtaSection />
    </Layout>
  )
}

export async function getStaticProps({ preview }: { preview?: boolean }) {
  const services = await cosmic.objects
    .find({ type: 'services' })
    .props('slug,title,metadata')
    .depth(1)
  return {
    props: { services: services.objects },
    revalidate: 180,
  }
}

export default Services
