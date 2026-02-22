import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { signInWithGithub } from '../actions'

interface LoginWithGithubProps {
  text: string
}

export function LoginWithGithub({ text }: LoginWithGithubProps) {
  return (
    <form action={signInWithGithub}>
      <Button type="submit" className="w-full" variant="outline">
        <Image
          src="/assets/github-icon.svg"
          alt=""
          className="mr-2 size-4 dark:invert"
          width={16}
          height={16}
        />
        {text}
      </Button>
    </form>
  )
}
