'use server'

import { signInWithEmailPassword } from '@/http/sign-in-with-password'
import { HTTPError } from 'ky'
import { cookies } from 'next/headers'
import { z } from 'zod'

const COOKIES_EXPIRE_7_DAYS = 60 * 60 * 24 * 7

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

    const cookiesStore = await cookies()
    cookiesStore.set('token', token, {
      path: '/',
      maxAge: COOKIES_EXPIRE_7_DAYS,
    })
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
