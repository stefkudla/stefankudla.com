import { IconType } from 'react-icons'
import {
  GiStripedSun,
  GiMoon,
  GiPencil,
  GiToolbox,
  GiFizzingFlask,
  GiLetterBomb,
} from 'react-icons/gi'
import { FiGithub, FiTwitter } from 'react-icons/fi'
import { MdAlternateEmail } from 'react-icons/md'

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

export const EmailIcon = ({ styles }: { styles?: string }) => {
  return <MdAlternateEmail className={styles} />
}
