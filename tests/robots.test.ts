import { describe, expect, it } from 'vitest'
import config, {
  AI_AGENTS,
  CITATION_AGENTS,
  TRAINING_AGENTS,
} from '../next-sitemap.config.mjs'

// D-11 names these agents. The lists are copied here on purpose: the guard is
// worthless if it reads the same array the config builds its policies from.
const D11_TRAINING = [
  'GPTBot',
  'ClaudeBot',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
  'anthropic-ai',
  'meta-externalagent',
  'Amazonbot',
]
const D11_CITATION = [
  'OAI-SearchBot',
  'ChatGPT-User',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'DuckAssistBot',
  'Applebot',
  'Bingbot',
]

type Policy = { userAgent: string; allow?: string; disallow?: string }

const policies: Policy[] = config.robotsTxtOptions.policies

describe('robots.txt policies', () => {
  it('names exactly the agents D-11 lists — no additions, no omissions', () => {
    expect(TRAINING_AGENTS).toEqual(D11_TRAINING)
    expect(CITATION_AGENTS).toEqual(D11_CITATION)
  })

  it('gives every D-11 agent its own Allow: / group', () => {
    for (const agent of AI_AGENTS as string[]) {
      const group = policies.filter(p => p.userAgent === agent)
      expect(group, `no group for ${agent}`).toHaveLength(1)
      expect(group[0].allow).toBe('/')
    }
  })

  it('allows / but disallows /api/ for the wildcard group', () => {
    const wildcard = policies.filter(p => p.userAgent === '*')
    expect(wildcard).toHaveLength(1)
    expect(wildcard[0].allow).toBe('/')
    expect(wildcard[0].disallow).toBe('/api/')
  })
})
