import { cookies } from 'next/headers'
const COOKIES_EXPIRE_7_DAYS = 60 * 60 * 24 * 7

export async function setToken(token: string) {
  const cookiesStore = await cookies()
  cookiesStore.set('token', token, {
    maxAge: COOKIES_EXPIRE_7_DAYS,
    path: '/',
  })
}
