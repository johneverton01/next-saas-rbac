import { getProfile } from '@/http/get-profile'
import { getToken } from '@/utils/token'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function isAuthenticated() {
  const hasToken = await cookies()
  return !!hasToken.get('token')?.value
}

export async function auth() {
  const token = await getToken()

  if (!token) {
    redirect('/auth/sign-in')
  }

  try {
    const { user } = await getProfile()

    return { user }
  } catch (error) {
    redirect('/api/auth/sign-out')
  }
}
