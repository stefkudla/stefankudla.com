import React from 'react'
import { LetterIcon } from '@/configs/icons'

const ContactSection: React.VFC = () => {
  return (
    <section className="h-72 flex flex-col items-center justify-center my-32">
      <h3 className="text-3xl flex items-center gap-x-2 font-bold mb-6">
        <span className="icon-border">
          <LetterIcon />
        </span>{' '}
        Get in touch
      </h3>
      <p className="max-w-lg text-fore-subtle my-3 text-center">
        While I&apos;m always looking for new opportunities, I&apos;m currently
        looking for an awesome team to code with.
      </p>
      <a
        href="mailto:stefankudla@gmail.com"
        className="group text-white px-16 py-3.5 mt-8 text-xl bg-gradient-to-r from-accent  to-violet-400 rounded-md hover:from-pink-500 hover:to-yellow-500 shadow-slate-400 shadow-md hover:shadow-accent transition hover:shadow-lg w-fit dark:shadow-[#111] dark:hover:shadow-zinc-600"
      >
        Say hello
      </a>
    </section>
  )
}

export default ContactSection
