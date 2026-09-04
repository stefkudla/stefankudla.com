import cn from 'classnames'
import HashIcon from '@/components/icons/HashIcon'

/**
 * An `h2` with the hover-revealed `#` anchor. Shared so Cosmic markdown
 * (`PostBody`) and repo-local MDX (`MdxBody`) render byte-identical headings
 * while both paths coexist.
 */
const PostHeading: React.FC<{ id: string; children: React.ReactNode }> = ({
  id,
  children,
}) => (
  <h2 id={id} className="group">
    {children}
    <a
      className={cn(
        'ml-2 opacity-0 group-hover:opacity-50 inline-block align-middle mb-1'
      )}
      href={`#${id}`}
    >
      <HashIcon />
    </a>
  </h2>
)

export default PostHeading
