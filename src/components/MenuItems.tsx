import { House, FileText, Mail } from 'lucide-react'

export const routes = [
  {
    path: '/',
    label: 'Home',
    icon: House,
  },
  {
    path: '/posts',
    label: 'Posts',
    icon: FileText,
  },
  {
    path: '/contact',
    label: 'Contact',
    icon: Mail,
  },
]
