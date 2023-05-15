import Link from 'next/link'
import SocialIcons from './SocialIcons'
import OutLinkIcon from './icons/OutlinkIcon'

const Author = () => {
  return (
    <section className="bg-card-background border-card-border border p-6 md:px-8 md:py-12 my-12 rounded-md shadow-sm">
      <h3 className="text-2xl font-bold">
        About <span className="text-accent">Stefan Kudla</span>
      </h3>
      <p className="my-4 pr-8">
        Freelance Web Developer, Music Producer, and Tech Content Creator. When
        I&apos;m not creating, you can usually find me brushing my teeth with
        coffee or looking for the best view atop a mountain.
      </p>
      <div className="flex items-center justify-between">
        <SocialIcons />
        <Link
          href="/contact"
          className="flex items-center gap-x-1 hover:underline"
        >
          Contact{' '}
          <span>
            <OutLinkIcon />
          </span>
        </Link>
      </div>
    </section>
  )
}

export default Author
