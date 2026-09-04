# Content Migration Plan

Moving site content out of Cosmic and into the repo as MDX, so posts can be drafted,
reviewed and published by an agent through a pull request.

**Status:** in progress · **22 / 36 tasks complete** · Stages 0–2.5 done; Stage 3 done but for T-14 and T-16
**Last updated:** 2026-09-04
**Verified against:** commit `4f7daab`, Cosmic bucket `stefankudlacom-production`, live site

> **The pipeline is finished and the 2026-09-04 wave is merged:** schema and loader (T-12),
> MDX compile with build-time highlighting (T-13), colocated images (T-14), notes (T-15), the
> draft gate (T-17), `AGENTS.md` (T-18), CI and a post-deploy smoke check (T-19), canonicals
> (T-26), the local share image (T-27), named AI crawlers (T-31), breadcrumbs (T-33), and the
> `/api/top-tracks` 500 stopped (T-34). **The eleven real posts are still not imported — that
> is T-20, and as of 2026-09-04 it is no longer gated: D-04 is answered.**
>
> Every other remaining task is blocked on a decision or on T-20. See the table below.

> **Stage 6 added 2026-09-04** — discoverability for search engines and AI assistants, **T-26
> … T-32**, from an external playbook audited against this repo and against live production
> HTML. **T-26, T-27 and T-31 are merged as of 2026-09-04**, along with T-33's breadcrumbs;
> **T-32 still depends on nothing** and T-29 needs only Stefan's approval to land. The verified
> findings are in §1 "Discoverability surface". Of the two real defects it named, the missing
> canonicals are fixed by T-26; **JSON-LD is now partial — `BreadcrumbList` on post routes from
> T-33, nothing else until T-28.** **D-11 is answered.**

### Work in flight

**Nothing is in flight.** Everything ticked below is merged to `main` and deployed, including
T-36 (the empty table of contents) and this ticket's image recoveries.

Stage 0, 1, 2 and 2.5 are complete. Stage 3 is complete except **T-14** (D-05) and **T-16**
(D-02). Stage 6 has **T-26, T-27, T-31 and T-33** merged; **T-28, T-29, T-30, T-32** remain.
Stage 7's **T-35** closed as not reproducible and **T-34**'s defensive fix is merged, leaving
only D-12.

`main` verified at the head of the 2026-09-04 wave: build 23 pages, `tsc --noEmit` clean,
`bun run test` 32/32, `validate:content` clean, sitemap 18 URLs, production smoke 18/18.
Lint reports 22 problems locally rather than 11 — the extra 11 are duplicates from a stray
`.claude/worktrees/` checkout that ESLint scans; CI, which checks out clean, still sees 11.

**Six decisions are what stands between here and the end of the migration** — D-04 was answered
2026-09-04, which **unblocks T-20 and with it T-21, T-22, T-23 and T-30**:

| Decision | Gates |
|---|---|
| **D-06** · `/about` vs the AboutSheet | T-22, T-24, T-28 |
| **D-07** · `/services` | T-21, T-28 |
| **D-02** · feed path | T-16 — and `/feed.xml` is advertised in every page's head while returning 404 |
| **D-05** · GIF handling | T-14's tick only |
| **D-12** · Spotify, fix or remove | T-34's tick only |
| **D-03** · replacement bio copy | T-05 |

**Unblocked and ready without any decision:** **T-20** (import the eleven posts — the big one,
now that D-04 is answered), **T-29** (page descriptions — draft for approval), and **T-32**
(metadata guard test — its own ticket lists T-29 as a blocker, so the description-length
assertion waits; everything else in it can land now).

### Session handoff — state as of 2026-09-04, end of the wave

Written so that losing the session that did this work costs only ramp-up time.

**Nothing is running.** No agents are mid-flight, no PRs are open, no branch holds unmerged
work. Every task branch from the 2026-09-04 wave (`t26-canonicals`, `t27-share-image`,
`t31-robots`, `t33-breadcrumbs`, `t34-top-tracks`, `t34-t35-tickets`, `t35-highlighter`,
`wave-bookkeeping`) was squash-merged and deleted, and its worktree removed.

**Remote branches that still exist and are *not* this migration's:** `staging` and
`upgrade-nextjs-13` (both predate this work, untouched), and
`claude/seo-agent-search-playbook-bb143f`, which belongs to the session that wrote Stage 6.

**One stray worktree lives inside the repo:**
`.claude/worktrees/seo-agent-search-playbook-bb143f`, from that other session. It is
git-excluded via `.git/info/exclude`, but **ESLint scans it**, which is why `bun run lint`
reports 22 problems locally and 11 in CI. Deleting it when that session is finished restores
the local count.

**Worktree procedure that actually worked**, beyond the isolation rule documented above:

- Path convention `/Users/stefankudla/Documents/code/.stefankudla-worktrees/<task>`, i.e.
  *outside* the repo — which also avoids the ESLint problem the in-repo one causes.
- **Copy `.env` into each new worktree.** It is gitignored, so a fresh worktree cannot build or
  reach Cosmic without it, and the failure is confusing.
- Run `bun install` per worktree.
- **One owner per document.** Agents in the wave were explicitly told *not* to touch this file;
  the owning session ticked boxes afterwards in a single bookkeeping PR. Five concurrent PRs
  editing this file would have conflicted five ways. Keep doing that.
- **Three agents at a time, not five.** See the changelog note on the rate limit.

**Decisions answered so far, with their answers**, so a new session need not hunt:

| Decision | Answer |
|---|---|
| D-01 | App Router. Shipped by T-25. |
| D-08 | Colocated posts (`content/posts/<slug>/index.mdx`) + a build-time image copy. Notes stay flat. Images stay. |
| D-09 | Genre axis: `tutorial` · `essay` · `project`. Full 11-post remap is in D-09. |
| D-11 | Allow every AI crawler, named explicitly. Shipped by T-31. |
| D-04 | Two dead images recovered from the Wayback Machine, two dropped with the prose rewritten. Rewrites are recorded verbatim in D-04 and applied by T-20. |

**Still open:** D-02, D-03, D-05, D-06, D-07, D-10, D-12 — see the gating table above.
**T-20 is now the one that matters**: it imports the eleven posts and unblocks T-21, T-22,
T-23 and T-30 behind it.

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
| Framework | Next.js **16.1.6**, **App Router** (`src/app/`) since T-25. No `pages/` directory. |
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
- `metadata.canonical` is `null` on all 11. Correct canonicals come from the fallback in
  `src/app/posts/[slug]/page.tsx` (`generateMetadata`), not from data.
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

### Discoverability surface

Audited 2026-09-04 against the working tree **and against live production HTML**, using an SEO
and AI-assistant playbook handed over from another project's session. That playbook is written
for a local-business marketing site — `LocalBusiness`, `areaServed`, licences, opening hours.
**None of that applies to a personal site and none of it was translated.** The equivalents that
do apply are `Person`, `WebSite`, `ProfilePage` and `BlogPosting`. Stage 6 holds what survived.

Metadata comes from two helpers in `src/lib/metadata.ts` — `pageMetadata` for the six static
routes, `postMetadata` for posts. **They are not equivalent, and the gap is in `pageMetadata`.**

| | `pageMetadata` (6 static routes) | `postMetadata` (posts) |
|---|---|---|
| Unique `<title>`, under 60 chars | ✅ | ✅ |
| `<meta name="description">` | ⚠️ present but **18–45 chars** | ✅ ~140 |
| Self-referencing `canonical` | ❌ **absent** — sets `openGraph.url` only | ✅ |
| `og:site_name` / `og:locale` / `og:type` | ❌ none | `og:type: article` only |
| `og:image` | ⚠️ Cosmic-hosted | ⚠️ Cosmic-hosted (the cover) |
| `og:image:width` / `height` / `alt` | ❌ | ❌ |
| `twitter:card` / `twitter:image` | ✅ | ✅ |
| One `<h1>` per route | ✅ | ✅ |

The five short descriptions, verbatim: `About Stefan Kudla` (18), `The work of Stefan Kudla`
(24), `Need a Web Developer? Contact me.` (33), `Blog posts written by Stefan Kudla` (34),
`Fullstack Software Engineer based in Las Vegas` (45). `/services` is the only one at a usable
length (93). Google renders roughly 155.

Site-level, every line below verified against production, not inferred from source:

- **No JSON-LD anywhere.** `grep -r 'ld+json' src content public` returns nothing. Not one
  structured-data node on any route.
- **No `/llms.txt`, no `/llms-full.txt`**, and no `robots.txt` group naming any AI agent.
- **`robots.txt` cannot be verified on a preview deployment.** `NEXT_PUBLIC_GENERATE_ROBOTS` is
  set for **production only**, so `/robots.txt` returns **404 on every preview URL** while
  returning 200 in production. Confirmed 2026-09-04 against PR #39's preview. A robots change
  therefore has no preview to eyeball — its test is the only pre-merge evidence.
- `robots.txt` **is** served — so `NEXT_PUBLIC_GENERATE_ROBOTS=true` is set in Vercel, which
  `next-sitemap.config.mjs` gates on. It is next-sitemap's default: `Allow: /`, a `Host` line, a
  `Sitemap` line, and **no `Disallow` for `/api/`**.
- **`<link rel="alternate" type="application/rss+xml" href="/feed.xml">` is on every page and
  `/feed.xml` returns 404.** §2.5 recorded this against the Pages Router; it survived T-25 and is
  still live. The link now lives at `src/app/layout.tsx:26` and `src/lib/metadata.ts:49`, not the
  deleted `Meta.tsx:33`. See T-16.
