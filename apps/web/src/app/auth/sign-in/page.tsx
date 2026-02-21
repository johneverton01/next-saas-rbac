import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

import Image from 'next/image'

export default function SignIn() {
  return (
    <form action="" className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="E-mail" />
      </div>
      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" placeholder="Password" />

        <Link
          href="/auth/forgot-password"
          className="text-foreground text-xs font-medium"
        >
          Forgot password?
        </Link>
      </div>
      <Button type="submit" className="w-full">
        Sign in with e-mail
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
