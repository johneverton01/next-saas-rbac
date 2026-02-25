import { getCookie, type CookieValueTypes } from 'cookies-next'
import ky from 'ky'

export const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  hooks: {
    beforeRequest: [attachAuthToken],
  },
})

async function attachAuthToken(request: Request) {
  if (typeof window === 'undefined') {
    const { cookies } = await import('next/headers')
    const cookiesStore = await cookies()
    const token = cookiesStore.get('token')?.value
    if (token) {
      setAuthTokenInHeaders(request, token)
    }
  } else {
    const token = await getCookie('token')
    if (token) {
      setAuthTokenInHeaders(request, token)
    }
  }
}

function setAuthTokenInHeaders(
  request: Request,
  token: string | CookieValueTypes
) {
  request.headers.set('Authorization', `Bearer ${token}`)
}
