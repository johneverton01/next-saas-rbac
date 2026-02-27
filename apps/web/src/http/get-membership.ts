import { auth } from '@/auth/auth'
import { Role } from '@saas/auth'
import { api } from './api-client'

interface GetMembershipResponse {
  membership: {
    id: string
    role: Role
    organizationId: string
    userId: string
  }
}

export async function getMembership(org: string) {
  const isAuthenticated = await auth()
  if (!isAuthenticated) {
    return null
  }
  const result = await api
    .get(`organization/${org}/membership`)
    .json<GetMembershipResponse>()

  return result
}
