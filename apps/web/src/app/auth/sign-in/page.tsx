import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

import Image from 'next/image'
import { signInWithEmailAndPassword } from './actions'

export default function SignInPage() {
  return (
    <form action={signInWithEmailAndPassword} className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" placeholder="E-mail" />
      </div>
      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
        />
        <Link
          href="/auth/forgot-password"
          className="text-foreground text-xs font-medium transition-colors hover:underline"
        >
          Forgot password?
        </Link>
      </div>
      <Button type="submit" className="w-full">
        Sign in with e-mail
      </Button>

      <Button variant="link" className="w-full" size="sm" asChild>
        <Link href="/auth/sign-up">Create new account</Link>
      </Button>

      <Separator />

      <Button className="w-full" variant="outline">
        <Image
          src="/assets/github-icon.svg"
          alt=""
          className="mr-2 size-4 dark:invert"
          width={16}
          height={16}
        />
        Sign in with GitHub
      </Button>
    </form>
  )
}
