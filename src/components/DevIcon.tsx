import React from 'react'

interface DevIconProps {
  iconName: string
  name: string
}

const DevIcon: React.VFC<DevIconProps> = ({ iconName, name }) => {
  return (
    <li className="flex items-center" key={name}>
      <i className={iconName}></i>
      <span className="ml-2">{name}</span>
    </li>
  )
}

export default DevIcon
