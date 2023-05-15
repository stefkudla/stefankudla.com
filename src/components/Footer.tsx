import { CosmicIcon } from '@/configs/icons'
import MenuItems from './MenuItems'
import SocialIcons from './SocialIcons'
import { nunitoSans } from '@/fonts'
import cn from 'classnames'

const Footer: React.FC = () => (
  <footer
    className={cn(
      'bg-back-primary font-sans dark:bg-back-subtle flex flex-wrap justify-between items-end mx-auto gap-4  py-6 px-6 h-36 lg:px-20',
      nunitoSans.variable
    )}
  >
    <div className="flex flex-col-reverse md:flex-row items-center md:justify-between md:gap-y-0">
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
