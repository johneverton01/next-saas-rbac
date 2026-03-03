'use server'

import { getCurrentOrg } from '@/auth/auth'
import { createInvite } from '@/http/create-invite'
import { removeMember } from '@/http/remove-member'
import { revokeInvite } from '@/http/revoke-invite'
import { updateMember } from '@/http/update-member'
import { RolesSchema, type Role } from '@saas/auth'
import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

const InviteSchema = z.object({
  email: z.email({ message: 'Invalid e-mail address' }),
  role: RolesSchema,
})

export async function createInviteAction(data: FormData) {
  const result = InviteSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return {
      success: false,
      message: undefined,
      errors,
    }
  }

  const { email, role } = result.data

  try {
    const currentOrg = await getCurrentOrg()
    await createInvite({
      org: currentOrg!,
      email,
      role,
    })

    revalidateTag(`${currentOrg}/invites`, '')
  } catch (error) {
    if (error instanceof HTTPError) {
      const { message } = await error.response.json()

      return {
        success: false,
        message,
        errors: undefined,
      }
    }

    console.error(error)

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      errors: undefined,
    }
  }

  return {
    success: true,
    message: 'Successfully created the invite',
    errors: undefined,
  }
}

export async function removeMemberAction(memberId: string) {
  const currentOrg = await getCurrentOrg()

  await removeMember({
    org: currentOrg!,
    memberId,
  })

  revalidateTag(`${currentOrg}/members`, '')
}

export async function removeInviteAction(inviteId: string) {
  const currentOrg = await getCurrentOrg()

  await revokeInvite({
    org: currentOrg!,
    inviteId,
  })

  revalidateTag(`${currentOrg}/invites`, '')
}

export async function updateMemberRoleAction(memberId: string, role: Role) {
  const currentOrg = await getCurrentOrg()

  await updateMember({
    org: currentOrg!,
    memberId,
    role,
  })

  revalidateTag(`${currentOrg}/members`, '')
}
