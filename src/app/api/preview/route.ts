import { NextRequest, NextResponse } from 'next/server'
import { draftMode } from 'next/headers'
import { getPreviewPostBySlug } from '@/lib/cosmic'

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')
  const slug = request.nextUrl.searchParams.get('slug')

  if (secret !== process.env.COSMIC_PREVIEW_SECRET || !slug) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
  }

  // Fetch the headless CMS to check if the provided `slug` exists
  const post = await getPreviewPostBySlug(slug)

  // If the slug doesn't exist prevent preview mode from being enabled
  if (!post) {
    return NextResponse.json({ message: 'Invalid slug' }, { status: 401 })
  }

  // Enable Draft Mode by setting the cookie
  const draft = await draftMode()
  draft.enable()

  // Redirect to the path from the fetched post
  // We don't redirect to the requested slug as that might lead to open redirect vulnerabilities
  return NextResponse.redirect(
    new URL(`/posts/${post.slug}`, request.nextUrl.origin),
    307
  )
}
