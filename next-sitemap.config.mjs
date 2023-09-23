/** @type {import('next-sitemap').IConfig} */

const config = {
  siteUrl: 'https://stefankudla.com',
  generateIndexSitemap: false,
  generateRobotsTxt: process.env.NEXT_PUBLIC_GENERATE_ROBOTS === 'true',
}
export default config
