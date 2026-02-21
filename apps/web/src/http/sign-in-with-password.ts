import { api } from './api-client'

interface SignInWithEmailPasswordRequest {
  email: string
  password: string
}

interface SignInWithEmailPasswordResponse {
  token: string
}

export async function signInWithEmailPassword({
  email,
  password,
}: SignInWithEmailPasswordRequest) {
  const result = await api
    .post('sessions/password', {
      json: {
        email,
        password,
      },
    })
    .json<SignInWithEmailPasswordResponse>()

  return result
}
