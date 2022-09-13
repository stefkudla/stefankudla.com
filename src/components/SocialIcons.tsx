import {
  EmailIcon,
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
} from '@/configs/icons'

const SocialIcons: React.FC = () => (
  <span className="flex gap-x-5">
    <a
      href="mailto:stefan@stefankudla.com"
      className="group cursor-pointer"
      aria-label="Email"
      title="Email"
    >
      <EmailIcon />
    </a>
    <a
      href="https://github.com/stefkudla"
      target="_blank"
      rel="noreferrer"
      className="group cursor-pointer"
      aria-label="Github"
      title="Github"
    >
      <GithubIcon />
    </a>
    <a
      href="https://www.linkedin.com/in/stefankudla/"
      target="_blank"
      rel="noreferrer"
      className="group cursor-pointer"
      aria-label="Linkedin"
      title="Linkedin"
    >
      <LinkedinIcon />
    </a>
    <a
      href="https://twitter.com/stefankudla"
      target="_blank"
      rel="noreferrer"
      className="group cursor-pointer text-fore-subtle"
      aria-label="Linkedin"
      title="Linkedin"
    >
      <TwitterIcon />
    </a>
  </span>
)
export default SocialIcons