- The site OG image at `imgix.cosmicjs.com/19acc550-…-stefankudlaogImage.jpg` **is alive** (HTTP
  200, 67,209 bytes, 1200×630), and `public/images/stefan_kudla_ogImage.jpg` is a byte-identical
  copy already committed. Swapping the constant is a pure substitution — **T-27**, pulled out of
  T-22 because it removes a decommission risk and waits for nothing.
- `/contact`'s only `<h1>` is `Contact info`, a form-step label inside `MultiForm.tsx:213`.
- `AboutSheet` mounts on every page from `site-chrome.tsx`, but its content sits inside an
  `AnimatePresence` gated on `isOpen` — so **none of that bio text reaches server HTML**.
  Crawlers and assistants never see it. Relevant to D-06.

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
This site was Pages Router when the plan was written. **Resolved by T-25** — the site is on the
App Router now, so `next-mdx-remote/rsc` and `opengraph-image` work as the plan describes. See
decision **D-01**.

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

> **Status:** ✅ **ANSWERED 2026-09-03 — Option B, migrate to App Router.**
> Stefan's call. Stage 3 is unblocked once **T-25** (the route migration) lands.
> Consequence: the original plan's stack works as written — `next-mdx-remote/rsc`,
> `opengraph-image` route convention, route-segment `revalidate`. Do **not** build the
> Pages-Router variant of anything.

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

> **Status:** ✅ **ANSWERED 2026-09-04 — two recovered from the Wayback Machine, two dropped
> with the prose rewritten.** Stefan's call. **T-20 is unblocked.**

Four post images are permanently gone from imgix. Per image: recreate the screenshot, replace
with something equivalent, or remove the reference and adjust surrounding prose.

**Only two were permanently gone.** The framing above — and the note that "two are Cosmic
dashboard screenshots that may not be worth recreating" — was half wrong, found on 2026-09-04
by checking the Wayback Machine, which nobody had done. Only one of the four is a Cosmic
dashboard screenshot. All four still 403 on imgix today, re-verified with a browser user-agent.

| Image | Post | Outcome |
|---|---|---|
| `blur-placeholder-next.gif` | how-to-use-nextjs-image-with-a-headless-cms | **Recovered** — Wayback snapshot `20220729192424`, 674,232 B, GIF89a 912×520, 3 frames |
| `image-settings.gif` | how-to-use-nextjs-image-with-a-headless-cms | **Recovered** — Wayback snapshot `20220729192613`, 1,540,459 B, GIF89a 1524×923, 35 frames |
| `react-markdown-ast-diagram.png` | building-react-components-from-headless-cms-markdown | **Dropped**, one sentence rewritten |
| `image-bucket.png` | how-im-using-cosmic-to-optimize-my-website | **Dropped**, two sentences rewritten and one deleted |

Both recovered files are byte-complete against the archived `Content-Length`, verified as
animated GIFs rather than a Wayback error page, and committed under
`assets/cosmic-archive/how-to-use-nextjs-image-with-a-headless-cms/` beside the rest of the
salvage. `scripts/asset-manifest.json` records them as `status: "recovered"` with the snapshot
URL in `recovered_from` — a status the download script does not produce, so **re-running
`scripts/download-assets.mjs` re-marks them dead**; there is a warning in its header.

#### The two prose rewrites — apply these during T-20

Both posts are still on Cosmic, so there is no file to edit yet. **T-20 applies these when it
imports the two posts**, and that is the whole of T-03's remaining half. Neither rewrite adds a
claim; each only removes the image and repairs the sentence that pointed at it.

**`building-react-components-from-headless-cms-markdown`** — delete the image line, then one
sentence changes. The three numbered steps below it already say everything the diagram said, so
nothing is lost but the picture.

- Delete: `![Diagram of the react markdown architecture flow](https://imgix.cosmicjs.com/89c95c50-2226-11ed-8337-95a76fda76ff-react-markdown-ast-diagram.png)`
- Before: *"To further understand this component, let's reference the diagram above step-by-step."*
- After: *"To further understand this component, let's walk through what it does step-by-step."*

**`how-im-using-cosmic-to-optimize-my-website`** — delete the image line; the paragraph after it
opens by pointing at the screenshot and closes on a joke that only works with it on screen.

- Delete: `![My Image bucket in Cosmic](https://imgix.cosmicjs.com/aafe7660-0527-11ed-b7be-d956591ad437-image-bucket.png)`
- Before: *"As you can see here, I have all of my images stored in the 'Media' folder, which is there by default."*
- After: *"All of my images live in the 'Media' folder, which is there by default."*
- Delete the paragraph's last two sentences: *"Maybe you guessed it, but even the image of my images is hosted in my image hosting Bucket. *Mind blown*."* The gag is that the screenshot of the image bucket is itself served from the image bucket; with no screenshot there is no gag. **Do not rescue it** by repointing it at the article's other images — after T-20 those are repo-local, and the sentence would become false.

The middle of that paragraph — sub-folders, separate Buckets for consulting — stands on its own
and is untouched.

**Decision:** **Recover the two, drop the two, rewrite the prose.** Recorded 2026-09-04.

### D-05 · GIF handling — 7 files, not 1

> **Status:** ⬜ open · blocks T-14 (only the tick — the pipeline is merged)
> **Option A is implemented as the floor:** GIFs render through `next/image` with
> `unoptimized`, because the optimizer would otherwise flatten them to a still. Choosing
> conversion instead is still Stefan's call, and is what actually fixes the 8.0 MB file.

`next/image` won't animate an optimized GIF. Either mark them `unoptimized` or convert to
muted autoplay `<video>`. The plan recommended conversion when it thought there was one file;
at 7 files (including an 8.0 MB one) conversion is more work but a much bigger win.

**Update 2026-09-04 (T-03):** all 7 are now on disk — two of them, `blur-placeholder-next.gif`
(658 KB) and `image-settings.gif` (1.47 MB), were dead until they came back from the Wayback
Machine. The count in this decision has not changed; what changed is that there is no longer a
GIF you could avoid deciding about by writing it off as lost.

**Decision:** _(unanswered)_

### D-06 · `/about` versus the AboutSheet drawer

> **Status:** ⬜ open · blocks T-22

`/about` is genuinely orphaned — **zero** `href="/about"` in the live HTML of any page. But the
Header's "About me" button doesn't link it; it opens `AboutSheet`, a client-side drawer mounted
in `src/app/site-chrome.tsx` that duplicates much of the page's content. Adding About to the nav
without resolving this ships two competing Abouts.

**Audit note (2026-09-04):** the drawer's content is inside an `AnimatePresence` gated on
`isOpen`, so it is absent from server HTML entirely. Whichever way this goes, the bio that
crawlers and assistants actually read is the one on `/about` — the drawer contributes nothing to
discoverability. See §1 "Discoverability surface".

**Decision:** _(unanswered)_

### D-07 · `/services` — 301 to `/contact`, or rewrite?

> **Status:** ⬜ open · blocks T-21

Live, 200, in the sitemap, indexed, `Allow: /` in robots.txt, Cosmic-backed. The plan wants it
redirected. If freelance inquiries still arrive through it, that's Stefan's call.

**Decision:** _(unanswered)_

### D-08 · Content layout — colocated or flat

> **Status:** ✅ **ANSWERED 2026-09-04 — colocated, with a build-time copy step.**
> Stefan's call, having asked for the recommendation. A post is the directory
> `content/posts/<slug>/`, holding `index.mdx` and that post's images. Notes stay flat at
> `content/notes/<slug>.mdx` — a note that needs a directory of assets is a post.
> **The earlier "move away from images" leaning is withdrawn: images stay.**

**Why colocation needs a build step at all.** `next/image` derives width, height and a blur
placeholder only from a *static* import, which the bundler analyses at build time; a dynamic
`import()` of a computed path is unsupported. That works only where the bundler compiles the
MDX. With `next-mdx-remote/rsc` — chosen so slugs stay data-driven from `content/` — there is
no colocated-image support at all: images must be reachable from `public/`. So **T-14 owns a
build step that copies colocated images into `public/` and rewrites the `src`**, and, using
`sharp` (already a dependency), emits width, height and a real `blurDataURL` per image so
markdown images do not shift the layout.

**Do not copy the standard recipe.** Nearly every published solution reaches for
`copy-webpack-plugin` in `next.config.js`. This site builds with **Turbopack**, which ignores
webpack config entirely. It has to be a plain Node script in `prebuild`.

Considered and rejected: **Velite**, which does the copy (`copyLinkedFiles`, assets to
`public/static`, URLs rewritten) *and* schema, validation and type generation. It would have
replaced most of T-12 rather than fed it — less code we own, but a content framework as a
dependency. Revisit only if the hand-rolled loader starts growing.

The images are **already colocated by slug in the repo** from T-01 —
`assets/cosmic-archive/<slug>/`, 28 files / 28 MB — so T-20 is a move plus a filename cleanup
(the Cosmic UUID prefixes), not new repo weight.

**Decision:** ✅ Colocated `content/posts/<slug>/index.mdx` + a build-time copy script.
Stefan, 2026-09-04.

### D-12 · The Spotify integration — fix or remove — **blocks T-34**

> **Status:** ⬜ open · blocks T-34's tick only — the 500 itself is fixed and merged.
> **Root cause now confirmed:** the refresh token is *revoked*
> (`400 invalid_grant: Refresh token revoked`), so option A means re-authorising Spotify by
> hand, not a code change.

