import Link from 'next/link'

const AlertPreview: React.FC = () => {
  return (
    <div className="absolute w-full z-20 top-12 md:top-16 left-0 text-fore-subtle bg-back-subtle px-8">
      <div className="py-2 text-center text-sm">
        <>
          This page is a draft.{' '}
          <Link
            href="/api/exit-preview"
            className="underline hover:text-accent transition-colors cursor-pointer">
            
              Click here
            
          </Link>{' '}
          to exit preview mode.
        </>
      </div>
    </div>
  );
}
export default AlertPreview
