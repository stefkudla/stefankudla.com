import Link from 'next/link'
import JsonLd from './JsonLd'
import { breadcrumbList, type Crumb } from '@/lib/structured-data'

/**
 * Visible breadcrumb trail plus its `BreadcrumbList`, so the markup a reader
 * sees and the graph a crawler reads can never disagree — they are built from
 * the same array.
 *
 * The last crumb is the current page: rendered as text, not a link, and marked
 * `aria-current="page"`.
 */
const Breadcrumbs: React.FC<{ crumbs: Crumb[]; pageUrl: string }> = ({
  crumbs,
  pageUrl,
}) => (
  <>
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex min-w-0 flex-nowrap items-center overflow-hidden font-oswald text-card-border uppercase font-semibold text-xs md:text-sm">
        {crumbs.map((crumb, index) => (
          <li
            key={crumb.name}
            className="flex min-w-0 shrink-0 items-center last:shrink"
          >
            {index > 0 && (
              <span aria-hidden className="px-2">
                /
              </span>
            )}
            {crumb.href ? (
              <Link
                href={crumb.href}
                className="hover:text-accent transition-colors"
              >
                {crumb.name}
              </Link>
            ) : (
              <span aria-current="page" className="truncate text-fore-subtle">
                {crumb.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
    <JsonLd data={breadcrumbList(crumbs, pageUrl)} />
  </>
)

export default Breadcrumbs