`/api/top-tracks` has thrown `TypeError: Cannot read properties of undefined (reading 'slice')`
on **every page load since 2026-07-24** — 140 occurrences across 69 users in the last seven days
alone. `getTopTracks()` returns a response whose body no longer contains `items`, so
`items.slice(0, 10)` throws and the route 500s. Spotify changed the shape (or the token/scope no
longer satisfies `/v1/me/top/tracks`); the exact cause needs a live call to confirm.

**This is not a corner of the site.** `TopTracksSection` is dead — no page renders it — but
`NowPlayingPill` sits in the header on *every* page and fetches `/api/top-tracks` through SWR.
Every visitor triggers the 500. `/api/currently-playing` is fine: it already handles a bad
response and returns `{ isPlaying: false }`.

- **A — Fix it.** Diagnose the real Spotify response, handle a missing `items` the way
  `currently-playing` handles its failure case, and re-check the refresh token and scopes.
  Keeps the widget.
- **B — Remove it.** Delete `/api/top-tracks`, the `NowPlayingPill` top-tracks fetch, the dead
  `TopTracksSection`, and the Spotify env vars if nothing else uses them. `currently-playing`
  can stay or go with it.

Either way **the route must stop 500ing on every page load**, which is why T-34 carries a
defensive fix that does not depend on this decision.

*Recommendation: A if the widget still matters to you, and B if it does not — but the deciding
question is whether you want to keep maintaining a Spotify token, not whether the code is
fixable.*

**Decision:** _(unanswered)_

### D-10 · Refresh the Vercel-deploy post's screenshots?

> **Status:** ⬜ open · does not block anything

The site's top page is a 2023 step-by-step tutorial whose six screenshots show a Vercel dashboard UI that has since changed. Refreshing them is the single highest-value editorial act available on the site, and it pairs with the staleness-notice exception above. It is genuinely editorial work — someone has to walk the flow and re-capture — so it is Stefan's call whether it becomes a task or stays a background item.

**Decision:** _(unanswered)_

### D-09 · Category taxonomy

> **Status:** ✅ **ANSWERED 2026-09-04 — remap to a three-value genre axis.**
> Stefan's call. The enum is `tutorial` · `essay` · `project`. T-12's Zod enum is closed on
> exactly these three; a post with anything else fails the build.

The old five mixed two axes — technology (React, Next.js, Tailwind CSS) and genre (Web Dev,
Perspective). A post can belong to both, so "Web Dev" became the catch-all and took 6 of 11.
The genre axis is the one an agent can pick correctly without a judgment call, and it stays
stable as posts are added: a new framework does not mint a new category.

**Renaming is URL-safe.** There are no `/category/<x>` routes. The category drives only the
client-side filter on `/posts` and the label in the post header, so nothing redirects and the
T-11 slug guard is untouched.

**The remap, all 11 posts** — copy this into T-12's frontmatter, don't re-derive it:

| Category | Posts |
|---|---|
| `tutorial` (7) | `coding-your-design-system-with-tailwind-css`, `how-to-use-nextjs-image-with-a-headless-cms`, `building-react-components-from-headless-cms-markdown`, `how-to-deploy-a-static-html-css-and-javascript-website-to-vercel`, `simple-scroll-animations-with-html-and-javascript-quick-guide`, `how-to-create-a-marquee-with-framer-motion-and-react`, `how-im-using-cosmic-to-optimize-my-website` |
| `essay` (3) | `creativity-and-software-development-is-a-wonderful-combination`, `how-i-started-freelancing-as-a-web-developer-in-2022`, `heres-why-all-musicians-need-a-website-in-2022` |
| `project` (1) | `i-built-a-free-sitemap-comparison-tool` |

`how-im-using-cosmic-to-optimize-my-website` is the one arguable call — it reads as a case
study but is structured as a walkthrough, so it lands in `tutorial`.

Tech labels as a separate free `tags` array were considered and **deferred** — not worth two
things to maintain until the archive is past ~25 posts.

**Decision:** ✅ Option A, genre axis: `tutorial` · `essay` · `project`. Stefan, 2026-09-04.

### D-11 · AI crawler policy — training as well as citation?

> **Status:** ✅ **ANSWERED 2026-09-04 — allow everything, named explicitly.**
> Stefan's call. Today's `Allow: /` already admits every one of these, so naming them changes no
> behaviour; the point is that the decision becomes readable instead of being inferred from an
> omission. **T-31** writes the groups.

The playbook splits AI crawlers by what they do with a page, and a site can answer differently
for each:

- **Training** — `GPTBot`, `ClaudeBot`, `Google-Extended`, `Applebot-Extended`, `CCBot`,
  `anthropic-ai`, `meta-externalagent`, `Amazonbot`.
- **Citation / retrieval** — `OAI-SearchBot`, `ChatGPT-User`, `Claude-SearchBot`, `Claude-User`,
  `PerplexityBot`, `Perplexity-User`, `DuckAssistBot`, `Applebot`, `Bingbot`.

Allowing only the second means the site can be cited in assistant answers without being used as
training data. That is the split this decision declines.

**Decision:** ✅ Allow both, with every agent named in `robots.txt`. Stefan, 2026-09-04.

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
  > **Exactly 4 dead, no more — decay has not accelerated.** 7 GIFs total (5 downloaded, 2 among the dead). **Updated 2026-09-04 (T-03):** 2 of the 4 dead were recovered from the Wayback Machine, so the archive now holds **30 files / 30.34 MB** and **all 7 GIFs**; 2 remain dead and are dropped per D-04.
  > Count note: `…-design-systems-tailwind.png` is referenced by two posts, so 31 URLs → 32 references → 28 files (a copy under each owning slug, keeping post directories self-contained).
  Every hour these stay only on Cosmic's imgix account is exposure. `imgix.cosmicjs.com` is
  Cosmic's account keyed to Stefan's bucket, not his own.
  - Source URLs: the 11 `metadata.cover_image.imgix_url` values plus every
    `https://imgix.cosmicjs.com/...` in post content, plus the site-wide OG image hardcoded at
    `src/components/Meta.tsx:51,59`.
  - **Done when:** 27 files on disk (31 referenced minus the 4 dead), each byte-complete and
    matching its `Content-Length`. A manifest maps original URL → local path → owning post.
  - *Blocked by: nothing. Do not wait for D-01 or D-08 — park the files, place them later.*

- [ ] **T-03 · Recover or replace the four dead images** — **assets settled 2026-09-04; the prose half is applied by T-20**
  > **Two of the four came back.** `blur-placeholder-next.gif` and `image-settings.gif` were
  > recovered from Wayback Machine snapshots and are committed with the rest of the salvage;
  > `image-bucket.png` and `react-markdown-ast-diagram.png` are dropped. **D-04 holds the
  > outcomes and the two prose rewrites verbatim.** The checkbox stays open because the rewrites
  > cannot be applied to a file that does not exist yet — both posts are still on Cosmic — so
  > **T-20 applies them at import and this ticks with it.** Nothing here blocks T-20.
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
  - ~~First check the Cosmic dashboard media library~~ — not needed. Two were recovered from the
    Wayback Machine without an authenticated session; the other two are dropped, so nothing is
    left to look for.
  - **Done when:** each of the four is either recovered, replaced, or explicitly dropped with the
    surrounding prose adjusted — and the outcome is recorded against D-04. **Recovery and the
    drop decisions are done; the two prose adjustments land with T-20.**
  - *Blocked by: T-02 (done), D-04 (answered). Remaining half rides on T-20.*

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

### Stage 2.5 · App Router migration — **the new gate for Stage 3**

> D-01 answered: **migrate to App Router.** This work is not in the original plan's estimates.
> Do it before the content pipeline, so the loader is written once against its final target.

- [x] **T-25 · Port routes from `src/pages/` to `src/app/`** — done 2026-09-04, branch `t25-app-router`
  Every route below must keep its URL, its rendering behaviour and its metadata. This is a
  translation, **not** a redesign — no visual changes, no component rewrites beyond what the
  router change forces.

  **10 page routes:** `404`, `_app`, `_document`, `about`, `contact`, `index`, `posts/index`,
  `posts/[slug]`, `projects`, `services`
  **6 API routes:** `currently-playing`, `exit-preview`, `preview`, `recent-posts`, `revalidate`,
  `top-tracks`

  Known translation points, all verified present in this repo:
  - `_app.tsx` + `_document.tsx` → `app/layout.tsx`. `_app.tsx` currently mounts `Header`,
    `AboutSheet` (with `useState`) and `@vercel/analytics` — the stateful parts need a client
    boundary.
  - `getStaticProps` → server components; `revalidate: 180` (5s on projects) → route-segment
    `export const revalidate`.
  - `getStaticPaths` → `generateStaticParams`. **T-06's `fallback: 'blocking'` + `notFound: true`
    becomes `dynamicParams` + `notFound()`** — preserve the behaviour T-06 established, do not
    regress to soft-404s.
  - **Preview mode → `draftMode()`.** `src/pages/api/preview.ts:39` calls `res.setPreviewData({})`
    and `api/exit-preview.ts:8` calls `res.clearPreviewData()`; neither exists in App Router.
  - `next/head` (`src/components/Meta.tsx`) → the `metadata` export / `generateMetadata`.
    **Preserve the self-referential canonical** currently produced by the fallback in
    `posts/[slug].tsx`, and keep per-post OG images pointing at the same cover URLs.
  - `useRouter` from `next/router` → `next/navigation`.
  - `src/components/BlurImage.tsx` uses `next/legacy/image` with `layout="responsive"` — decide
    whether it moves to the modern API now or after the content migration.

  **Acceptance:**
  1. `bun run build` succeeds and emits all 11 post routes.
  2. Every URL in `content/legacy-slugs.json` returns 200; `/posts/does-not-exist-xyz` returns
     **404** (T-06 parity).
  3. `bun run test` passes — T-11's guard is framework-agnostic and must stay green untouched.
  4. Rendered markup for `/`, `/about`, `/posts` is visually unchanged.
  5. Per-post `<title>`, meta description, canonical and og:image match the current live values.
  6. `/api/preview` still gates on `COSMIC_PREVIEW_SECRET` and still reveals drafts.
  - *Blocked by: nothing — D-01 is answered. **Blocks all of Stage 3.***

  **Result:** all six acceptance points verified. Notes for whoever builds on this:
  - `draftMode()` did **not** force dynamic rendering — `/posts/[slug]` still prerenders all
    11 slugs as SSG and switches to dynamic only when the draft cookie is present.
  - `CodeBlock` had to register the `bash` grammar explicitly. The Pages build resolved a
    refractor variant with every language pre-registered, so bash blocks highlighted despite
    never being registered; the App Router build resolves `refractor/core` correctly. Without
    the registration, bash blocks silently lost their colouring.
  - `BlurImage` stays on `next/legacy/image` for now — moving it is content-migration work,
    not routing work.
  - `src/components/Navbar.tsx` still imports `next/router` and is now the only file that
    does. It is dead code (nothing imports it) and was left alone; delete it in Stage 5.
  - Two deliberate metadata diffs: `/posts` og:url was the relative string `/posts` and is now
    absolute, and the post `<head>` no longer repeats `og:image` twice.

