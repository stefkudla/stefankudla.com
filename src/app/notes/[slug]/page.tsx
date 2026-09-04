import { notFound } from 'next/navigation'
import BlogLayout from '@/components/BlogLayout'
import SectionWrapper from '@/components/SectionWrapper'
import MdxBody from '@/components/MdxBody'
import DateFormat from '@/components/Date'
import Author from '@/components/Author'
import { getAllNotes } from '@/lib/content'
import { noteTitle } from '@/lib/notes'
import { pageMetadata } from '@/lib/metadata'

type PageProps = { params: Promise<{ slug: string }> }

const findNote = (slug: string) =>
  getAllNotes().find(note => note.slug === slug) ?? null

export function generateStaticParams() {
  return getAllNotes()
    .filter(note => !note.frontmatter.draft)
    .map(note => ({ slug: note.slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const note = findNote(slug)
  if (!note) return {}

  return pageMetadata({
    title: `${noteTitle(note)} | Stefan Kudla`,
    description: note.body.trim().slice(0, 160),
    url: `https://stefankudla.com/notes/${note.slug}`,
  })
}

const NotePage = async ({ params }: PageProps) => {
  const { slug } = await params
  const note = findNote(slug)

  if (!note) {
    notFound()
  }

  return (
    <BlogLayout>
      <SectionWrapper as="div" fullWidth>
        <article className="container mx-auto max-w-3xl px-4">
          <div className="flex flex-col gap-y-3 py-8">
            <span className="font-oswald text-card-border uppercase font-semibold text-xs md:text-sm">
              <DateFormat
                dateString={note.frontmatter.date}
                formatStyle="MMM dd, yyyy"
              />
            </span>
            {note.frontmatter.title && (
              <h1 className="text-2xl sm:text-3xl md:text-4xl text-fore-primary">
                {note.frontmatter.title}
              </h1>
            )}
          </div>
          <MdxBody slug={note.slug} body={note.body} />
          <Author />
        </article>
      </SectionWrapper>
    </BlogLayout>
  )
}

export default NotePage
