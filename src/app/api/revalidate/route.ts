import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')
  const path = request.nextUrl.searchParams.get('path')

  if (secret !== process.env.REVALIDATE_TOKEN || !path) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
  }

  try {
    revalidatePath(path)
    return NextResponse.redirect(new URL(path, request.nextUrl.origin), 307)
  } catch {
    return new NextResponse('Error revalidating', { status: 500 })
  }
}
