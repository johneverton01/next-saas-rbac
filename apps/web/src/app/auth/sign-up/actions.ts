'use server'

import { signUp } from '@/http/sign-up'
import { HTTPError } from 'ky'
import { z } from 'zod'

const signUpSchema = z
  .object({
    name: z.string().refine((value) => value.split(' ').length > 1, {
      message: 'Please, enter your full name',
    }),
    email: z
      .email({ message: 'Please provide a valid email address' })
      .min(1, { message: 'Please, provide your email address' }),
    password: z
      .string()
      .min(8, { message: 'Password should be at least 8 characters.' }),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Confirm Password does not match',
    path: ['confirm_password'],
  })

export async function signUpAction(data: FormData) {
  const result = signUpSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return {
      success: false,
      message: undefined,
      errors,
    }
  }

  const { name, email, password } = result.data

  try {
    await signUp({
      name,
      email,
      password,
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
