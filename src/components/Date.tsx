import { parseISO, format } from 'date-fns'

const Date: React.FC<{ dateString: string; formatStyle: string }> = ({
  dateString,
  formatStyle,
}) => {
  const date = parseISO(dateString)
  return <time dateTime={dateString}>{format(date, formatStyle)}</time>
}
export default Date
