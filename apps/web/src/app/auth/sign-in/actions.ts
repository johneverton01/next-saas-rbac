'use server'

import { acceptInvite } from '@/http/accept-invite'
import { signInWithEmailPassword } from '@/http/sign-in-with-password'
import { setToken } from '@/utils/token'
import { HTTPError } from 'ky'
import { cookies } from 'next/headers'
import { z } from 'zod'

const signInSchema = z.object({
  email: z
    .email({ message: 'Please provide a valid email address' })
    .min(1, { message: 'Please, provide your email address' }),
  password: z.string().min(1, { message: 'Please, provide your password' }),
})

export async function signInWithEmailAndPassword(data: FormData) {
  const result = signInSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return {
      success: false,
      message: undefined,
      errors,
    }
  }

  const { email, password } = result.data

  try {
    const { token } = await signInWithEmailPassword({
      email,
      password,
    })

    await setToken(token)

    const cookieStore = await cookies()
    const inviteId = cookieStore.get('inviteId')?.value

    if (inviteId) {
      try {
        await acceptInvite(inviteId)
        cookieStore.delete('inviteId')
      } catch {}
    }
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
    message: undefined,
    errors: undefined,
  }
}
