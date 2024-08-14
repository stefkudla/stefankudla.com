import MenuItems from './MenuItems'
import Logo from './Logo'
import Navbar from './Navbar'
import classNames from 'classnames'
import Link from 'next/link'

const Header: React.FC = () => {
  return (
    <header
      className={classNames(
        'md:py-6 md:px-0 font-sans mx-auto fixed top-0 w-full z-50'
      )}
    >
      <nav
        className={classNames(
          'hidden md:grid grid-cols-3 justify-center items-center h-full w-full mt-auto text-sm  mx-auto  max-w-3xl border p-4 rounded-lg bg-back-secondary'
        )}
        aria-label="Main Navigation"
      >
        <Logo />

        <div>
          <MenuItems />
        </div>
        <Link
          className="w-auto  text-center whitespace-nowrap bg-accent text-white font-bold rounded-lg hover:opacity-75 transition-opacity text-sm sm:text-base py-2 px-4 place-self-end"
          href="/contact"
        >
          Contact me
        </Link>
      </nav>
      <Navbar />
    </header>
  )
}
export default Header
