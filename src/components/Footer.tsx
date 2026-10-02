import SocialIcons from './SocialIcons'
import { nunitoSans } from '@/fonts'
import cn from 'classnames'

const Footer: React.FC = () => (
  <footer
    className={cn(
      'bg-back-primary font-sans flex flex-wrap justify-between items-end mx-auto gap-4 py-6 px-6 h-36 lg:px-20 mb-20 md:mb-24',
      nunitoSans.variable
    )}
  >
    <div className="flex flex-col items-center gap-1 text-center md:items-start md:text-left">
      <span className="text-sm text-fore-secondary">
        I also run{' '}
        <a
          href="https://wellcodedsolutions.com"
          className="underline hover:text-accent transition-colors"
        >
          Well Coded Solutions
        </a>
        , websites and apps for small businesses in Las Vegas.
      </span>
      <span className="text-sm text-fore-secondary">
        &copy; {new Date().getFullYear()} Stefan Kudla. All Rights Reserved.
      </span>
    </div>
    <div className="flex flex-col items-center md:flex-row md:justify-between md:gap-y-0">
      <SocialIcons />
    </div>
  </footer>
)
export default Footer
