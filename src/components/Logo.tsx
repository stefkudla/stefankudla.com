import React from 'react'
import Link from 'next/link'

const Logo: React.VFC = () => {
  return (
    <Link href="/">
      <a
        aria-label="Website logo, go back to homepage."
        className="flex items-center border-white group focus-visible:outline-accent"
      >
        <div className="overflow-hidden transition-transform ease-in-out rounded-full  group-hover:-translate-y-1">
          <div className="inline text-base font-semibold">
            <span className="text-fore-subtle">stefankudla</span>
            <span className="text-accent">.com</span>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default Logo
