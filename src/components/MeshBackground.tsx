import React from 'react'

interface CircleProps {
  color: string
}

const Circle: React.VFC<CircleProps> = ({ color }) => {
  return (
    <div
      className="w-[300px] rounded-full h-[300px] first:scale-125 last:scale-125 blur-3xl"
      style={{ backgroundColor: color }}
    />
  )
}

const MeshBackground: React.VFC = () => {
  const colors = ['#17bce6', '#fee440', '#8338ec', '#e50051']

  return (
    <>
      <div className="hidden absolute pl-48 pt-48 -rotate-[45deg] md:grid grid-cols-2 gap-16 blur-[8rem] opacity-70 dark:opacity-30 scale-0 sm:scale-[.6] -z-30 pointer-events-none">
        {colors.map(color => {
          return <Circle color={color} key={color} />
        })}
      </div>
    </>
  )
}

export default MeshBackground
