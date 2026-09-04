import { describe, expect, it } from 'vitest'
import { countHeadings, TOC_MIN_HEADINGS } from '../src/lib/headings'

describe('countHeadings', () => {
  it('counts h2s', () => {
    expect(countHeadings('## One\n\ntext\n\n## Two\n')).toBe(2)
  })

  it('returns 0 for a body with no headings', () => {
    expect(countHeadings('Just prose.\n\nAnd more prose.\n')).toBe(0)
  })

  it('ignores ## inside a fenced code block', () => {
    const body = [
      '## Installing the packages',
      '',
      '```bash',
      'pnpm add react-markdown',
      '## or',
      'npm install react-markdown',
      '## or',
      'yarn add react-markdown',
      '```',
      '',
      '## Next steps',
    ].join('\n')
    expect(countHeadings(body)).toBe(2)
  })

  it('does not count h1 or h3', () => {
    expect(countHeadings('# One\n### Three\n## Two\n')).toBe(1)
  })

  it('requires a space and some text after the hashes', () => {
    expect(countHeadings('##NoSpace\n## \n##\n')).toBe(0)
  })

  it('is not fooled by ## mid-line', () => {
    expect(countHeadings('see the ## marker inline\n')).toBe(0)
  })
})

describe('TOC_MIN_HEADINGS', () => {
  it('hides a one-item table of contents', () => {
    expect(countHeadings('## Only one\n')).toBeLessThan(TOC_MIN_HEADINGS)
  })

  it('shows a two-item one', () => {
    expect(countHeadings('## One\n## Two\n')).toBeGreaterThanOrEqual(
      TOC_MIN_HEADINGS
    )
  })
})