### Stage 3 · Content pipeline

> Unblocked — T-25 landed 2026-09-04. Build against App Router — `next-mdx-remote/rsc` and the
> `opengraph-image` convention now apply as the original plan described.

- [x] **T-12 · Content schema and loader** — done 2026-09-04, branch `t12-content-loader`
  `content/`, Zod schemas for posts and notes, `gray-matter` frontmatter parsing, a loader that
  throws at build time on a malformed post, and a standalone validate script.
  - Notes take a deliberately looser schema — date required, title optional.
  - **Done when:** one hand-written post renders at its route, a deliberately malformed
    frontmatter fails the build with a message naming the file and field, and
    `bun run validate:content` reports the same error standalone.
  - *Blocked by: nothing — D-01, D-08 and D-09 are all answered.*

  **Result.** `src/lib/content.ts` holds both schemas and the loader;
  `bun run validate:content` (`scripts/validate-content.ts`) reports every problem across every
  collection at once, while the loader throws on the first. Both name the file and the field: a
  `category: Web Dev` post fails with `content/posts/<slug>/index.mdx` /
  `frontmatter.category — Invalid option: expected one of "tutorial"|"essay"|"project"`.
  Notes are looser as specified — date required, title optional. Carry forward:
  - **YAML parses an unquoted `date: 2026-09-04` into a `Date`, not a string.** The schema
    accepts both and normalises to `YYYY-MM-DD`, because quoting it is exactly the detail a
    drafting agent gets wrong. Say so in T-18 anyway.
  - `/posts/[slug]` **prefers a local post and falls back to Cosmic**. That fallback, and the
    `asCosmicShape` adapter feeding `PostHeader`, are the bridge T-20 removes.
  - The proof post is `content/posts/mdx-pipeline-check/`, marked `draft: true`. Drafts are
    excluded from `generateStaticParams`, so it renders on request but never prerenders and
    never enters the sitemap — still 17 URLs. A deliberate sliver of T-17; the full gate
    (404 in production, out of the feed) remains T-17's. **T-20 deletes this post.**
  - MDX renders through `src/components/MdxBody.tsx` with **no rehype plugins** — highlighting
    and heading anchors are T-13, images T-14.

- [x] **T-13 · MDX compile and syntax highlighting** — done 2026-09-04, branch `t13-mdx-highlighting`
  Whichever compile path D-01 selects, plus `rehype-pretty-code` (Shiki), `rehype-slug` and
  `rehype-autolink-headings` to preserve the existing `#heading-anchor` behaviour.
  - Theme it to the existing dark palette.
  - **Done when:** a test post's code blocks render highlighted **in server HTML** with zero
    client JS, and heading anchors still work.
  - *Blocked by: T-12*

  **Result.** `rehype-pretty-code` + Shiki run at build time in
  `src/components/MdxBody.tsx`; the highlighter never reaches the client bundle. The palette is
  `src/lib/code-theme.ts`, a one-for-one port of the Prism theme in `src/styles/code-theme.css`,
  so MDX and Cosmic code blocks look the same while both paths coexist. Three things that cost
  time and will cost it again otherwise:
  - **`rehype-pretty-code` only recognises an inline theme when it has a `tokenColors` key**
    (`isJSONTheme` checks exactly that). A valid Shiki theme with just `settings` is treated as
    a *map of named themes*, and the error you get is the useless
    ``Theme `dark` not found``. The theme object sets both, pointing at one array.
  - **A broken MDX render does not fail `bun run build`** — the proof post is a draft, so it is
    not prerendered, and the failure only appeared as a 500 at request time. Check the route,
    not just the build.
  - **`rehype-autolink-headings` was not needed.** `rehype-slug` supplies the ids and a shared
    `src/components/PostHeading.tsx` renders the anchor, so MDX and Cosmic headings are
    byte-identical markup rather than two implementations that drift. `PostBody` now uses it too;
    it goes when `PostBody` does, in T-20.
  - **`formik` drags in a second `@types/react` (18) beside the repo's 19**, so the MDX
    `components` map is typed against a different React and no honest prop type satisfies both.
    A `package.json` `overrides` pin fixes it locally and **Vercel ignores it** — its install
    re-resolves and the nested copy comes back, so the build went red while local was green.
    The `h2` mapping takes `props: any` instead, with a comment. If a similar cross-copy type
    error appears elsewhere, this is why.

- [ ] **T-14 · Image handling**
  Local images through `next/image`, plus the GIF strategy from D-05.
  - `src/components/BlurImage.tsx` uses `next/legacy/image`; decide whether new content uses it
    or moves to the current API.
  - **Done when:** a test post renders a local raster image and an animated GIF (or its video
    replacement), both correct in light and dark themes.
  - *Blocked by: D-05 only — the pipeline is built and merged, the GIF question is not answered.*

  **Built 2026-09-04 on `t14-images`; ticked once D-05 closes.**
  `scripts/copy-content-images.ts` runs as `prebuild` **and `predev`**: it copies every
  colocated image to `public/content/posts/<slug>/` and writes
  `content/.generated/images.json` with width, height, a 16px WebP blur placeholder and an
  `animated` flag from `sharp`. `src/lib/images.ts` reads that manifest and
  `src/components/MdxImage.tsx` renders through `next/image`, so markdown images reserve their
  space instead of shifting the page. Both generated locations are gitignored.
  - **`next/legacy/image` question answered: new content uses the modern API.** `MdxImage` is
    plain `next/image`; `BlurImage` stays on the legacy API for Cosmic markdown and dies with
    `PostBody` in T-20. Nothing was migrated across.
  - **GIFs are passed through `unoptimized`**, which is the correct floor — the optimizer would
    flatten them to a still. That is D-05's option A implemented, not D-05 answered: converting
    to muted autoplay video is still open, and is where the 8.0 MB GIF actually gets fixed.
  - `sharp`'s `height` on an animated GIF is every frame stacked; `pageHeight` is one frame.
    Using `height` gives a 59×-too-tall image.
  - A `cover` may be colocated (`./cover.png`), an absolute public path, or a remote URL —
    `resolveImage` passes the last two through untouched, so T-20 can set covers either way.

- [x] **T-15 · Notes collection and `/notes` routes** — done 2026-09-04, branch `t15-notes`
  `/notes` renders notes **inline and in full** as a reverse-chronological stream, not a card
  grid — that presentation is what makes short-form feel legitimate rather than unfinished.
  Permalinks exist for linking and for the feed.
  - **Done when:** two test notes render in full on `/notes` newest-first, each has a working
    permalink, and neither appears on `/posts`.
  - *Blocked by: T-12*

  **Result.** `/notes` renders each note's full MDX inline, newest first, separated by rules;
  the date is the permalink and a titled note also links from its heading. `/notes/<slug>`
  is the permalink page. Verified with two test notes — one titled, one not.
  - **Both test notes are drafts**, so in production `/notes` currently shows a
    "No notes yet." empty state and the route is in the sitemap (18 URLs) while the note
    permalinks are not. It stops being a thin page the moment a real note is published.
  - `noteTitle()` in `src/lib/notes.ts` is the single fallback for an untitled note
    (`Note — <date>`), so the permalink `<title>`, the stream and T-16's feed cannot disagree.
  - **Notes reference images by absolute path.** They are flat by D-08, so a relative `src` in a
    note resolves against the *posts* image directory and 404s visibly. A note that needs its
    own images is a post — say so in T-18.

- [ ] **T-16 · Feed**
  Full content, not excerpts. Posts and notes merged, `<category>` distinguishing them.
  - Path per D-02. Fix or keep the autodiscovery link so it points at the feed that actually
    exists. **`Meta.tsx:33` no longer exists** — T-25 moved the link to `src/app/layout.tsx:26`
    and `src/lib/metadata.ts:49`, so there are two places to change now, not one.
  - **Audit note (2026-09-04):** re-verified against production — the link is on every page and
    `/feed.xml` 404s. Until D-02 is answered and this ships, every crawled page advertises a dead
    feed. Deleting the two `<link>`s in the meantime is a one-line alternative, and is worth
    deciding rather than defaulting into.
  - **Done when:** the feed validates, contains full post bodies, excludes drafts in production,
    and the `<link rel="alternate">` on every page resolves to HTTP 200.
  - *Blocked by: T-12, D-02*

