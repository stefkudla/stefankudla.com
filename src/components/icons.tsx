import { IconType } from 'react-icons'
import {
  GiStripedSun,
  GiMoon,
  GiPencil,
  GiToolbox,
  GiFizzingFlask,
  GiLetterBomb,
  GiHomeGarage,
  GiWireframeGlobe,
  GiDesk,
  GiCoffeePot,
  GiHeadphones,
} from 'react-icons/gi'
import { FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi'
import { MdAlternateEmail, MdArrowForward } from 'react-icons/md'
import { BiLinkExternal } from 'react-icons/bi'
import { IoIosPaper } from 'react-icons/io'
import { FaSpotify } from 'react-icons/fa'

export const SunIcon = ({ styles }: { styles?: string }) => {
  return <GiStripedSun className={styles} />
}

export const MoonIcon = ({ styles }: { styles?: string }) => {
  return <GiMoon className={styles} />
}

export const PencilIcon: IconType = () => {
  return <GiPencil className="text-2xl text-accent" />
}

export const ToolboxIcon: IconType = () => {
  return <GiToolbox className="text-2xl text-accent" />
}

export const FlaskIcon: IconType = () => {
  return <GiFizzingFlask className="text-2xl text-accent" />
}

export const LetterIcon: IconType = () => {
  return <GiLetterBomb className="text-4xl text-accent" />
}

export const GithubIcon = ({ styles }: { styles?: string }) => {
  return <FiGithub className={styles} />
}

export const TwitterIcon = ({ styles }: { styles?: string }) => {
  return <FiTwitter className={styles} />
}

export const LinkedinIcon = ({ styles }: { styles?: string }) => {
  return <FiLinkedin className={styles} />
}

export const EmailIcon = ({ styles }: { styles?: string }) => {
  return <MdAlternateEmail className={styles} />
}

export const ForwardArrowIcon = ({ styles }: { styles?: string }) => {
  return <MdArrowForward className={styles} />
}

export const MenuIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-8 h-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 8h16M4 16h16"
      />
    </svg>
  )
}

export const CloseIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-8 h-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  )
}

export const HomeIcon = ({ styles }: { styles?: string }) => {
  return <GiHomeGarage className={styles} />
}

export const GlobeIcon = ({ styles }: { styles?: string }) => {
  return <GiWireframeGlobe className={styles} />
}

export const ExternalLinkIcon = ({ styles }: { styles?: string }) => {
  return <BiLinkExternal className={styles} />
}

export const PaperIcon = ({ styles }: { styles?: string }) => {
  return <IoIosPaper className={styles} />
}

export const DeskSetupIcon: IconType = () => {
  return <GiDesk className="text-2xl text-accent" />
}

export const CoffeePotIcon: IconType = () => {
  return <GiCoffeePot className="text-2xl text-accent" />
}

export const HeadphonesIcon: IconType = () => {
  return <GiHeadphones className="text-2xl text-accent" />
}

export const SpotifyIcon: IconType = () => {
  return <FaSpotify className="h-5 w-5" />
}
