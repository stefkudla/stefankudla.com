import { parseISO, format } from 'date-fns'

interface DateProps {
  dateString: string
}

export const Date: React.FC<DateProps> = ({ dateString }) => {
  const date = parseISO(dateString)
  return (
    <time dateTime={dateString} className="text-sm text-fore-subtle">
      {format(date, 'LLLL, yyyy')}
    </time>
  )
}
export default Date
