import React from 'react'
import { NextPage } from 'next'
import { PaperIcon } from '@/components/icons'
import SocialIcons from '@/components/SocialIcons'
import SetupSection from '@/sections/SetupSection'
import BrewSection from '@/sections/BrewSection'
import { getAllProducts } from '@/lib/cosmic'
import { ProductProps } from '@/types/product'

const About: NextPage<ProductProps> = ({ allProducts }) => {
  return (
    <>
      <section>
        <h1 className="text-4xl mb-12">About Me</h1>
        <div className="flex flex-col md:flex-row-reverse border-b pb-12">
          <div className="flex-1">
            <img
              src="/images/stefan_kudla_spain_coast_square.png"
              alt="Stefan Kudla on the coast of Spain"
              className="rounded-md w-full"
            />
          </div>
          <div className="flex-1 mt-12 md:mt-0 flex flex-col gap-y-8 pr-20">
            <p>I love solving problems!</p>
            <p>
              My name is Stefan Kudla. I&apos;m the son of a Czechoslovakian man
              who defected from a soviet state and met a Seattle born woman here
              in the US. I&apos;m a constant student of life who&apos;s
              passionate about bettering my skillset every single day!
            </p>
            <p>
              I dedicate this site to my parents. I owe it to them for showing
              me a beautiful world in which the possibilites are endless.
            </p>
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
