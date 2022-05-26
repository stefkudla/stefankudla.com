const DevIcon: React.FC<{ iconName: string; name: string }> = ({
  iconName,
  name,
}) => (
  <li className="flex items-center" key={name}>
    <i className={iconName}></i>
    <span className="ml-2">{name}</span>
  </li>
)
export default DevIcon
