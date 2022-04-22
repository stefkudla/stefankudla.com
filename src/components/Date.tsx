import { parseISO, format } from 'date-fns'

interface dateProps {
  dateString: string
}

export const Date: React.FC<dateProps> = ({ dateString }) => {
  const date = parseISO(dateString)
  return (
    <time dateTime={dateString} className="text-fore-subtle">
      {format(date, 'LLLL	, yyyy')}
    </time>
  )
}