- [x] **T-17 · Draft gate and preview deploys** — done 2026-09-04, branch `t17-draft-gate`
  Include `draft: true` posts when `process.env.VERCEL_ENV !== 'production'`. Drafts stay out of
  `/posts`, the sitemap and the feed in production regardless.
  - **Done when:** a draft post is visible on a preview deployment and returns 404 in production,
    and appears in neither the production sitemap nor the feed.
  - *Blocked by: T-12*

  **Result.** `draftsAreVisible` in `src/lib/content.ts` is
  `process.env.VERCEL_ENV !== 'production'`, and every collection reader filters through it, so
  a draft is invisible in production to anything built on the loader — `/posts`, the feed when
  T-16 lands, and `getPost`, which returns null and 404s the route. Drafts are never added to
  `generateStaticParams`, which is what keeps them out of the sitemap on *every* environment,
  preview included.
  - Verified by building twice: `VERCEL_ENV=production` → the draft 404s while published posts
    stay 200; `VERCEL_ENV=preview` → the draft renders at its real URL. Sitemap 17 URLs, zero
    mentions of the draft slug, both ways.
  - **Local `bun run dev` counts as non-production**, so drafts render there too.

- [x] **T-18 · `AGENTS.md`** — done 2026-09-04, branch `t18-agents-md`
  The cheapest high-leverage item in the project: it determines whether agent-drafted posts
  arrive 80% right or 40% right.
  - Frontmatter contract with a filled example; the **never rename a slug** rule; voice guide;
    image workflow; notes-vs-posts bar; scaffolding scripts; `content/_templates/`.
  - **Done when:** an agent given only `AGENTS.md` produces a post that passes
    `bun run validate:content` on the first attempt.
  - *Blocked by: T-12*

  **Result.** `AGENTS.md` at the repo root, `content/_templates/`, and
  `bun run new:post` / `bun run new:note` (`scripts/new-content.ts`).
  **Tested twice with a fresh agent given only `AGENTS.md`**, which is the acceptance
  criterion and worth repeating whenever the contract changes:
  - **Run 1 passed validation but had to leave the document** — the scaffold wrote
    `cover: ./cover.png`, no such file existed, and nothing named a fallback, so the agent
    went looking through `public/images`. It also caught a contradiction (the table said
    sentence case, the example was title case) and three unstated things: draft `date`
    semantics, whether `title="…"` fences work for languages other than `tsx`, and whether an
    image-free post is still a directory. All fixed; the template now defaults `cover` to the
    site card.
  - **Run 2 passed on the first attempt with no outside information**, and surfaced only the
    YAML quoting trap for titles containing `:` or a leading `#`, now documented.
  - **`<!-- html comments -->` are a compile error in MDX** (`{/* … */}` is the form), and
    because drafts are not prerendered it shows up as a 500 on the page, never at build time.
    Verified deliberately; both `AGENTS.md` and the template say so.

- [x] **T-19 · CI** — done 2026-09-04, branch `t19-ci`
  GitHub Actions on every PR: content validation, slug-parity, typecheck. Lint and link-check
  advisory. Plus a post-deploy smoke check over every legacy URL.
  - The smoke check must assert **real 404s on unknown slugs** and known body text — not just
    200 plus a non-empty `<h1>`. See §2.3.
  - **Done when:** CI is green on a valid PR, red on a PR that removes a legacy slug, and the
    smoke check fails when pointed at a deliberately broken URL.
  - *Blocked by: T-06, T-09, T-10, T-11*

  **Result.** Two workflows. `.github/workflows/ci.yml` runs on every PR and on `main`:
  `validate:content`, `tsc --noEmit` and the test suite are hard gates; lint is advisory,
  because its 11 problems live in components this migration does not touch and failing on them
  would block every PR. `.github/workflows/smoke.yml` runs on `deployment_status`, so it checks
  the **real deployed site** — previews included — via `bun run smoke <url>`, with an advisory
  lychee link check.
  - `scripts/smoke.ts` answers §2.3 directly: per legacy post it asserts the `<title>` **and a
    known sentence from the body**, held in `tests/fixtures/legacy-content.json` and generated
    from the live pages, plus a real 404 on an unknown slug. 18 checks.
  - All three acceptance conditions were exercised, not assumed: green against production
    (18/18); red when a fixture phrase is tampered with (names the post and the missing text);
    red when pointed at the wrong host (16 of 18); and `bun run test` goes red when a slug is
    added to `content/legacy-slugs.json` that the manifest cannot satisfy.
  - **Correction, 2026-09-04:** the note here previously said `deployment_status` workflows run
    only from the default branch. **They do not** — the smoke job ran on PRs #33, #35 and
    #37–#41 from their own branches, against each Vercel *preview* deployment, before any of
    them merged. That is better than expected: every preview is smoke-checked. Do not "fix"
    this by moving the trigger.

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
  - **Also delete in this task:** `content/posts/mdx-pipeline-check/`, the Cosmic fallback and
    `asCosmicShape` in `src/app/posts/[slug]/page.tsx`, and the snapshot half of
    `tests/route-manifest.ts` — with Cosmic gone the content directory is the only source of
    truth, which restores T-11's guard to catching a deleted post.
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
  - ~~`Article` JSON-LD on post pages.~~ **Superseded by T-28**, which builds the whole linked
    graph rather than one node type on one route. Do not ship a second, unlinked `Article` here.
  - **Done when:** every sitemap URL has a `lastmod` matching its content date, no `changefreq`
    remains, and the JSON-LD from T-28 validates.
  - *Blocked by: T-20, D-07*

- [ ] **T-22 · Cut the remaining Cosmic surfaces**
  Not in the original plan, and required before the bucket can be cancelled. After T-20 the
  posts are local but Cosmic still serves the OG image, the header badge, and three pages.
  - ~~`src/components/Meta.tsx:51,59` — hardcoded imgix OG image on every non-post page.~~
    **Moved to T-27.** The file is `src/lib/metadata.ts:3` since T-25, the replacement is already
    committed to `public/`, and the change depends on nothing — it should not wait for T-20.
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

### Stage 6 · Discoverability — search engines and AI assistants

Added 2026-09-04 from an external SEO and AI-assistant playbook, audited against this repo and
live production HTML (§1 "Discoverability surface"). Independent of the Cosmic migration except
where a ticket says otherwise, so these can fill any gap in Stage 3. Two rules carried over from
the playbook, both worth repeating because they are how this work goes wrong:

**Never widen a factual claim.** Structured data and `llms.txt` are machine-readable assertions,
and an agent writing them is one step away from inventing a job title, a founding date or a
social profile. Everything comes from what the site already says, or it is left out and handed
back.

**Every claim gets a test.** Each ticket ships its own guard; T-32 covers what spans them.

- [x] **T-26 · Canonicals and complete OG tags on the six static routes** — done 2026-09-04, merged

  > **Trap this uncovered, and it will recur.** In Next's metadata, a route's `alternates`
  > **replaces the root layout's entire `alternates` object** rather than merging into it. The
  > root layout supplies `types: { 'application/rss+xml': '/feed.xml' }`, so adding
  > `alternates.canonical` to `pageMetadata` silently deleted the RSS autodiscovery link from
  > all seven static routes. Both helpers now carry the `types` entry themselves — which is
  > presumably why `postMetadata` already had it. **Anything that touches `alternates` must
  > re-check the feed link in rendered HTML**, T-16 and T-28 included.
  `pageMetadata` sets `openGraph.url` but never `alternates.canonical`, so `/`, `/about`,
  `/contact`, `/posts`, `/projects` and `/services` have shipped without a canonical for the
  site's whole life. `postMetadata` has always been correct — this is a gap in one helper, not a
  site-wide failure.
  - Add `alternates.canonical` (absolute, self-referencing), `og:site_name`, `og:locale: en_US`,
    `og:type: website`, and `width`/`height`/`alt` on the image in **both** `openGraph.images`
    and `twitter.images`.
  - Keep `postMetadata`'s output byte-identical. The two helpers may share the image object;
    they must not be merged into one.
  - **Done when:** every route in `tests/route-manifest.ts` carries exactly one canonical
    matching its own URL in built HTML, and the homepage `<title>` is untouched — it holds
    whatever Search Console history the site has.
  - *Blocked by: nothing*

- [x] **T-27 · Bring the share image into the repo** — done 2026-09-04, merged
  `SITE_OG_IMAGE` at `src/lib/metadata.ts:3` points at `imgix.cosmicjs.com`. The identical file
  is already committed at `public/images/stefan_kudla_ogImage.jpg` — 1200×630, 67,209 bytes,
  verified byte-for-byte against the live URL. Every non-post page's social card dies with the
  bucket otherwise.
  - **Done when:** no `imgix.cosmicjs.com` URL remains in `src/lib/metadata.ts`, `og:image` on a
    static route resolves to the local file, and the card renders in a validator.
  - *Blocked by: nothing*

