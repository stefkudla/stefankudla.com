import type { NextApiRequest, NextApiResponse } from 'next'
import { cosmic } from '@/lib/cosmic'

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await cosmic.objects
      .find({ type: 'posts' })
      .props(
        'title,slug,metadata.cover_image.imgix_url,metadata.excerpt,created_at'
      )
      .limit(3)
      .sort('-created_at')
      .status('published')

    res.setHeader(
      'Cache-Control',
      'public, s-maxage=300, stale-while-revalidate=60'
    )

    return res.status(200).json({ posts: data.objects })
  } catch {
    return res.status(500).json({ posts: [] })
  }
}
