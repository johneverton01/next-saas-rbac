import { Separator } from '@/components/ui/separator'

import { LoginWithGithub } from '../components/login-with-github'
import { SignUpForm } from './sign-up-form'

export default function SignUpPage() {
  return (
    <div className="space-y-4">
      <SignUpForm />
      <Separator />
      <LoginWithGithub text="Sign up with GitHub" />
    </div>
  )
}
