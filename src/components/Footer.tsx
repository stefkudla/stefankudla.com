import React from 'react'
import MenuItems from './MenuItems'
import SocialIcons from './SocialIcons'

const Footer: React.VFC = () => {
  return (
    <footer className="flex flex-col justify-end max-w-2xl px-4 lg:px-0 py-8 mx-auto">
      <div className="mb-1">
        <MenuItems />
      </div>
      <div className="flex justify-between items-center">
        <span className="text-xs">
          &copy; 2022 Stefan Kudla. All Rights Reserved.
        </span>
        <SocialIcons />
      </div>
    </footer>
  )
}

export default Footer
