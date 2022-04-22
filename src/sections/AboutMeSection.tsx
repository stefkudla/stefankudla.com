import React from 'react'

const AboutMeSection: React.VFC = () => {
  return (
    <section className="flex flex-col mt-24">
      <h2 className="text-3xl font-bold mb-8 text-fore-primary">About Me</h2>
      <p className="text-fore-primary mb-8">
        I'm a 24 year old self-taught software developer.
      </p>
      <p className="text-fore-primary mb-8">
        Coming from a background of audio engineering and music production, the
        transition to coding was blissful. I found quickly that writing code was
        a bit like putting the secret sauce on a vocal mix; there's not
        necesarily a single way to do it, and the person behind the keyboard has
        the power to put their own flavour into a great solution.
      </p>
      <p className="text-fore-primary mb-8">
        My favourite part about coding is that there are so many different
        challenges to solve. I'm a problem solver at heart, and there seems to
        be an endless bank of tasks to hack away on.
      </p>
    </section>
  )
}

export default AboutMeSection
