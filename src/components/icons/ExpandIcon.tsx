const ExpandIcon = ({
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
      fill="none"
      strokeWidth="0"
      viewBox="0 0 24 24"
      height={height ?? '20'}
      width={width ?? '20'}
      xmlns="http://www.w3.org/2000/svg"
      className={classNames}
    >
      <path
        d="M12.3062 16.5933L12.2713 18.593L5.2724 18.4708L5.39457 11.4719L7.39426 11.5068L7.33168 15.092L15.2262 7.46833L11.6938 7.40668L11.7287 5.40698L18.7277 5.52915L18.6055 12.5281L16.6058 12.4932L16.6693 8.85507L8.72095 16.5307L12.3062 16.5933Z"
        fill="currentColor"
      ></path>
    </svg>
  )
}

export default ExpandIcon
