import { cookies } from 'next/headers'
export async function isAuthenticated() {
  const hasToken = await cookies()
  return !!hasToken.get('token')?.value
}
