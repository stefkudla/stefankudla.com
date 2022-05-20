import React from 'react'
import { LetterIcon } from '@/configs/icons'

const ContactSection: React.VFC = () => {
  return (
    <section className="group h-72 flex flex-col items-center justify-center my-32">
      <h3 className="text-3xl flex items-center gap-x-2 font-bold">
        <span className="bg-back-subtle p-1 rounded-full">
          <LetterIcon />
        </span>{' '}
        Get in touch
      </h3>
      <p className="text-fore-subtle my-3 text-center">
        While I'm always looking for new opportunities, I'm currently looking
        for an awesome team to code with.
      </p>
      <a
        href="mailto:stefan@stefankudla.com"
        className="text-white px-16 py-3.5 mt-8 text-2xl bg-gradient-to-r from-accent to-violet-400 rounded"
      >
        Say hello
      </a>
    </section>
  )
}

export default ContactSection
