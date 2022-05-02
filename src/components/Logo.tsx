import React from 'react'
import Link from 'next/link'

const Logo: React.VFC = () => {
  return (
    <Link href="/">
      <a
        aria-label="Website logo, go back to homepage."
        className="flex items-center border-white group focus-visible:outline-accent"
      >
        <div className="overflow-hidden transition ease-in-out rounded-full  hover:opacity-60">
          <span className="font-light text-sm">stefankudla</span>
          <span className="font-light text-sm text-accent">.com</span>
        </div>
      </a>
    </Link>
  )
}

export default Logo
