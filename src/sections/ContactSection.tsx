import React from 'react'
import { LetterIcon } from '@/components/icons'

const ContactSection: React.VFC = () => {
  return (
    <section className="group h-72 flex flex-col items-center justify-center my-32">
      <h3 className="text-4xl flex items-center font-bold">
        Get in touch{' '}
        <span className="ml-2 bg-back-subtle p-1 rounded-full">
          <LetterIcon />
        </span>
      </h3>
      <p className="text-fore-subtle my-3">
        I'm currently looking for new opportunities.
      </p>
      <a
        href="mailto:stefankudla@stefankudla.com"
        className="text-white px-16 py-3.5 mt-8 text-2xl bg-gradient-to-r from-accent to-violet-400 rounded"
      >
        Say hello
      </a>
    </section>
  )
}

export default ContactSection
