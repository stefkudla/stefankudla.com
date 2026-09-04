import { NextResponse } from 'next/server'
import { cosmic } from '@/lib/cosmic'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const data = await cosmic.objects
      .find({ type: 'posts' })
      .props(
        'title,slug,metadata.cover_image.imgix_url,metadata.excerpt,created_at'
      )
      .limit(3)
      .sort('-created_at')
      .status('published')

    return NextResponse.json(
      { posts: data.objects },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60',
        },
      }
    )
  } catch {
    return NextResponse.json({ posts: [] }, { status: 500 })
  }
}
