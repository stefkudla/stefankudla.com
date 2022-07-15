import { ToolboxIcon } from '@/configs/icons'
import React from 'react'
import DevIcon from '@/components/DevIcon'
import { devIcons } from '@/configs/dev-icons'

const TechSection: React.VFC = () => {
  return (
    <section className="py-24">
      <span className="flex items-center mb-8">
        <div className="icon-border">
          <ToolboxIcon />
        </div>
        <h4 className="text-xl text-accent font-semibold">Toolbox</h4>
      </span>
      <ul className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {devIcons.map(icon => (
          <DevIcon name={icon.name} iconName={icon.iconName} key={icon.name} />
        ))}
      </ul>
    </section>
  )
}

export default TechSection
