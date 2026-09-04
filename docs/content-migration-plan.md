# Content Migration Plan

Moving site content out of Cosmic and into the repo as MDX, so posts can be drafted,
reviewed and published by an agent through a pull request.

**Status:** in progress · **9 / 24 tasks complete** · Stage 0, 1 and 2 done
**Last updated:** 2026-09-03
**Verified against:** commit `bca37e2`, Cosmic bucket `stefankudlacom-production`, live site

> **Next blocker: [D-01](#d-01--pages-router-or-app-router--blocks-stage-3-onward) is unanswered.** Everything not blocked on a decision has been done.
> Stage 3 onward cannot start until the router question is settled.

---

## How to use this document

This is the source of truth for the migration, across many sessions. It is meant to be
picked up half-finished.

- **Tick the checkbox** when a task's acceptance criteria are met. Not before.
- **Do not start a task whose `Blocked by` is unmet.** Say so and pick another.
- **Do not answer an open decision on Stefan's behalf.** Decisions live in
  [§3](#3-decisions-stefan-has-to-make) and are his call. If a task you were asked to do
  depends on an open decision, do every part that doesn't, and say which part is waiting.
- **Add a line to [§6 Changelog](#6-changelog)** whenever you complete a task or learn
  something that changes the plan.
- **Slugs are permanent.** Never rename, move, or delete a file under `content/posts/`
  once it exists. See T-11.
- **Nothing pushes to `main`.** Branch and PR only, without exception.

### Parallel agents: one git worktree each, no exceptions

This was learned the hard way on 2026-09-03. Four agents were given separate branch *names* but
shared a single working directory. `git checkout -b` does not isolate: every agent's checkout
moved HEAD for all of them, so all seven commits piled onto one branch, and one agent silently
reverted another's `.gitignore` edit after reading a stale copy.

**Branch names are not isolation. A working directory is.** Before dispatching parallel agents:

```bash
WT=/Users/stefankudla/Documents/code/.stefankudla-worktrees
git worktree add "$WT/<agent-name>" -b <branch> main
# ...agent works only inside $WT/<agent-name>, runs its own `bun install`...
git worktree remove "$WT/<agent-name>"     # after its branch is verified
```

Each worktree has its own HEAD, index and files, sharing one object database — verified here.
Give every agent an absolute path to its own worktree and tell it never to `cd` out of it.
Keep file-level partitioning as well: worktrees prevent branch collisions, partitioning
prevents two agents editing the same file and one overwriting the other's work.

---

## 1. Repo facts

Established by direct verification. Trust these; don't re-derive them.

| | |
|---|---|
| Framework | Next.js **16.1.6**, **Pages Router** (`src/pages/`). No `app/` directory. |
| React | 19.2.4 |
| TypeScript | Yes, `strict: true`. `npx tsc --noEmit` passes clean. |
| Package manager | **bun** (`bun.lockb`, bun-specific `.npmrc`). Not pnpm, not npm. |
| Styling | Tailwind 3.3 + `@tailwindcss/typography`, `next-themes` for dark mode |
| Build | `npx next build` succeeds in <4s. One cosmetic `caniuse-lite` staleness warning. |
| Lint | Repaired by T-09. **ESLint is pinned to `^9.39.5` on purpose — do not "upgrade" it.** ESLint 10 removes `scopeManager.addGlobals`, which `typescript-eslint` 8.x still calls; `typescript-eslint` v9 does not exist yet. Bumping ESLint to 10 re-breaks lint entirely. |
| Tests | Vitest 5, added by T-10. `bun run test`. Config is `vitest.config.mts` with an explicit `@` → `./src` alias (`vite-tsconfig-paths` failed to resolve for files outside `src/`). |
| Markdown rendering | `react-markdown` v10 + `react-syntax-highlighter`, not MDX |
| Images | `next/legacy/image` via `src/components/BlurImage.tsx` |
| Sitemap | `next-sitemap` as a `postbuild` step |
| Node | v26.8.1 |
| Deploy | Vercel project **`stefankudla`** (`prj_Jq6RoQIpR4Mb90Hd2DV9mvdPzAiA`) in team `team_e5YJJUrK30kJGm69DNoTrRvd` (hobby), GitHub-linked to `stefkudla/stefankudla.com`. No `.vercel/` on disk and none needed — Git integration handles it. Build command is `bun run build`, with `next-sitemap` via `postbuild`. |
| Build strictness | Vercel **fails** builds on TypeScript errors rather than warning. Both historical failed deploys were type errors. Good news for the migration: a Zod-validated loader really will stop a bad post from deploying. |

### Cosmic surface

Cosmic is wired into **8 files** across three layers. It is not a posts-only dependency.

| Layer | Where |
|---|---|
| Build-time (ISR) | `/`, `/posts`, `/posts/[slug]`, `/projects`, `/services` — all `getStaticProps`, revalidate 180s (5s on projects) |
| Request-time | `/api/recent-posts` (called from the Header on **every page** via SWR), `/api/preview`, `/api/exit-preview`, `/api/revalidate` |
| Content types | `posts`, `post-categories`, `services`, `projects`, `projects-page`, `products` |

Client: `src/lib/cosmic.ts`. Env vars in `.env` (gitignored):
`NEXT_PUBLIC_COSMIC_BUCKET_SLUG`, `NEXT_PUBLIC_COSMIC_READ_KEY`, `COSMIC_PREVIEW_SECRET`.

### Content inventory

- **11 posts**, all storing **plain markdown** in `metadata.content`. No HTML, no rich-text
  wrapper, no separate code field. **No `turndown` conversion is needed.**
- **33 fenced code blocks, 61 inline code spans** across those 11 posts — all intact in Cosmic.
- **5 categories**: Perspective, Next.js, Web Dev, Tailwind CSS, React. Stored as Cosmic
  *reference objects*, not strings — resolve them, don't copy the ID.
- Displayed post date comes from Cosmic `created_at` (not `published_at`).
- `metadata.canonical` is `null` on all 11. Correct canonicals come from the fallback at
  `src/pages/posts/[slug].tsx:35`, not from data.
- **31 imgix assets, 27.6 MB total, 7 animated GIFs.** Largest is an 8.0 MB GIF in
  `building-react-components-from-headless-cms-markdown`. **4 assets are already dead** — see T-02.
- Post cover images double as OG images; there is no separate OG asset.

### The 11 slugs (permanent — these URLs must never change)

```
how-to-create-a-marquee-with-framer-motion-and-react
simple-scroll-animations-with-html-and-javascript-quick-guide
i-built-a-free-sitemap-comparison-tool
how-to-deploy-a-static-html-css-and-javascript-website-to-vercel
building-react-components-from-headless-cms-markdown
heres-why-all-musicians-need-a-website-in-2022
how-to-use-nextjs-image-with-a-headless-cms
coding-your-design-system-with-tailwind-css
how-im-using-cosmic-to-optimize-my-website
how-i-started-freelancing-as-a-web-developer-in-2022
creativity-and-software-development-is-a-wonderful-combination
```

Plus static routes: `/`, `/about`, `/contact`, `/posts`, `/projects`, `/services`.

**Two more live URLs that 404 today and are missing from the plan's original list.** Both are absent from the sitemap but still receive traffic from inbound links, so they need redirects (see T-21):

| URL | Status | Visitors, 30d |
|---|---|---|
| `/publications` | 404 | 3 |
| `/tools` | 404 | 3 |

### ⚠ The one post that carries the site

`/posts/how-to-deploy-a-static-html-css-and-javascript-website-to-vercel` is **the highest-traffic page on the site after the homepage**, and it is roughly **69% of all blog traffic**. Vercel Analytics, last 30 days (the hobby plan retains only 31 days, so no longer-range trend is available):

| Path | Visitors | Pageviews |
|---|---|---|
| `/` | 147 | 150 |
| **`/posts/how-to-deploy-a-static-html-css-and-javascript-website-to-vercel`** | **44** | **46** |
| `/posts/simple-scroll-animations-…` | 5 | 5 |
| every other post | 1–3 | 1–3 |

**Treat this file as the highest-risk item in the migration.** It is also the post with the most to lose:

- **6 inline screenshots — more than any other post.** All 6 are alive (none of the four dead assets are here), but all 6 are imgix-hosted. This is a step-by-step tutorial: if the images break, the page is worthless even though the prose survives.
- **7 inline code spans** — `npm run build`, `pnpm build`, `yarn build`, `webpack.config.js`, `package.json`. These are the exact terms the page ranks for, and they were being stripped from server HTML by the T-04 bug. **T-04 fixed this**, which is a direct SEO win on the best page.
- **The TLDR block uses in-page anchor links.** The post opens with `[Build settings using Webpack](#configure-the-vercel-build-and-output-settings)` and `[Build settings without using Webpack](#deploying-a-website-without-webpack)`. These depend on `rehype-slug` generating byte-identical heading IDs after migration. If slugification changes, the TLDR silently breaks.

**These seven anchor IDs must be identical post-migration. Assert them, don't eyeball them:**

```
#tldr
#project-and-directory-setup
#create-a-public-folder
#create-a-new-github-repository
#create-a-new-vercel-project
#configure-the-vercel-build-and-output-settings
#deploying-a-website-without-webpack
```

**Exception to the staleness notice (plan §6).** The original plan wants a "written in 2023, my current work looks quite different" banner on anything older than 18 months. This post would qualify and **must not get one** — a staleness banner on the only page earning traffic is self-sabotage. The correct treatment is the opposite: refresh its six screenshots against Vercel's current dashboard, set `updated`, and let it read as maintained. See D-10.

Minor while in there: `[Vercel](http://vercel.com)` uses `http`.

---

## 2. Corrections to the original implementation plan

The plan at `stefankudla-com-implementation-plan.md` was written from fetched HTML with no
repo access. It is broadly sound, but **someone may still have it open**, and these five
points are wrong in ways that cause real damage.

### 2.1 "Code blocks may be lossy" — no. Nothing is missing.

The plan's highest-severity finding, marked *blocks migration*. It is a false alarm.

The marquee post's install command exists intact in Cosmic
(```` ```bash\nnpm install framer-motion @react-hook/window-size\n``` ````) and is present in
the live page's `__NEXT_DATA__`. It is absent only from server-rendered HTML, because
`src/components/CodeBlock.tsx:30` returns `null` until `hasMounted` — so every code element
renders as an empty `<pre></pre>` on the server and only fills in after hydration.

Verified across all 11 posts: fence count == `<pre>` count == *empty* `<pre>` count, on every
single one. A perfect one-to-one match, which is what proves the content survives the pipeline
and dies at the component.

**The dangerous instruction:** §3.1 step 3 says to "diff every post's code-block count against
the live rendered page." Doing that compares against pages where every block is empty and
concludes the content was already gone. **Always diff against the Cosmic API or the archived
export — never against rendered HTML.**

### 2.2 `next-mdx-remote/rsc` will not work

The plan specifies an RSC-based compile and an App Router `opengraph-image` route convention.
This site is Pages Router. See decision **D-01**.

### 2.3 The URL smoke check cannot detect a broken slug

`src/pages/posts/[slug].tsx:62` sets `fallback: true`. Unknown slugs return **HTTP 200**, not
404 — verified live (`/posts/does-not-exist-xyz` → `200`). §3.3's guarantee #3, "assert 200
plus a non-empty `<h1>`", therefore **passes on a deleted post** — the exact failure it exists
to catch. See T-06.

### 2.4 Removing Cosmic breaks more than the posts pipeline

Two dependencies outside the plan's extraction scope: the hardcoded imgix OG image at
`src/components/Meta.tsx:51,59` (used on every non-post page) and the client-side
`/api/recent-posts` call from the Header. Plus four content types and three pages beyond posts.
The bucket **cannot** be cancelled at the end of the posts migration as §3.5 implies.

### 2.5 Smaller corrections

| Plan said | Actually |
|---|---|
| "`/rss.xml` returns empty" | Returns **404**. Never implemented. And `src/components/Meta.tsx:33` has been advertising `/feed.xml` autodiscovery to a 404 for the site's whole life. |
| "Broken image with an empty `src`" (finding #6) | Not a bug. It's the base64 blur placeholder `next/legacy/image` emits in `layout="responsive"` (`src/components/BlurImage.tsx:20`). Every image renders two `<img>` tags. Nothing to fix. |
| "Images likely 5–20 MB" | **27.6 MB.** |
| "The marquee post has one [GIF]" | **7 GIFs** site-wide. |
| `pnpm` throughout | **bun.** |
| CI runs lint | Lint is broken and has to be repaired first. |
| Vitest slug-parity test | No test runner exists at all. |
| Per-post OG images are separate assets | They're the cover images. Preserving covers preserves OG automatically. |
| Estimate: Phase 2 at 8–12h | **5–8h.** No HTML conversion needed. |

---

## 3. Decisions Stefan has to make

Agents must not resolve these. Record the answer inline and date it.

### D-01 · Pages Router or App Router — **blocks Stage 3 onward**

> **Status:** ⬜ open

The plan's entire content stack (`next-mdx-remote/rsc`, `opengraph-image` route convention)
assumes App Router. This site is Pages Router.

- **A — Stay on Pages.** Use `next-mdx-remote`'s serialize/hydrate pair. Least disruption,
  ships fastest. Auto-generated OG images need a different approach (`/api/og` with
  `@vercel/og`). Keeps the site on the older routing model.
- **B — Migrate routes to App Router first.** Everything in the plan works as written
  afterward. Better long term. Adds work that is **not** in any existing estimate — realistically
  8–14h for 6 routes plus the API handlers, before pipeline work starts.

*Recommendation: B, but only if Stefan wants to be in this codebase for years. If the goal is
to publish again this month, A.*

**Decision:** _(unanswered)_

### D-02 · Feed path — `/feed.xml` or `/rss.xml`

> **Status:** ⬜ open · blocks T-16

`Meta.tsx:33` already advertises `/feed.xml`. The plan says `/rss.xml`. Pick one and make the
`<link rel="alternate">` match. Don't ship a third path.
*Recommendation: `/feed.xml`, matching the link that already exists.*

**Decision:** _(unanswered)_

### D-03 · Replacement author bio copy

> **Status:** ⬜ open · blocks T-05

One sentence, to replace the "Freelance Web Developer, Music Producer, and Tech Content
Creator" text. Stefan's voice, not an agent's.

**Decision:** _(unanswered)_

### D-04 · The four dead images

> **Status:** ⬜ open · blocks T-03

Four post images are permanently gone from imgix. Per image: recreate the screenshot, replace
with something equivalent, or remove the reference and adjust surrounding prose.
Two are Cosmic dashboard screenshots that may not be worth recreating.

**Decision:** _(unanswered)_

### D-05 · GIF handling — 7 files, not 1

> **Status:** ⬜ open · blocks T-14

`next/image` won't animate an optimized GIF. Either mark them `unoptimized` or convert to
muted autoplay `<video>`. The plan recommended conversion when it thought there was one file;
at 7 files (including an 8.0 MB one) conversion is more work but a much bigger win.

**Decision:** _(unanswered)_

### D-06 · `/about` versus the AboutSheet drawer

> **Status:** ⬜ open · blocks T-22

`/about` is genuinely orphaned — **zero** `href="/about"` in the live HTML of any page. But the
Header's "About me" button doesn't link it; it opens `AboutSheet`, a client-side drawer mounted
in `src/pages/_app.tsx:22` that duplicates much of the page's content. Adding About to the nav
without resolving this ships two competing Abouts.

**Decision:** _(unanswered)_

### D-07 · `/services` — 301 to `/contact`, or rewrite?

> **Status:** ⬜ open · blocks T-21

Live, 200, in the sitemap, indexed, `Allow: /` in robots.txt, Cosmic-backed. The plan wants it
redirected. If freelance inquiries still arrive through it, that's Stefan's call.

**Decision:** _(unanswered)_

### D-08 · Content layout — colocated or flat

> **Status:** ⬜ open · blocks T-12

`content/posts/<slug>/index.mdx` + colocated assets, or `content/posts/<slug>.mdx` +
`public/images/posts/<slug>/`. *Recommendation: colocated — "the post" is one directory,
which is easier for an agent to reason about.*

**Decision:** _(unanswered)_

### D-10 · Refresh the Vercel-deploy post's screenshots?

> **Status:** ⬜ open · does not block anything

The site's top page is a 2023 step-by-step tutorial whose six screenshots show a Vercel dashboard UI that has since changed. Refreshing them is the single highest-value editorial act available on the site, and it pairs with the staleness-notice exception above. It is genuinely editorial work — someone has to walk the flow and re-capture — so it is Stefan's call whether it becomes a task or stays a background item.

**Decision:** _(unanswered)_

### D-09 · Category taxonomy

> **Status:** ⬜ open · blocks T-12

Keep the existing five, or collapse and remap. Whatever is chosen becomes a closed Zod enum.

**Decision:** _(unanswered)_

---

## 4. Tasks

Ordered by real dependency, not by report order.

### Stage 0 · Salvage — do this first

> Content is **actively decaying**. Four assets have already been lost. This stage is the only
> irreversible risk in the whole project; everything else can be redone. It depends on nothing.

- [x] **T-01 · Archive the Cosmic bucket** ✅ `salvage/cosmic-archive-and-assets` · `eb51a41`
  > **Done.** `scripts/export-cosmic.mjs` → gitignored `scripts/cosmic-export/` (`objects.json` + `by-type/<type>.json`). 52 objects across 11 types: posts 11, services 12, products 8, post-categories 5, menu-items 4, works 3, configs 2, pages 2, projects 2, work-categories 2, projects-page 1. All 11 required post slugs present with non-empty content (1,400–10,536 chars) and a cover image.
  Export the full bucket as JSON before anything else touches it. This becomes the rollback
  source and the diff target for migration verification.
  - Fetch all objects with content and metadata via the Cosmic v3 API using the keys in `.env`.
  - Write to `scripts/cosmic-export/` and **gitignore it** (it's an archive, not source).
  - **Done when:** the export contains all 11 posts with non-empty `metadata.content`, plus the
    `post-categories`, `services`, `projects`, `projects-page` and `products` object types. A
    second copy exists outside the repo.
  - *Blocked by: nothing*

- [x] **T-02 · Download all 31 imgix assets** ✅ `salvage/cosmic-archive-and-assets` · `b65e08a`
  > **Done.** 31 unique URLs / 32 references / **28 files, 28.23 MB** in `assets/cosmic-archive/<slug>/`, manifest at `scripts/asset-manifest.json`. Byte-completeness re-verified against `Content-Length` per file; `file(1)` confirms every artifact is a valid PNG/JPEG/GIF.
  > **Exactly 4 dead, no more — decay has not accelerated.** 7 GIFs total (5 downloaded, 2 among the dead).
  > Count note: `…-design-systems-tailwind.png` is referenced by two posts, so 31 URLs → 32 references → 28 files (a copy under each owning slug, keeping post directories self-contained).
  Every hour these stay only on Cosmic's imgix account is exposure. `imgix.cosmicjs.com` is
  Cosmic's account keyed to Stefan's bucket, not his own.
  - Source URLs: the 11 `metadata.cover_image.imgix_url` values plus every
    `https://imgix.cosmicjs.com/...` in post content, plus the site-wide OG image hardcoded at
    `src/components/Meta.tsx:51,59`.
  - **Done when:** 27 files on disk (31 referenced minus the 4 dead), each byte-complete and
    matching its `Content-Length`. A manifest maps original URL → local path → owning post.
  - *Blocked by: nothing. Do not wait for D-01 or D-08 — park the files, place them later.*

- [ ] **T-03 · Recover or replace the four dead images**
  These return a hard `403` today, with a browser user-agent, on the live site:
  ```
  …/aafe7660-0527-11ed-b7be-d956591ad437-image-bucket.png
      → how-im-using-cosmic-to-optimize-my-website
  …/89c95c50-2226-11ed-8337-95a76fda76ff-react-markdown-ast-diagram.png
      → building-react-components-from-headless-cms-markdown
  …/0ebcd220-0e0e-11ed-b569-c7971f032df6-blur-placeholder-next.gif
      → how-to-use-nextjs-image-with-a-headless-cms
  …/ac715ea0-0deb-11ed-b476-13ceb56f12f2-image-settings.gif
      → how-to-use-nextjs-image-with-a-headless-cms
  ```
  - First check the Cosmic dashboard media library — needs an authenticated session, so an agent
    likely cannot do this part.
  - **Done when:** each of the four is either recovered, replaced, or explicitly dropped with the
    surrounding prose adjusted — and the outcome is recorded against D-04.
  - *Blocked by: T-02, D-04*

### Stage 1 · Independent fixes — ship these now

> None of these depend on the router decision or the content pipeline. Two are prerequisites for
> the plan's own safety guarantees. All are small.

- [x] **T-04 · Render code blocks on the server** ✅ `fix/codeblock-server-rendering` · `1d6e2f8`
  > **Done.** Removed the `hasMounted` gate from `CodeBlock.tsx`; `PostBody.tsx` needed no change. **All 33 fenced blocks now populated in server HTML, zero empty `<pre></pre>` across all 11 posts.** Inline code renders too — the marquee post's double-space artifact is gone.
  > **There was no real hydration mismatch** — `PrismLight` emits byte-identical markup server and client, so the gate was defensive, not necessary. Console clean.
  > Incidental, pre-existing, not fixed: `react-markdown` v10 passes a `node` prop through `PostBody`'s spread, so blocks carry a stray `node="[object Object]"` attribute. Harmless and consistent, but now visible in server HTML. Worth stripping separately.
  `src/components/CodeBlock.tsx:30` returns `null` until mounted, so **33 fenced blocks and 61
  inline code spans** are invisible to anything that reads HTML rather than running JS —
  crawlers, link previews, LLM fetches. Inline code is the worse half: it deletes words from
  sentences silently (`"we'll also use the `@react-hook/window-size` package"` renders server-side
  as `"we'll also use the  package"`).
  - Remove the `hasMounted` gate. If it exists to dodge a hydration mismatch, fix the mismatch —
    don't restore the gate.
  - **Done when:** `npx next build` output for
    `/posts/how-to-create-a-marquee-with-framer-motion-and-react` contains
    `npm install framer-motion @react-hook/window-size` inside a `<pre>`, no `<pre></pre>` is
    empty on any of the 11 posts, and no hydration warning appears in the browser console.
  - *Blocked by: nothing.* **Do this before the migration** — it proves the content pipeline is
    sound before anyone bets a migration on it.

- [ ] **T-05 · Replace the stale author bio**
  "Freelance Web Developer, Music Producer, and Tech Content Creator" contradicts the homepage's
  "Lead Full Stack Developer at Euronet Worldwide" on all 11 post pages.
  - Single source: `src/components/Author.tsx:12`. Hardcoded, no CMS involvement.
    `<Author />` is used in exactly one place, `src/pages/posts/[slug].tsx:46`.
  - **Done when:** the new copy from D-03 renders on all 11 post pages and the old string
    returns zero hits across `src/`.
  - *Blocked by: D-03*

- [x] **T-06 · Make unknown post slugs return a real 404** ✅ `fix/post-404-and-dead-fetches` · `1c0dc36`
  > **Done.** Chose **`fallback: 'blocking'` + `notFound: true, revalidate: 180`**. Both options satisfy the smoke check equally, so `'blocking'` won as the less disruptive: it keeps the ability to serve a newly published CMS post without a rebuild, and the `revalidate` means a 404 recovers on its own rather than caching permanently.
  > Verified on a local prod build: `/posts/does-not-exist-xyz` → **404**; all 11 real slugs → **200** with non-empty `<article>`; exactly 11 static post paths emitted.
  > Removed as newly-unreachable: the `router.isFallback` loader branch, the `PageNotFound` guard, and both orphaned imports.
  `src/pages/posts/[slug].tsx:62` sets `fallback: true`, so a missing slug returns **200** with
  the not-found component inside. Until this changes, no post-deploy URL check means anything —
  a renamed content file, the most plausible way this project breaks, sails straight through.
  - Switch to `fallback: false`, or `'blocking'` with an explicit `notFound: true` when
    `getSinglePost` returns null.
  - **Done when:** `/posts/does-not-exist-xyz` returns HTTP **404** in production, and all 11
    real slugs still return 200 with their content.
  - *Blocked by: nothing.* **Prerequisite for T-19.**

- [x] **T-07 · Delete the dead homepage Cosmic fetches** ✅ `fix/post-404-and-dead-fetches` · `65eef4c`
  > **Done.** Removed both fetches, both props, and the orphaned `getAllPosts` / `cosmic` / `Services` imports. **Rendered markup byte-identical** — the only diff is JS chunk filenames and per-build `buildId` hashes. `__NEXT_DATA__` `pageProps` went from a ~4 KB payload to `{}` (page 48,585 → 44,521 bytes).
  > Noted, not touched: `getStaticProps` now returns empty props purely to retain `revalidate: 180`. Dropping it entirely would change the route from SSG-with-ISR to fully static — a behaviour change, out of scope.
  `src/pages/index.tsx:35,37` fetches `allPosts` and `services` in `getStaticProps` and passes
  both as props the component never reads — two Cosmic calls per revalidation for nothing.
  - **Done when:** both fetches and their props are gone, `IntroSection`/`CtaSection` render
    unchanged, and `tsc --noEmit` passes.
  - *Blocked by: nothing*

- [x] **T-08 · Stop tracking `public/sitemap.xml`** ✅ `salvage/cosmic-archive-and-assets` · `89ee977`
  > **Done.** `git rm --cached` + gitignored. `git ls-files public/sitemap.xml` is empty; a full `bun run build` regenerates a valid 17-URL sitemap at that path and git ignores it.
  It's committed to git and dated `2026-03-01`, while the live one is `2026-09-04`. The
  `postbuild` `next-sitemap` step overwrites it every build, so the tracked copy only produces
  noisy diffs — and if a build ever skips `postbuild`, it silently serves a five-month-old sitemap.
  - **Done when:** `git ls-files public/sitemap.xml` is empty, the path is in `.gitignore`, and
    a fresh `bun run build` still produces a valid sitemap at that location.
  - *Blocked by: nothing*

### Stage 2 · Toolchain — required before any CI gate

- [x] **T-09 · Repair ESLint** ✅ `chore/toolchain-lint-and-tests` · `86bbc4f`
  > **Done — but it was two breakages, not one.** (1) The `FlatCompat` crash: `eslint-config-next@16` ships a real flat config, so `eslint.config.mjs` now imports `eslint-config-next/core-web-vitals` and `eslint-config-prettier/flat` directly; `@eslint/eslintrc` removed as an orphan. (2) Past that, ESLint 10 died on every file with `TypeError: scopeManager.addGlobals is not a function` — ESLint 10 removed that API and `typescript-eslint` 8.x still calls it, with no v9 published. **ESLint pinned to `^9.39.5`.** See the warning in §1.
  > `bun run lint` now lints `src/` and reports **12 problems (9 errors, 3 warnings)** — 8 of them the same `react-hooks/set-state-in-effect` rule. Deliberately left unfixed: other agents were editing `src/` concurrently. **Follow-up work, not yet a task.**
  `npm run lint` doesn't run at all. ESLint 10.0.2 with `FlatCompat` loading
  `next/core-web-vitals` throws `TypeError: Converting circular structure to JSON` before
  linting a single file. Config is `eslint.config.mjs`.
  - Likely fix: drop `FlatCompat` and consume `eslint-config-next`'s flat config directly, or
    pin ESLint to a version the config supports.
  - **Done when:** `bun run lint` completes and reports findings (or none) without throwing.
  - *Blocked by: nothing.* Prerequisite for making lint a CI check.

- [x] **T-10 · Install a test runner** ✅ `chore/toolchain-lint-and-tests` · `0ec94d5`
  > **Done.** Vitest 5 + `vitest.config.mts`. `tests/utils.test.ts` exercises the real `cn()` from `src/lib/utils.ts` (tailwind-merge conflict resolution, falsy/array flattening) rather than a placeholder assertion.
  There is no Vitest, no Jest, no test script, no test files. The slug-parity test — the plan's
  central URL guarantee — has nowhere to live.
  - Vitest, wired to bun. Add a `test` script.
  - **Done when:** `bun run test` executes and passes with at least one real assertion.
  - *Blocked by: nothing.* Prerequisite for T-11 and T-19.

- [x] **T-11 · Freeze the legacy slug list and assert it forever** ✅ `chore/toolchain-lint-and-tests` · `9adb157`
  > **Done.** `content/legacy-slugs.json` holds the 11 slugs plus the 6 static routes. `getRouteManifest()` in `tests/route-manifest.ts` is the single seam: it reads a committed snapshot of real `next-sitemap` output (`tests/fixtures/generated-sitemap-routes.json`) today, and **switches post routes to `content/posts/*.mdx` automatically the moment that directory exists** — so the guard bites during the migration instead of needing rewiring first. Offline, deterministic, framework-agnostic.
  > **Negative test performed:** removed one slug from the snapshot → test failed with `missing: ["/posts/coding-your-design-system-with-tailwind-css"]`; restored → 3/3 pass.
  > ⚠ Does **not** yet cover `/publications` and `/tools` (see §1) — they 404 today, so they are redirect targets for T-21, not manifest entries.
  The single most plausible way this project loses two years of SEO is an agent renaming a
  content file.
  - Commit `content/legacy-slugs.json` with the 11 post slugs from §1 plus `/`, `/about`,
    `/contact`, `/posts`, `/projects`, `/services`.
  - Add a test asserting the generated route manifest is a **superset** of that file.
  - **Done when:** the test passes today, and fails when a slug is removed from the manifest
    (verify by temporarily removing one).
  - *Blocked by: T-10*

### Stage 3 · Content pipeline — **blocked on D-01**

> Do not start until the router question is answered. Choosing late means rewriting the loader.

- [ ] **T-12 · Content schema and loader**
  `content/`, Zod schemas for posts and notes, `gray-matter` frontmatter parsing, a loader that
  throws at build time on a malformed post, and a standalone validate script.
  - Notes take a deliberately looser schema — date required, title optional.
  - **Done when:** one hand-written post renders at its route, a deliberately malformed
    frontmatter fails the build with a message naming the file and field, and
    `bun run validate:content` reports the same error standalone.
  - *Blocked by: D-01, D-08, D-09*

- [ ] **T-13 · MDX compile and syntax highlighting**
  Whichever compile path D-01 selects, plus `rehype-pretty-code` (Shiki), `rehype-slug` and
  `rehype-autolink-headings` to preserve the existing `#heading-anchor` behaviour.
  - Theme it to the existing dark palette.
  - **Done when:** a test post's code blocks render highlighted **in server HTML** with zero
    client JS, and heading anchors still work.
  - *Blocked by: T-12*

- [ ] **T-14 · Image handling**
  Local images through `next/image`, plus the GIF strategy from D-05.
  - `src/components/BlurImage.tsx` uses `next/legacy/image`; decide whether new content uses it
    or moves to the current API.
  - **Done when:** a test post renders a local raster image and an animated GIF (or its video
    replacement), both correct in light and dark themes.
  - *Blocked by: T-12, D-05*

- [ ] **T-15 · Notes collection and `/notes` routes**
  `/notes` renders notes **inline and in full** as a reverse-chronological stream, not a card
  grid — that presentation is what makes short-form feel legitimate rather than unfinished.
  Permalinks exist for linking and for the feed.
  - **Done when:** two test notes render in full on `/notes` newest-first, each has a working
    permalink, and neither appears on `/posts`.
  - *Blocked by: T-12*

- [ ] **T-16 · Feed**
  Full content, not excerpts. Posts and notes merged, `<category>` distinguishing them.
  - Path per D-02. Fix or keep `src/components/Meta.tsx:33` so autodiscovery points at the feed
    that actually exists.
  - **Done when:** the feed validates, contains full post bodies, excludes drafts in production,
    and the `<link rel="alternate">` on every page resolves to HTTP 200.
  - *Blocked by: T-12, D-02*

- [ ] **T-17 · Draft gate and preview deploys**
  Include `draft: true` posts when `process.env.VERCEL_ENV !== 'production'`. Drafts stay out of
  `/posts`, the sitemap and the feed in production regardless.
  - **Done when:** a draft post is visible on a preview deployment and returns 404 in production,
    and appears in neither the production sitemap nor the feed.
  - *Blocked by: T-12*

- [ ] **T-18 · `AGENTS.md`**
  The cheapest high-leverage item in the project: it determines whether agent-drafted posts
  arrive 80% right or 40% right.
  - Frontmatter contract with a filled example; the **never rename a slug** rule; voice guide;
    image workflow; notes-vs-posts bar; scaffolding scripts; `content/_templates/`.
  - **Done when:** an agent given only `AGENTS.md` produces a post that passes
    `bun run validate:content` on the first attempt.
  - *Blocked by: T-12*

- [ ] **T-19 · CI**
  GitHub Actions on every PR: content validation, slug-parity, typecheck. Lint and link-check
  advisory. Plus a post-deploy smoke check over every legacy URL.
  - The smoke check must assert **real 404s on unknown slugs** and known body text — not just
    200 plus a non-empty `<h1>`. See §2.3.
  - **Done when:** CI is green on a valid PR, red on a PR that removes a legacy slug, and the
    smoke check fails when pointed at a deliberately broken URL.
  - *Blocked by: T-06, T-09, T-10, T-11*

### Stage 4 · Migration

> Run only after the pipeline is proven with one or two hand-written posts. Building the schema
> against imported content before the schema is settled means doing the import twice.

- [ ] **T-20 · Import the 11 posts from the archive**
  Content is plain markdown — **no `turndown`, no HTML conversion**. Verify against the T-01
  archive, never against rendered HTML (§2.1).
  - Known conversions:
    - Two bare unclosed `<img>` tags in `how-to-use-nextjs-image-with-a-headless-cms` — a JSX
      syntax error in MDX. These are the **only** MDX parse hazards in the entire corpus.
    - Three fence titles use colon syntax (```` ```typescript:src/components/Marquee.tsx ````);
      `rehype-pretty-code` expects ```` ```typescript title="…" ````. Unconverted, the language
      silently fails to resolve and the filename is lost.
    - Resolve category reference objects to their titles.
    - Map `created_at` → frontmatter `date`.
    - Set `cover` explicitly from the existing cover image so social previews stay byte-identical.
    - Rewrite all 31 imgix URLs to local paths.
  - **Done when:** all 11 files exist using their Cosmic slug **verbatim**; fenced-block and
    inline-span counts per post match the archive exactly (33 and 61 in total); every image
    resolves locally; T-11's parity test is green; and each post's rendered date matches the
    live site today.
  - *Blocked by: T-01, T-02, T-03, T-12, T-13, T-14*

- [ ] **T-21 · Sitemap, redirects and JSON-LD**
  - Real per-URL `lastmod` from `updated ?? date`. Drop `changefreq` and the uniform
    `priority: 0.7` — every current entry carries the build timestamp, which search engines
    discount.
  - `/services` per D-07.
  - `Article` JSON-LD on post pages.
  - **Done when:** every sitemap URL has a `lastmod` matching its content date, no `changefreq`
    remains, and the JSON-LD validates.
  - *Blocked by: T-20, D-07*

- [ ] **T-22 · Cut the remaining Cosmic surfaces**
  Not in the original plan, and required before the bucket can be cancelled. After T-20 the
  posts are local but Cosmic still serves the OG image, the header badge, and three pages.
  - `src/components/Meta.tsx:51,59` — hardcoded imgix OG image on every non-post page.
  - `RecentPostsBadge` → `/api/recent-posts` (client-side, fires on every page).
  - `/projects`, `/services`, `/api/preview`, `/api/exit-preview`.
  - Then remove `@cosmicjs/sdk`, `src/lib/cosmic.ts`, and the Cosmic env vars.
  - Resolve `/about` vs `AboutSheet` per D-06 while in here.
  - **Done when:** `grep -ri cosmic src/` returns only unrelated hits (the Cosmic logo asset and
    outbound article links), `bun run build` succeeds with the Cosmic env vars unset, and every
    page renders with a working OG image.
  - *Blocked by: T-20, T-21, D-06*

- [ ] **T-23 · Decommission Cosmic**
  Keep the bucket **read-only for 90 days** as a rollback source before cancelling. Confirm the
  T-01 archive is stored outside the repo first.
  - **Done when:** the bucket is read-only, the 90-day date is recorded below, and the archive is
    verified restorable.
  - *Blocked by: T-22*
  - Read-only from: _(date)_ · Safe to cancel after: _(date)_

### Stage 5 · Cleanup

- [ ] **T-24 · Delete dead components**
  Ten section components are defined and never imported: `AboutMeSection`, `BrewSection`,
  `ContactSection`, `FeaturedSection`, `ImageMarquee`, `ProjectsSection`, `SetupSection`,
  `ToolboxSection`, `TopTracksSection`, `WritingsSection`. An agent reading this repo finds ten
  plausible-looking homepage sections that do nothing.
  - Note: `AboutMeSection` is the only component that links `/about` — settle D-06 first.
  - **Done when:** all ten are removed, `tsc --noEmit` passes, `bun run build` succeeds, and no
    rendered page changes.
  - *Blocked by: D-06, T-22*

---

## 5. Not verified

Carried forward so nobody assumes it was checked.

- ~~**Vercel deployment history and build logs.**~~ **Resolved 2026-09-03.** The earlier reading
  ("connected account has no projects, site deploys elsewhere") was wrong — the connector simply
  lacked project-read scope. After reauthorization: current production is `bca37e2`, READY, clean,
  20 static pages / 11 post paths / ~23s build, no warnings. Two historical ERROR deploys, both
  since fixed and both TypeScript failures — `50bc4bc` on main (`CurrentlyPlaying.tsx:8`,
  `React.FC` typed as returning `JSX.Element | undefined`) and `3b8a851` on `update-ui` (PR #16).
  Nothing outstanding.
- **Whether the four dead assets are recoverable from the Cosmic dashboard.** Needs an
  authenticated session.
- **Squash-merge trailer preservation**, if the changelog artifact from plan §7 ever gets built.

---

## 6. Changelog

Append a line whenever a task completes or the plan changes. Newest last.

| Date | Who | What |
|---|---|---|
| 2026-09-03 | Claude | Document created from the verification pass against commit `bca37e2`. No tasks started. |
| 2026-09-03 | Claude | **T-01, T-02, T-08** done on `salvage/cosmic-archive-and-assets`. Bucket archived (52 objects, 11 types); 28 asset files / 28.23 MB committed; sitemap untracked. **Exactly 4 dead assets confirmed — no more. Decay has not accelerated.** |
| 2026-09-03 | Claude | **T-04** done on `fix/codeblock-server-rendering`. 33 fenced blocks + all inline spans now render server-side; zero empty `<pre>` remain. No hydration mismatch existed — the gate was defensive. |
| 2026-09-03 | Claude | **T-06, T-07** done on `fix/post-404-and-dead-fetches`. Unknown slugs now 404 via `fallback: 'blocking'`; homepage's two dead Cosmic fetches removed with byte-identical markup. |
| 2026-09-03 | Claude | **T-09, T-10, T-11** done on `chore/toolchain-lint-and-tests`. Lint repaired (two breakages, ESLint pinned to 9.x); Vitest 5 added; slug-parity guard committed and negative-tested. |
| 2026-09-03 | Claude | Vercel access resolved — §5 entry corrected, real project id and build facts recorded in §1. Prior "deploys from a different account" claim was wrong. |
| 2026-09-03 | Claude | **Stefan flagged the Vercel-deploy post as his top page.** Confirmed: 69% of blog traffic. Added §1 protection block (anchor IDs, image risk, staleness-notice exception) and opened D-10. |
| 2026-09-03 | Claude | Found `/publications` and `/tools` — live 404s still taking traffic, absent from the original plan's URL list. Added to §1; redirects folded into T-21. |
| 2026-09-03 | Claude | **Process note:** the four agents shared one working directory, so per-agent branches did not isolate and all commits piled onto one branch. Untangled by cherry-picking into clean branches (safety tags `backup/agent-pileup`, `backup/salvage`). File-level partitioning held — no content conflicts. **Future parallel work must use isolated git worktrees.** |
| 2026-09-03 | Claude | Isolation fix verified and written into §"How to use this document": worktree pattern proven (checkout in a worktree leaves the main repo's HEAD untouched), and a no-push-to-`main` rule added. All four branches re-verified with a full `next build` + `tsc`, each passing standalone. Zero duplicated commits remain; nothing was lost. |