- [ ] **T-28 · JSON-LD graph**
  The site has **zero** structured data today. Build the graphs as pure functions returning plain
  objects, with a small component serialising them — testable without rendering a page. Escape
  `<` as `\u003c` in the serialised JSON.
  - **Site graph**, rendered once from the root layout: `Person` (name, url, image, `jobTitle`,
    `address` as locality and region only, `sameAs`) and `WebSite` with `publisher` → the person.
  - **Page graph**, once per route: `WebPage` / `ProfilePage` / `ContactPage` with `url`, `name`,
    `description`, `inLanguage`, `dateModified`, `isPartOf` → the website. `BlogPosting` on
    posts, read from frontmatter — `headline`, `datePublished` (`date`), `dateModified`
    (`updated ?? date`), `author` → the person, `image` → the cover. `BreadcrumbList` on every
    route except `/` — **`/posts/<slug>` is already done by T-33; extend
    `src/lib/structured-data.ts` rather than writing a second implementation.**
  - Cross-reference by `@id`: `https://stefankudla.com/#person`, `/#website`,
    `<page-url>#webpage`, `<page-url>#breadcrumb`. Two scripts sharing `@id`s are stitched back
    together by every consumer that matters.
  - **Nothing invented.** `sameAs` comes from the profile links `SocialIcons` already renders;
    `jobTitle` from copy already on the site. Anything neither supplies goes to the hand-back
    list below, not into the graph.
  - **Done when:** the graph validates in the Schema.org validator and Google's Rich Results
    Test, every `@id` reference resolves within the two scripts, a `BlogPosting`'s dates match
    its frontmatter, and `/` has no breadcrumb.
  - *Blocked by: T-26 (shares the helper), D-06 (what `/about` is), D-07 (whether `/services`
    still exists)*

- [ ] **T-29 · Page descriptions at a usable length**
  Five of the six static descriptions are 18–45 characters. They are accurate and far too thin —
  too thin to earn a click, and too thin to tell an assistant anything it can repeat. Target
  ~155.
  - These are Stefan's voice, not an agent's — same class as D-03. **Draft, don't ship:** put
    candidates in the PR body for him to pick or rewrite.
  - Enforce a floor and ceiling wherever the strings live, so a future one-liner fails instead of
    quietly shipping.
  - **Done when:** all six are Stefan-approved, unique site-wide, and 120–165 characters.
  - *Blocked by: nothing to draft — Stefan's approval to land*

- [ ] **T-30 · `/llms.txt` and `/llms-full.txt`**
  Per llmstxt.org. Rendered from the content layer, so they can never say something the site does
  not — no second copy of any fact.
  - `/llms.txt`: one-line description, key facts (email, location, links), a `## Pages` list of
    every route as `[headline](absolute-url): description`, a `## Posts` list, and a pointer to
    `llms-full.txt`.
  - `/llms-full.txt`: the same header, then every page as Markdown — `#` headline, URL, lead,
    `##` sections — separated by `---`.
  - Both served as `text/plain; charset=utf-8`, statically generated, drafts excluded in
    production exactly the way the sitemap excludes them.
  - **Done when:** both routes return 200 with the right content type, every route in
    `tests/route-manifest.ts` appears in `llms.txt` exactly once, and post bodies come from the
    loader rather than a duplicate render path.
  - *Blocked by: T-20 — half the posts still come from Cosmic, and a file listing only the local
    half is worse than no file. The `llms.txt` index alone could ship earlier if T-20 stalls.*

- [x] **T-31 · Name the AI crawlers in `robots.txt`** — done 2026-09-04, merged

  > Two observations raised during implementation and deliberately **not** acted on, since
  > D-11's lists are the authority: `Bingbot` is a general search crawler rather than an
  > AI-specific one, and both `Applebot` and `Applebot-Extended` appear. If either is
  > unintentional, amend D-11 and the config follows.
  Per **D-11** (answered: allow everything, named). `robots.txt` is generated by `next-sitemap`
  as a `postbuild` step, gated on `NEXT_PUBLIC_GENERATE_ROBOTS` — so this is
  `robotsTxtOptions.policies` in `next-sitemap.config.mjs`, not a new route.
  - One `Allow: /` group per agent across D-11's two lists. Behaviour is unchanged; the decision
    becomes readable.
  - Add `Disallow: /api/` to the wildcard group while in here. Six API routes are crawlable
    today and none of them are content.
  - **Done when:** the generated file names every agent in D-11, `/api/` is disallowed, the
    `Sitemap:` line survives, and `/` is still allowed for the wildcard.
  - *Blocked by: nothing*

- [ ] **T-32 · Metadata guard test**
  The cross-cutting half of the playbook's test list — what none of the tickets above owns alone.
  - Every route in the manifest has a unique path, title and description.
  - The homepage title is pinned **exactly**: `Stefan Kudla | Software Engineer in Las Vegas`.
    It is the one string on the site with search history worth protecting.
  - No title over 65 characters; no description under 120 or over 165.
  - Exactly one `og:image` and one `twitter:image` per built page. Next merges a route's
    `openGraph` object over the parent's **wholesale**, so a child that sets `openGraph` without
    an image silently loses it. Count the tags in built HTML; do not trust the convention.
  - **Done when:** the suite fails on a deliberately duplicated description and on a removed
    canonical — both negative-tested before the PR, the way T-11 was.
  - *Blocked by: T-26, T-29*

**Hand back to Stefan** — list these in the PR that lands T-28. Do not invent them: the `sameAs`
profile URLs beyond what the site already links · whether `jobTitle` reads "Software Engineer" or
the fuller Euronet title · which of `/about` and the drawer is the canonical bio (D-06) · whether
`/services` survives (D-07).

- [x] **T-33 · Breadcrumbs on post pages** — done 2026-09-04, branch `t33-breadcrumbs`
  Stefan's request, 2026-09-04. Visible breadcrumb trail on `/posts/[slug]` plus its
  `BreadcrumbList` JSON-LD.
  - `Home / Posts / <title>`, the last crumb rendered as text rather than a link and marked
    `aria-current="page"`, inside a `<nav aria-label="Breadcrumb">` with an ordered list.
  - **No category crumb.** `CategoryFilter` is a client-side `useState` filter on `/posts`;
    there is no `/posts/category/<x>` route, so a category crumb would link a URL that does not
    exist. If category views are ever built, add the crumb then.
  - **This delivers the `BreadcrumbList` half of T-28 for post routes**, deliberately using
    T-28's `@id` convention (`<page-url>#breadcrumb`) so the two scripts stitch together rather
    than duplicate. `src/lib/structured-data.ts` is the pure-function home T-28 describes and
    `src/components/JsonLd.tsx` the serialiser, with `<` escaped as `\u003c`. **T-28 should
    extend these, not replace them**, and still owns breadcrumbs on the other routes.
  - Visual language is the existing post-meta treatment — `font-oswald`, uppercase,
    `text-card-border`, `/` separators — kept to one line, the final crumb truncating rather
    than wrapping.
  - **Done when:** the trail renders on both a Cosmic post and a repo-local post, the JSON-LD
    validates with positions 1..n and no `item` on the last entry, and the final crumb is not a
    link. All three verified, plus a unit test covering the graph shape.
  - *Blocked by: nothing. **Not blocked by D-01** — that was answered 2026-09-03 and T-25
    shipped the App Router port, so this is written against `src/app/`.*

---

### Stage 7 · Live production defects

Found in Vercel's runtime error table on 2026-09-04, both predating this migration. Independent
of everything else — neither touches content.

- [ ] **T-34 · `/api/top-tracks` 500s on every page load** — **defensive fix merged 2026-09-04; open only on D-12**
  `TypeError: Cannot read properties of undefined (reading 'slice')` at
  `src/app/api/top-tracks/route.ts` — `const { items } = await response.json()` comes back
  undefined and `items.slice(0, 10)` throws. **140 occurrences, 69 users, in seven days**, first
  seen 2026-07-24, still firing today. `NowPlayingPill` is in the header on every page and
  fetches this route, so every visitor hits it.
  - **Split the work at the decision.** The defensive half is not blocked: the route must return
    a well-formed empty payload instead of throwing when the response has no `items`, exactly as
    `/api/currently-playing` already does for its own failure case. Ship that first.
  - Whether the widget is then *fixed* (real tracks again) or *removed* is **D-12** — do not
    pick on Stefan's behalf.
  - **Done when:** the route returns 200 with an empty track list against a malformed Spotify
    response, the header renders without an error, and the error group stops growing on the next
    deploy.
  - *Blocked by: nothing for the defensive fix. The fix-or-remove call is D-12.*

  **Defensive fix merged.** The route degrades to `{ tracks: [] }` with a 200 on a non-ok
  response, a body without an `items` array, or a thrown fetch, and filters malformed tracks
  rather than assuming them well formed. Production verified: `200 {"tracks":[]}` where it
  previously 500ed. **Root cause confirmed against live credentials, and it is not what the
  ticket assumed:** Spotify answers the token request with
  `400 invalid_grant: Refresh token revoked`. The response shape did not change — the token
  did. So D-12 is a question about whether you want to keep re-authorising Spotify by hand,
  not about whether the code can be fixed.

