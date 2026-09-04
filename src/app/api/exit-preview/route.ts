import { NextRequest, NextResponse } from 'next/server'
import { draftMode } from 'next/headers'

export async function GET(request: NextRequest) {
  const draft = await draftMode()
  draft.disable()

  // Redirect the user back to the index page.
  return NextResponse.redirect(new URL('/', request.nextUrl.origin), 307)
}
