import React from 'react'

const AboutMeSection: React.VFC = () => {
  return (
    <section className="mt-24">
      <h3 className="text-3xl mb-8 text-fore-primary border-b border-b-slate-200 dark:border-b-gray-600 w-fit">
        About Me
      </h3>
      <p className="text-fore-primary mb-8 ">
        I'm a software developer based in Las Vegas, Nevada.
      </p>
      <p className="text-fore-primary mb-8">
        Coming from a background of audio engineering and music production, I
        quickly found that writing code was a bit like putting the secret sauce
        on a vocal mix; there's not necessarily a single way to do it, and the
        person behind the keyboard has the power to put their own flavor into a
        great solution.
      </p>
      <p className="text-fore-primary mb-8">
        My favourite part about coding is that there are so many different
        challenges to solve. I'm a problem solver at heart, and there seems to
        be an endless bank of tasks to hack away at.
      </p>
    </section>
  )
}

export default AboutMeSection
