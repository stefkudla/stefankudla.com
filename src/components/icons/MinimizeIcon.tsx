import React from 'react'

const MinimizeIcon = ({
  width,
  height,
  classNames,
}: {
  width?: string
  height?: string
  classNames?: string
}) => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 16 16"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      className={classNames}
    >
      <path d="M14 8v1H3V8h11z"></path>
    </svg>
  )
}

export default MinimizeIcon
