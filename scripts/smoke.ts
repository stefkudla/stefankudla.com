/**
 * Post-deploy smoke check over every legacy URL.
 *
 *   bun scripts/smoke.ts https://stefankudla.com
 *
 * Asserts more than "200 and a non-empty <h1>", which passes on a post whose
 * body has silently gone missing (§2.3 of the migration plan). For each legacy
 * post it checks the title *and* a known sentence from the body, and it checks
 * that an unknown slug really 404s rather than soft-404ing.
 */
import fs from 'node:fs'
import path from 'node:path'

const base = (process.argv[2] ?? process.env.DEPLOY_URL ?? '').replace(/\/$/, '')

if (!base) {
  console.error('usage: bun scripts/smoke.ts <base-url>')
  process.exit(1)
}

const root = process.cwd()
const legacy: { staticRoutes: string[]; postSlugs: string[] } = JSON.parse(
  fs.readFileSync(path.join(root, 'content', 'legacy-slugs.json'), 'utf8')
)
const expected: Record<string, { title: string; phrase: string }> = JSON.parse(
  fs.readFileSync(
    path.join(root, 'tests', 'fixtures', 'legacy-content.json'),
    'utf8'
  )
)

/** Tags to spaces, entities decoded — the shape the fixture phrases were taken in. */
const text = (html: string) =>
  html
    .replace(/<(script|style|pre)[\s\S]*?<\/\1>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')

const failures: string[] = []
const check = (ok: boolean, message: string) => {
  if (!ok) failures.push(message)
}

const run = async () => {
  for (const route of legacy.staticRoutes) {
    const response = await fetch(`${base}${route}`)
    check(response.ok, `${route} returned ${response.status}, expected 200`)
  }

  for (const slug of legacy.postSlugs) {
    const url = `${base}/posts/${slug}`
    const response = await fetch(url)

    if (!response.ok) {
      failures.push(`/posts/${slug} returned ${response.status}, expected 200`)
      continue
    }

    const html = await response.text()
    const want = expected[slug]
    if (!want) {
      failures.push(`/posts/${slug} has no entry in tests/fixtures/legacy-content.json`)
      continue
    }

    const title = html.match(/<title>(.*?)<\/title>/)?.[1] ?? ''
    check(
      text(title).includes(text(want.title).trim()),
      `/posts/${slug} title is "${title}", expected "${want.title}"`
    )
    check(
      text(html).includes(want.phrase),
      `/posts/${slug} is missing known body text: "${want.phrase.slice(0, 60)}…"`
    )
  }

  const unknown = await fetch(`${base}/posts/does-not-exist-xyz`)
  check(
    unknown.status === 404,
    `an unknown slug returned ${unknown.status}, expected a real 404`
  )

  const checked = legacy.staticRoutes.length + legacy.postSlugs.length + 1

  if (failures.length > 0) {
    console.error(`smoke: ${failures.length} of ${checked} checks failed against ${base}\n`)
    for (const failure of failures) console.error(`  ${failure}`)
    process.exit(1)
  }

  console.log(`smoke: ${checked} checks passed against ${base}`)
}

run()
