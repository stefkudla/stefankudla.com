import Link from 'next/link'

const AlertPreview: React.FC = () => {
  return (
    <div className="fixed z-20 top-12 left-0 text-fore-subtle bg-back-subtle px-8">
      <div className="py-2 text-center text-sm">
        <>
          This page is a draft.{' '}
          <Link href="/api/exit-preview">
            <a className="underline hover:text-cyan duration-200 transition-colors cursor-pointer">
              Click here
            </a>
          </Link>{' '}
          to exit preview mode.
        </>
      </div>
    </div>
  )
}
export default AlertPreview
