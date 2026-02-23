import { getMembership } from '@/http/get-membership'
import { getProfile } from '@/http/get-profile'
import { getToken } from '@/utils/token'
import { defineAbilitiesFor } from '@saas/auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function isAuthenticated() {
  const token = await getToken()
  return !!token
}

export async function getCurrentOrg() {
  const cookiesStore = await cookies()
  const currentOrg = cookiesStore.get('org')?.value ?? null

  return currentOrg
}

export async function getCurrentMemberShip() {
  const currentOrg = await getCurrentOrg()

  if (!currentOrg) {
    return null
  }

  const { membership } = await getMembership(currentOrg)

  return membership
}

export async function ability() {
  const membership = await getCurrentMemberShip()

  if (!membership) {
    return null
  }

  const ability = defineAbilitiesFor({
    id: membership.userId,
    role: membership.role,
  })

  return ability
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
