'use server'

import { signInWithEmailPassword } from '@/http/sign-in-with-password'

export async function signInWithEmailAndPassword(data: FormData) {
  const { email, password } = Object.fromEntries(data)

  const result = await signInWithEmailPassword({
    email: String(email),
    password: String(password),
  })

  console.log(result)
}
