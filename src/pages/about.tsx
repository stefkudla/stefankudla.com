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
import Head from 'next/head'

const About: NextPage<ProductProps> = ({ allProducts }) => {
  return (
    <>
      <Head>
        <title>About | Stefan Kudla</title>
      </Head>
      <section>
        <h1 className="text-4xl mb-12">About Me</h1>
        <div className="flex flex-col md:flex-row-reverse border-b pb-12">
          <div className="flex-1 relative">
            <Image
              src="/images/portrait_4.png"
              alt="Stefan Kudla"
              width={400}
              height={400}
              quality={85}
              layout="responsive"
              className="rounded-md"
              priority
            />
          </div>
          <div className="flex-1 mt-12 md:mt-0 flex flex-col justify-start gap-y-8 pr-20">
            <p>I love solving problems!</p>
            <p>
              My name is Stefan Kudla. Originally from rainy Seattle,
              Washington, I now reside in the dry valley of Las Vegas, Nevada.
              When I&apos;m not writing code, you can usually find me brushing
              my teeth with coffee or looking for the best view atop a mountain.
            </p>
            <p>Get in touch to create something awesome together!</p>
            <div className="flex items-center md:mt-6">
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
          </div>
        </div>
      </section>
      <SetupSection allProducts={allProducts} />
      <BrewSection allProducts={allProducts} />
      <TopTracksSection />
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
