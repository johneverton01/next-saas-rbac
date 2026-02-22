import { deleteToken } from '@/utils/token'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const redirectUrl = request.nextUrl.clone()

  redirectUrl.pathname = '/auth/sign-in'

  await deleteToken()

  return NextResponse.redirect(redirectUrl)
}
