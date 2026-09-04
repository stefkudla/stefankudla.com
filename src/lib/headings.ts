/**
 * How many `##` headings a post body carries.
 *
 * `TableOfContents` lists the `h2`s it finds in the DOM, so this has to agree
 * with what the markdown renderer actually emits. Two things follow:
 *
 * - **Fenced code blocks are stripped first.** A `##` inside a fence is a shell
 *   comment, not a heading. `building-react-components-from-headless-cms-markdown`
 *   has four of them (`## or`, between the npm/pnpm/yarn install lines); counting
 *   those would put a table of contents on a post whose DOM has none to show.
 * - **Only `h2` counts**, because only `h2` is what the component queries.
 *
 * Cosmic's `metadata.content` and a local post's MDX are both markdown, so one
 * counter serves both rendering paths.
 */
export const countHeadings = (body: string): number =>
  (body.replace(/^```[\s\S]*?^```/gm, '').match(/^## +\S/gm) || []).length

/**
 * Below this, the page renders no table of contents at all.
 *
 * Two, not one: a single-item table of contents is a "Table of contents" label
 * above one link to a heading that is already on screen. It costs a sidebar and
 * returns nothing. No post has exactly one `h2` today — this is the threshold
 * being deliberate rather than incidental.
 */
export const TOC_MIN_HEADINGS = 2
