import { Laptop2 } from 'lucide-react'
import { ProfileButton } from './profile-button'

export function Header() {
  return (
    <header className="mx-auto flex max-w-300 items-center justify-between">
      <div className="flex items-center gap-3">
        <Laptop2 className="size-6 dark:invert" />
      </div>

      <div className="flex items-center gap-4">
        <ProfileButton />
      </div>
    </header>
  )
}