- [x] **T-35 · `react-syntax-highlighter` fails to load in the serverless runtime** — closed 2026-09-04, **not reproducible; fixed incidentally by T-25**
  `ERR_REQUIRE_ESM: require() of ES Module refractor/lib/core.js from
  react-syntax-highlighter/dist/cjs/prism-light.js` on `/posts/[slug]` — 10 occurrences, 3 users,
  first seen 2026-06-26, **last seen 2026-09-04 05:49**, which is before the App Router port
  deployed. The three failing URLs (`/posts/Next.js`, `/posts/webpack.config.js`,
  `/posts/does-not-exist-xyz`) all return **404 correctly on production now**, so the port may
  already have fixed it as a side effect of Turbopack's bundling.
  - **Verify before fixing.** If it is genuinely gone, prove it and leave a guard; if it can
    still happen on an on-demand render, the durable fix is to stop importing
    `react-syntax-highlighter/dist/cjs/*` from a server component at all — T-13 already renders
    MDX through Shiki, so the Cosmic path can use the same one and the dependency dies early
    instead of at T-20.
  - **Done when:** an on-demand render of `/posts/[slug]` — a real post and an unknown slug —
    cannot produce `ERR_REQUIRE_ESM`, demonstrated rather than asserted, and code blocks still
    render highlighted in server HTML with zero empty `<pre>`.
  - *Blocked by: nothing*

  **Result: no code changed, and that is the finding.** It was a *bundling* failure, not a code
  failure. Under Pages Router and webpack, `react-syntax-highlighter` was left external, so the
  serverless function did `require()` on its CJS `prism-light.js`, which `require()`s ESM
  `refractor/lib/core.js`. Turbopack compiles both packages **into** the server chunks, so that
  `require()` no longer exists.
  - The decisive evidence is deployment-shaped, not runtime-shaped: the Node file trace for the
    route, `.next/server/app/posts/[slug]/page.js.nft.json`, lists **1014 files and zero**
    matching `react-syntax-highlighter` or `refractor` — those files are never shipped to
    `/var/task` for this function, so the traced `require()` is unreachable. The sourcemap for
    the SSR chunk instead lists `refractor/lang/*` among its sources. Independently re-verified.
  - Supporting: on-demand renders of the exact failing slugs (`/posts/Next.js`,
    `/posts/webpack.config.js`) 404 with a clean server log, and Cosmic posts still render
    highlighted code in server HTML with zero empty `<pre>`. Local `next start` is not Vercel's
    runtime, so this is corroboration, not proof — the trace is the proof.
  - **Regression cover already exists.** `scripts/smoke.ts` asserts a real 404 on an unknown
    slug and `.github/workflows/smoke.yml` runs it against every successful deployment. That is
    exactly this bug's signature: an unknown slug forces a dynamic render, and a module that
    fails to evaluate gives 500 instead of 404. A second check would be duplication.
  - **The CJS dependency itself still dies at T-20**, when the Cosmic branch and `asCosmicShape`
    go and the markdown path moves to the Shiki setup T-13 built. Migrating it now would be
    churn against a bug that no longer exists.

