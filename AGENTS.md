# Writing content for stefankudla.com

Everything you need to add a post or a note. If you follow this file exactly,
`bun run validate:content` passes on the first try.

## Where content lives

```
content/posts/<slug>/index.mdx   a post, with its images beside it
                                 (always a directory, even with no images)
content/notes/<slug>.mdx         a note, flat
content/_templates/              the templates the scaffolding script fills in
```

Scaffold rather than hand-rolling the frontmatter:

```bash
bun run new:post how-i-cache-rsc-payloads "How I Cache RSC Payloads"
bun run new:note a-thing-i-noticed
```

Then check your work before opening a PR:

```bash
bun run validate:content
```

It names the file and every field that failed. The same check runs during
`bun run build`, so a malformed post cannot deploy.

## The slug is permanent

**Never rename, move or delete a published post's directory.** The slug is the
URL, those URLs are indexed, and `tests/legacy-slugs.test.ts` fails the build if
one disappears. If a title changes, change the title — not the slug.

Slugs are lowercase letters, digits and hyphens.

## Frontmatter contract

### Posts — every field required except `canonical`, `updated` and `draft`

| Field | Type | Notes |
|---|---|---|
| `title` | string | Most existing titles are title case, a few sentence case — either is fine, just be consistent inside one title. Never repeated as an `# h1` in the body; the page renders it. |
| `date` | `YYYY-MM-DD` | The publication date. On a draft, use the date you expect to publish and correct it when you do. Quoting is optional; the format is not. |
| `excerpt` | string | 80–160 characters. Stands alone in a search result and a social card. |
| `category` | `tutorial` \| `essay` \| `project` | Closed set. Anything else fails the build. |
| `cover` | path | The social image. Colocated (`./cover.png`), an absolute path, or a URL. **The file must exist** — a missing cover ships a broken preview card. Nothing validates this, so check it. If the post has no image of its own, leave the scaffolded default `/images/stefan_kudla_ogImage.jpg`, which is the site's own card. |
| `canonical` | URL | Only when the post was published elsewhere first. |
| `updated` | `YYYY-MM-DD` | Only on a substantive edit. |
| `draft` | boolean | Defaults to `false`. See *Drafts* below. |

Frontmatter is YAML, so a `title` or `excerpt` that starts with `#`, `[`, `-`
or `*`, or that contains a colon followed by a space, must be quoted. Quoting
anything is always safe.

A filled example — copy this shape:

```mdx
---
title: How to Create a Marquee with Framer Motion and React
date: 2026-09-04
excerpt: A walkthrough of building a smooth, continuous, responsive marquee component in React with Framer Motion.
category: tutorial
cover: ./marquee-cover.png
draft: true
---

In this tutorial we'll build a reusable marquee component…
```

### Notes — looser on purpose

| Field | Type | Notes |
|---|---|---|
| `date` | `YYYY-MM-DD` | Required. |
| `title` | string | **Optional.** Leave it out when the note doesn't need one. |
| `draft` | boolean | Defaults to `false`. |

## Notes versus posts

A **note** is one thought, published because it is worth writing down, not
because it is finished. `/notes` renders every note in full, so a reader never
clicks through to find two sentences.

A **post** teaches something, argues something, or documents something built.

The bar, in order of how much it actually decides:

- **Does it need its own images?** Then it is a post. Notes are flat files and
  have nowhere to put them.
- **Does it need sections?** More than one `##` means it is a post.
- **Length.** Under ~200 words is almost always a note; the posts here run
  240–1,470 words, median ~775.

When genuinely torn, write the note. A note that grows can be promoted to a
post before it is published — but not after, because that would change its URL.

## Images

**In a post**, put image files in the post's own directory and reference them
relatively:

```mdx
![A Lighthouse report scoring 100 across the board](./lighthouse.png)
```

A `prebuild` step copies them into `public/`, measures them with `sharp` and
generates a blur placeholder, so the image reserves its space instead of
shifting the page as it loads. You do not need to supply dimensions.

**In a note**, use an absolute path (`/images/…`) or a URL. Notes are flat, so
a relative path resolves against the *posts* directory and 404s.

Rules that matter:

- **Alt text is not optional.** Describe what the image shows, not that it is
  an image. `![](./x.png)` is a bug.
- **Animated GIFs stay animated** — they are served unoptimised deliberately.
  They are also heavy; prefer a still or a short video when the motion isn't
  the point.
- Do not put images in `public/` for a post. Colocate them.

## Drafts

`draft: true` means: renders in local development and on the Vercel preview
deployment at its real URL, **404s in production**, and never appears in the
sitemap, on `/posts` or `/notes`, or in the feed.

Write with `draft: true`. Removing that line is what publishes the post, and it
should be its own deliberate step.

## Voice

Drawn from the existing posts. Match it; do not imitate a generic blog.

- **First person, plural when teaching.** "In this tutorial, we'll walk
  through…", "I'll walk you through…". Not "one might consider".
- **Open by saying what the reader will have at the end.** One short paragraph.
  No scene-setting about how important the topic is.
- **Tutorials are numbered.** `## Step 1: Setting Up the HTML`, and so on.
  Essays use plain descriptive headings.
- **Show the code, then explain it.** Every fenced block gets a language
  (```tsx, ```bash, ```css). For a filename, use
  ```` ```tsx title="src/components/Marquee.tsx" ```` — this works for any
  language, and the colon form (```` ```tsx:src/components/Marquee.tsx ````)
  silently loses both the filename and the highlighting.
- **Contractions, plain words, short sentences.** No "delve", "leverage",
  "in today's fast-paced world", no exclamation marks.
- **Close by pointing somewhere** — the finished component, a repo, the next
  step. Not a summary of what was just said.
- 4–9 `##` sections is the normal shape.

## MDX gotchas

MDX is Markdown *plus JSX*, which makes a few things that are fine in plain
Markdown into build errors:

- **Every tag must close.** A bare `<img src="…">` or `<br>` is a syntax error.
  Write `<img src="…" />`, or just use Markdown image syntax.
- `<` and `{` in prose need escaping (`\<`, `\{`) or a code span. A code span
  containing a backtick — a template literal, say — needs double backticks
  around it.
- **Comments are `{/* like this */}`.** An HTML comment (`<!-- … -->`) is a
  compile error, and because drafts are not prerendered you will only see it as
  a 500 when you open the page — never at build time.
- Do not add an `# h1` — the page renders the title from frontmatter.

## Checklist before opening a PR

1. `bun run validate:content` passes.
2. The cover file exists, and every image has real alt text.
3. `draft: true` is still set unless you intend to publish now.
4. The slug is one you are willing to keep forever.
5. `bun run dev` and read the post at its route.
