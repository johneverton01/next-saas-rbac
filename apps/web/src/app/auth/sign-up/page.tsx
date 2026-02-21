import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

import Image from 'next/image'
import Link from 'next/link'

export default function SignUpPage() {
  return (
    <form action="" className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="name">Nome</Label>
        <Input id="name" name="name" type="text" placeholder="Nome" />
      </div>
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
      </div>

      <div className="space-y-1">
        <Label htmlFor="confirm_password">Confirm Password</Label>
        <Input
          id="confirm_password"
          name="confirm_password"
          type="password"
          placeholder="Password"
        />
      </div>

      <Button type="submit" className="w-full">
        Create account
      </Button>

      <Button variant="link" className="w-full" size="sm" asChild>
        <Link href="/auth/sign-in">Already registered? Sign in</Link>
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
        Sign up with GitHub
      </Button>
    </form>
  )
}