- [x] **T-36 · Don't render an empty table of contents** — done 2026-09-04, branch `t36-empty-toc`
  Stefan's report, 2026-09-04, with a screenshot of `/posts/i-built-a-free-sitemap-comparison-tool`:
  the post has no `h2`s, so the sidebar showed a "TABLE OF CONTENTS" label above an empty box.
  - **The cause is that `TableOfContents` is a client component that reads `h2`s out of the DOM
    after it mounts.** It cannot know whether it will be empty until too late, so it always
    shipped the label and an empty `<ul>` — on *every* post, filled in only at hydration. On the
    one post with no headings, it never filled.
  - Fixed by deciding on the server: the page counts `##` in the body and renders the component
    only above a threshold, so the wrapper never enters the flex row and the article closes up
    instead of sitting beside a reserved gap. **`TableOfContents.tsx` is unchanged** — it was
    not broken, it was being asked a question it could not answer.
  - **Threshold is 2, not 1.** A one-item table of contents is a label above a single link to a
    heading already on screen. No post has exactly one `h2` today, so this is a deliberate
    threshold rather than a fix for an observed case; `TOC_MIN_HEADINGS` names it and a test
    pins it.
  - > **Trap: `##` inside fenced code blocks.** `countHeadings` strips fences first. Without
    > that, `building-react-components-from-headless-cms-markdown` counts **9** headings instead
    > of 5 — the extra four are `## or` lines between npm/pnpm/yarn install commands. The browser
    > never sees those as headings, so a naive count would disagree with the DOM by four. Any
    > future code that counts markdown headings needs the same strip.
  - **All 11 posts audited, so this is fixed once rather than per-post:** exactly one has zero
    `h2`s (the sitemap post), none has exactly one, and the other ten range 2–9. Verified in
    built HTML — 10 of 11 post pages contain the table-of-contents `nav`, and the sitemap post
    contains none.
  - **Done when:** the empty panel is gone with no label, container or reserved gap; posts with
    headings are unaffected; and the counter is unit-tested including the code-fence case. All
    verified — built HTML counted per post, and both cases eyeballed at 1100px, the width where
    the panel sits in the flex row rather than absolutely positioned.
  - *Blocked by: nothing*

  **Observation, not actioned:** on posts that *do* have headings the server HTML still ships the
  label above an empty `<ul>` until hydration fills it. That is the pre-existing DOM-scraping
  design and it predates this ticket. Fixing it means passing the headings themselves from the
  server, which needs slugs that match `rehype-slug` exactly — worth doing when the Cosmic branch
  goes at T-20 and there is one rendering path instead of two, not now.

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
| 2026-09-03 | Claude | **PRs #17–#22 all merged to `main`** (`9db56ae`). Stage 0, 1 and 2 complete and live. Stefan approved committing the 28 MB asset archive. `main` re-verified green after every merge: build 11 post pages, tsc clean, tests 3/3, lint runs, zero empty `<pre>`, 28 assets valid. |
| 2026-09-03 | Stefan | **D-01 answered: App Router.** Added **T-25** (Stage 2.5) to port 10 page routes + 6 API routes before the content pipeline. Not in any prior estimate; ~8–14h. Stage 3 now builds against App Router as the original plan described. |
| 2026-09-03 | Claude | Isolation fix verified and written into §"How to use this document": worktree pattern proven (checkout in a worktree leaves the main repo's HEAD untouched), and a no-push-to-`main` rule added. All four branches re-verified with a full `next build` + `tsc`, each passing standalone. Zero duplicated commits remain; nothing was lost. |
| 2026-09-04 | Claude | **T-25** done on `t25-app-router`. All 10 page routes and 6 API routes ported to the App Router; `next/head` replaced by `metadata`/`generateMetadata`, preview mode by `draftMode()`, `getStaticPaths` by `generateStaticParams`. Rendered page text byte-identical to the Pages output on every route; 11 post routes still SSG. Two forced fixes: `bash` grammar registration in `CodeBlock` (the Pages build was highlighting it by accident) and an unused `useRef` import in `AlertPreview`. **Stage 3 is unblocked.** |
| 2026-09-04 | Stefan | **D-09 answered: Option A, genre axis** — `tutorial` · `essay` · `project`, replacing the five-value mix of technology and genre. Full 11-post remap recorded in D-09. Renaming is URL-safe (no `/category/<x>` routes). Tech `tags` deferred until ~25 posts. **T-12 now waits only on D-08.** |
| 2026-09-04 | Claude | **Image direction (Stefan's leaning, not a closed decision):** move away from inline images — they do little for agents. Measured extent: **19 inline images across 7 posts**, 4 posts already have none; all 11 have a cover. Consequences if taken: D-08 → flat, D-05 answers itself (all 7 GIFs are inline), D-04 likely moot. **The cost is concentrated in one place** — `how-to-deploy-a-static-html-css-and-javascript-website-to-vercel` holds 6 of the 19, they are click-here-then-here Vercel UI screenshots, and it is the post carrying 69% of blog traffic. That is D-10. Covers are separate: they feed `og:image` for crawlers and social cards, so dropping inline images does not imply dropping covers. |
| 2026-09-04 | Stefan | **D-08 answered: colocated + a build-time copy script** (Claude's recommendation, requested). **Images stay** — the earlier "move away from images" leaning is withdrawn. Posts are `content/posts/<slug>/index.mdx`; notes stay flat. Research recorded in D-08: `next-mdx-remote/rsc` cannot resolve colocated images, so T-14 owns a copy-to-`public` step with `sharp`-computed dimensions and blur data; the usual `copy-webpack-plugin` recipe is unusable because we build with Turbopack; Velite was considered and rejected as it would replace T-12 rather than feed it. |
| 2026-09-04 | Claude | **T-12** done on `t12-content-loader`. Zod schemas for posts and notes, `gray-matter` parsing, a loader that throws naming file and field, and `bun run validate:content` reporting every problem at once — both verified against a deliberately malformed post. `/posts/[slug]` prefers local content and falls back to Cosmic; the proof post renders at its route. Build 22 pages, sitemap still 17 URLs, tests 5/5, tsc clean, lint unchanged. `tests/route-manifest.ts` repointed at colocated directories, unioned with the snapshot while Cosmic still serves posts — **T-20 must delete that half.** |
| 2026-09-04 | Claude | **T-13** done on `t13-mdx-highlighting`. `rehype-pretty-code` + Shiki at build time, themed to a one-for-one port of the existing Prism palette, zero highlighter in the client bundle. `rehype-autolink-headings` proved unnecessary — `rehype-slug` plus a shared `PostHeading` gives MDX and Cosmic byte-identical heading markup. Traps recorded in T-13: an inline Shiki theme needs a `tokenColors` key or rehype-pretty-code reads it as a map of named themes, and a broken MDX render does **not** fail the build while the proof post is a draft — it 500s at request time. One CI-only failure worth remembering: `formik`'s nested `@types/react` 18 breaks the MDX component types, a `package.json` `overrides` pin fixes it locally but **Vercel's install ignores it**, so the fix is a typed escape hatch in the component map, not a dependency pin. |
| 2026-09-04 | Claude | **T-14 built** on `t14-images` (left unticked — D-05 unanswered). `prebuild`/`predev` script copies colocated images to `public/content/posts/<slug>/` and writes a manifest of width, height, blur placeholder and `animated` from `sharp`; `MdxImage` renders them through the modern `next/image`, GIFs `unoptimized`. Decided the T-14 side question: new content uses the current `next/image` API, `BlurImage`'s `next/legacy/image` stays with `PostBody` until T-20. Trap recorded: `sharp`'s `height` on an animated GIF is all frames stacked — use `pageHeight`, or the image renders 59× too tall. |
| 2026-09-04 | Claude | **Stage 6 added** — discoverability, **T-26 … T-32**, from an external SEO and AI-assistant playbook audited against the repo and against live production HTML. Findings in §1 "Discoverability surface". Two real defects: **no `alternates.canonical` on any of the six static routes** (`pageMetadata` sets only `openGraph.url`) and **zero JSON-LD site-wide**. Also confirmed live: `/feed.xml` still 404s behind an autodiscovery link on every page (T-16, and `Meta.tsx:33` is now two files); the Cosmic OG image is alive and byte-identical to a copy already committed to `public/`, so it left T-22 as **T-27**; five static descriptions are 18–45 chars; `AboutSheet`'s bio never reaches server HTML (D-06). The playbook's local-business half — `LocalBusiness`, `areaServed`, licences, hours — does not apply to a personal site and was dropped rather than translated. |
| 2026-09-04 | Stefan | **D-11 answered: allow every AI crawler, named explicitly.** No behaviour change from today's `Allow: /`; the point is that the decision is recorded rather than inferred from an omission. T-31 writes the groups. |
| 2026-09-04 | Claude | **T-17** done on `t17-draft-gate`. `draftsAreVisible` gates every collection reader on `VERCEL_ENV !== 'production'`; drafts 404 in production, render at their real URL on previews and locally, and never enter the sitemap because they are never prerendered. Verified with a production-env build and a preview-env build side by side. |
| 2026-09-04 | Claude | **T-15** done on `t15-notes`. `/notes` is a reverse-chronological stream rendering each note in full, with `/notes/<slug>` permalinks; two test notes (one untitled) verified newest-first, linked, and absent from `/posts`. Both are drafts, so production shows an empty state until a real note lands. |
| 2026-09-04 | Claude | **T-18** done on `t18-agents-md`. `AGENTS.md` + `content/_templates/` + `bun run new:post`/`new:note`. Acceptance tested for real: a fresh agent given only `AGENTS.md` wrote a valid post first try. The first run exposed four gaps — the scaffold's non-existent default cover, a sentence-case/title-case contradiction, draft `date` semantics, and flat-vs-directory for image-free posts — all fixed before the second run, which needed nothing outside the document. |
| 2026-09-04 | Claude | **T-19** done on `t19-ci`. `ci.yml` (content validation, typecheck, tests as hard gates; lint advisory) on every PR, and `smoke.yml` on `deployment_status` running `scripts/smoke.ts` against the real deployed URL — asserting each legacy post's title *and* a known body sentence from a generated fixture, plus a real 404 on an unknown slug, which is what §2.3 said a 200-plus-h1 check could never catch. All three acceptance conditions exercised for real, including tampering with a fixture phrase to watch it go red. |
| 2026-09-04 | Claude | **Two live production defects ticketed** from Vercel's runtime error table, both predating the migration. **T-34**: `/api/top-tracks` has 500ed on every page load since 2026-07-24 — 140 occurrences, 69 users in seven days — because Spotify's response no longer carries `items`; `NowPlayingPill` in the header fetches it site-wide. Fix-or-remove is **D-12**, opened; the defensive fix is not blocked on it. **T-35**: `ERR_REQUIRE_ESM` on `react-syntax-highlighter` at `/posts/[slug]`, last seen 05:49 today, *before* the App Router port deployed — the failing URLs 404 correctly now, so it may already be fixed and the task is to prove it either way. |
| 2026-09-04 | Claude | **Two pre-port findings re-verified against production, both changed.** `/rss.xml` **and** `/feed.xml` are both 404 today while the root layout advertises `/feed.xml` — the dead autodiscovery link is still real and still belongs to T-16, waiting on D-02. The `REVALIDATE_TOKEN` gap is **not** a gap post-port: `/api/revalidate` fails closed with 401 when the secret is absent or wrong, verified live. The only open question there is whether the variable is set in Vercel at all — if it is not, the route is inert rather than unsafe. |
| 2026-09-04 | Claude | **T-35 closed without a code change: not reproducible.** The `ERR_REQUIRE_ESM` was webpack externalising `react-syntax-highlighter`; Turbopack bundles it, and the route's Node file trace ships neither it nor `refractor` — 1014 traced files, zero matches, verified twice. The App Router port fixed it incidentally. Existing smoke-check coverage (unknown slug must 404) is exactly this bug's signature, so no new guard was added. **T-34's defensive fix is PR #37**, and confirmed the real cause: Spotify returns `invalid_grant: Refresh token revoked`, so D-12 is a question about maintaining a token, not about code. |
| 2026-09-04 | Claude | **T-33** (new, Stefan's request) done on `t33-breadcrumbs`: visible breadcrumbs plus `BreadcrumbList` JSON-LD on post pages, in its own worktree. No category crumb — categories are a client-side filter with no route, so linking one would invent a URL. Built on T-28's `@id` convention so T-28 extends it instead of duplicating. **The request assumed Pages Router and asked whether to wait for D-01: neither applies — D-01 was answered 2026-09-03 and T-25 shipped the App Router port, so there is nothing to hold for and nothing to redo.** |
| 2026-09-04 | Claude | **Wave merged: six PRs.** #36 (tickets, D-12), #37 (T-34 defensive fix), #38 (T-27), #39 (T-31), #40 (T-26), #35 (T-33). Production re-verified after deploy: `/api/top-tracks` returns 200 with an empty list, every static route carries exactly one self-referencing canonical, `og:image` is served from `public/`, `robots.txt` names 17 agents and disallows `/api/`, post pages render breadcrumbs plus one `BreadcrumbList` script, and the smoke check is 18/18. Two merge collisions handled rather than papered over: T-26's pinned expectation caught T-27's image change (fixed by pointing it at the new value), and T-33 needed a doc rebase against the Stage 7 tickets. |
| 2026-09-04 | Claude | **Wave process note.** The first attempt at this wave dispatched five agents at once and *all five* died on a shared session rate limit, having committed nothing; two left partial working-tree edits that were reviewed rather than trusted on the retry. Three at a time is the safer cadence. Agents were also told not to touch this file — one owner per document — which is why these ticks arrive as a separate bookkeeping commit. |
| 2026-09-04 | Claude | **Session handoff written** (§"Session handoff"), so the session holding this context can be replaced without loss: nothing in flight, every wave branch merged and deleted, the answered decisions listed with their answers, the worktree procedure that worked (path outside the repo, copy `.env`, one owner per document, three agents not five), and the stray in-repo worktree that inflates local lint counts. **One earlier claim corrected:** `deployment_status` workflows do *not* only run from the default branch — the smoke job ran from PR branches against preview deployments throughout the wave, so every preview is smoke-checked. **Two traps recorded that were living only in PR bodies:** a route's `alternates` replaces the root layout's entire object, so adding a canonical silently drops the RSS link (bit T-26, will bite T-16 and T-28); and `/robots.txt` 404s on every preview because `NEXT_PUBLIC_GENERATE_ROBOTS` is production-only, so a robots change has no preview to inspect. |
| 2026-09-04 | Claude | **T-36** done on `t36-empty-toc`. `/posts/i-built-a-free-sitemap-comparison-tool` has no `h2`s, so the sidebar showed a "TABLE OF CONTENTS" label above an empty box. Root cause is that `TableOfContents` scrapes `h2`s from the DOM after mounting, so the label and an empty `<ul>` ship in the server HTML of **every** post and are filled only at hydration — on that one post they never fill. The page now counts headings server-side and does not render the component below `TOC_MIN_HEADINGS`; `TableOfContents.tsx` is untouched. **Threshold set to 2** — a one-item table of contents is a label above a single link to a heading already on screen — though no post has exactly one `h2`, so it guards a future case rather than a current one. **Trap recorded: `##` inside fenced code blocks.** Stripping fences first is what keeps `building-react-components-from-headless-cms-markdown` at 5 rather than 9 (`## or` between install commands); the browser never sees those, so a naive count disagrees with the DOM by four. All 11 posts audited — one zero, none at one, ten at 2–9 — and confirmed in built HTML. |
| 2026-09-04 | Claude | **Two of the four "permanently gone" images are not gone.** Nobody had checked the Wayback Machine. `blur-placeholder-next.gif` (674,232 B, 3 frames) and `image-settings.gif` (1,540,459 B, 35 frames) both have 2022-07-29 snapshots, byte-complete and still animated; recovered, verified and committed to `assets/cosmic-archive/`. `image-bucket.png` and `react-markdown-ast-diagram.png` have no snapshot and still 403. Manifest now reads 30 downloaded / 2 dead / 7 GIFs, with the two recovered entries carrying `status: "recovered"` and a `recovered_from` snapshot URL. **Re-running `scripts/download-assets.mjs` would re-mark them dead** — warning added to its header. Also corrects D-04's premise: only one of the four was a Cosmic dashboard screenshot, not two. |
| 2026-09-04 | Stefan | **D-04 answered: recover the two, drop the two, rewrite the prose.** The two Wayback recoveries stand; `react-markdown-ast-diagram.png` and `image-bucket.png` are dropped rather than recreated. Both rewrites are recorded verbatim in D-04 — one sentence in the react-markdown post (the three numbered steps below it already carry the diagram's content), and two sentences plus a deleted joke in the Cosmic post (the gag depends on the screenshot being on screen and must not be repointed at images that become repo-local at T-20). **T-03's asset half is done and its prose half rides on T-20, so T-20 is unblocked** — and with it T-21, T-22, T-23 and T-30. |
