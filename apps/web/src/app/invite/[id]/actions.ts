'use server'

import { acceptInvite } from '@/http/accept-invite'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function signInFromInvite(email: string, inviteId: string) {
  const cookieStore = await cookies()
  cookieStore.set('inviteId', inviteId)

  redirect(`/auth/sign-in?email=${email}`)
}

export async function acceptInviteAction(inviteId: string) {
  await acceptInvite(inviteId)

  redirect('/')
}
