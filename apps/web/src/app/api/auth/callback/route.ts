import { signInWithGithub } from '@/http/sign-in-with-github'
import { setToken } from '@/utils/set-token'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.json(
      {
        message: 'Github OAuth code was not found.',
      },
      {
        status: 400,
      }
    )
  }

  const { token } = await signInWithGithub({ code })

  await setToken(token)

  const redirectURL = request.nextUrl.clone()
  redirectURL.pathname = '/'
  redirectURL.search = ''

  return NextResponse.redirect(redirectURL)
}
