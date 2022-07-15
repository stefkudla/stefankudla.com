import { NextApiResponse } from 'next'

export default async function handler(
  req: { query: { path: string; secret: string } },
  res: NextApiResponse
) {
  if (req.query.secret !== process.env.REVALIDATE_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    await res.revalidate(req.query.path)
    res.writeHead(307, { Location: req.query.path })
    return res.end()
  } catch (err) {
    return res.status(500).send('Error revalidating')
  }
}
