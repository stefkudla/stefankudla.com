import type { ThemeRegistrationRaw } from 'shiki'

const tokenColors = [
  { settings: { background: '#0c0c0e', foreground: '#fcd34d' } },
  {
    scope: ['comment', 'punctuation.definition.comment'],
    settings: { foreground: '#71717a' },
  },
  {
    scope: ['punctuation', 'meta.brace'],
    settings: { foreground: '#f4f4f5' },
  },
  {
    scope: [
      'constant',
      'constant.numeric',
      'constant.language',
      'entity.name.tag',
      'support.type.property-name',
    ],
    settings: { foreground: '#e4e4e7' },
  },
  {
    scope: [
      'string',
      'entity.other.attribute-name',
      'entity.name.tag.css',
      'support.function.builtin',
    ],
    settings: { foreground: '#1862ff' },
  },
  {
    scope: [
      'keyword',
      'keyword.operator',
      'keyword.control',
      'storage',
      'storage.type',
      'support.type',
      'meta.at-rule',
      'meta.property-value',
    ],
    settings: { foreground: '#67e8f9' },
  },
  {
    scope: [
      'entity.name.function',
      'support.function',
      'meta.function-call',
      'string.regexp',
    ],
    settings: { foreground: '#d946ef' },
  },
]

/**
 * Shiki's version of the Prism theme in `src/styles/code-theme.css`, so MDX
 * code blocks are indistinguishable from the Cosmic ones that
 * `react-syntax-highlighter` renders while both paths coexist (until T-20).
 *
 * The colours are lifted from that stylesheet one for one. Prism leaves plain
 * identifiers unstyled, so `variable` is deliberately absent here and falls
 * through to the amber foreground; the one visible difference is shell
 * variables, which Prism tints magenta.
 *
 * Shiki reads the token list from `settings`, while rehype-pretty-code only
 * recognises an inline theme — rather than a map of named themes — when
 * `tokenColors` is present. Both point at the same array.
 */
export const codeTheme: ThemeRegistrationRaw & {
  tokenColors: typeof tokenColors
} = {
  name: 'stefankudla-dark',
  type: 'dark',
  colors: {
    'editor.background': '#0c0c0e',
    'editor.foreground': '#fcd34d',
  },
  settings: tokenColors,
  tokenColors,
}
