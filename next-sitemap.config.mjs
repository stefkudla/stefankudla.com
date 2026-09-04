/** @type {import('next-sitemap').IConfig} */

// D-11 (answered 2026-09-04): allow every AI crawler, named explicitly. Naming
// them changes no behaviour — the wildcard `Allow: /` below already admits all
// of them — but it makes the decision readable instead of inferred from an
// omission. The two lists below are D-11's split by what an agent does with a
// page; keep the names exactly as the decision spells them.

/** Agents that crawl to build training corpora. */
export const TRAINING_AGENTS = [
  'GPTBot',
  'ClaudeBot',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
  'anthropic-ai',
  'meta-externalagent',
  'Amazonbot',
]

/** Agents that crawl to cite or retrieve a page in an answer. */
export const CITATION_AGENTS = [
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

export const AI_AGENTS = [...TRAINING_AGENTS, ...CITATION_AGENTS]

const config = {
  siteUrl: 'https://stefankudla.com',
  generateIndexSitemap: false,
  generateRobotsTxt: process.env.NEXT_PUBLIC_GENERATE_ROBOTS === 'true',
  robotsTxtOptions: {
    policies: [
      // `/api/` holds six route handlers and no content, so keep crawlers out.
      { userAgent: '*', allow: '/', disallow: '/api/' },
      ...AI_AGENTS.map(userAgent => ({ userAgent, allow: '/' })),
    ],
  },
}
export default config
