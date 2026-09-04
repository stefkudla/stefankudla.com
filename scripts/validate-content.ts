/**
 * Standalone content validation — `bun run validate:content`.
 *
 * Reports the same file-and-field errors the loader throws at build time, but
 * every one of them at once rather than stopping at the first bad file.
 */
import { collectContentErrors } from '@/lib/content'

const errors = collectContentErrors()

if (errors.length === 0) {
  console.log('content: no problems found')
  process.exit(0)
}

console.error(
  `content: ${errors.length} file${
    errors.length === 1 ? '' : 's'
  } failed validation\n`
)
for (const error of errors) console.error(`${error.message}\n`)
process.exit(1)
