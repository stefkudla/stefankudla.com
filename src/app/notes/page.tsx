import Link from 'next/link'
import Layout from '@/components/Layout'
import SectionWrapper from '@/components/SectionWrapper'
import MdxBody from '@/components/MdxBody'
import DateFormat from '@/components/Date'
import { getAllNotes } from '@/lib/content'
import { noteTitle } from '@/lib/notes'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata({
  title: 'Notes | Stefan Kudla',
  description: 'Short-form notes by Stefan Kudla',
  url: 'https://stefankudla.com/notes',
})

const Notes = () => {
  const notes = getAllNotes()

  return (
    <Layout>
      <SectionWrapper classNames="!py-0 max-w-3xl self-stretch" innerPadding>
        <div className="max-w-screen-lg mx-auto flex flex-col items-start w-full text-start gap-y-6 py-20">
          <h1 className="font-oswald font-bold">Notes</h1>
          <p className="text-lg max-w-sm text-fore-subtle font-bold">
            Short-form writing by{' '}
            <span className="text-accent">Stefan Kudla</span>
          </p>

          {notes.length === 0 ? (
            <p className="text-fore-subtle">No notes yet.</p>
          ) : (
            // Full text inline, newest first — a note is short enough to read
            // here, and a grid of cards would make it feel unfinished.
            <div className="flex w-full flex-col gap-y-12 pt-6">
              {notes.map(note => (
                <article
                  key={note.slug}
                  className="flex w-full flex-col gap-y-3 border-b border-b-back-subtle pb-12 last:border-b-0"
                >
                  <Link
                    href={`/notes/${note.slug}`}
                    className="font-oswald text-card-border uppercase font-semibold text-xs md:text-sm hover:text-accent transition-colors"
                  >
                    <DateFormat
                      dateString={note.frontmatter.date}
                      formatStyle="MMM dd, yyyy"
                    />
                  </Link>
                  {note.frontmatter.title && (
                    <h2 className="text-xl md:text-2xl font-bold">
                      <Link
                        href={`/notes/${note.slug}`}
                        className="hover:underline"
                      >
                        {noteTitle(note)}
                      </Link>
                    </h2>
                  )}
                  <MdxBody slug={note.slug} body={note.body} />
                </article>
              ))}
            </div>
          )}
        </div>
      </SectionWrapper>
    </Layout>
  )
}

export default Notes
