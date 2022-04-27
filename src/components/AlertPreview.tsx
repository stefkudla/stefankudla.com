interface AlertPreviewProps {
  preview: boolean
}

const AlertPreview: React.FC<AlertPreviewProps> = ({ preview }) => {
  preview = true
  return preview ? (
    <div className="fixed text-fore-subtle left-5">
      <div className="py-2 text-center text-sm">
        <>
          This page is a draft.{' '}
          <a
            href="/api/exit-preview"
            className="underline hover:text-cyan duration-200 transition-colors"
          >
            Click here
          </a>{' '}
          to exit preview mode.
        </>
      </div>
    </div>
  ) : undefined
}
export default AlertPreview
