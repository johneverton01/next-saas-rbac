import { Laptop2, Slash } from 'lucide-react'
import { OrganizationSwitcher } from './organization-switcher'
import { ProfileButton } from './profile-button'

export function Header() {
  return (
    <header className="mx-auto flex max-w-300 items-center justify-between">
      <div className="flex items-center gap-3">
        <div>
          <Laptop2 className="light:invert size-6" />
        </div>

        <Slash className="text-muted-foreground size-3 -rotate-24" />
        <OrganizationSwitcher />
      </div>

      <div className="flex items-center gap-4">
        <ProfileButton />
      </div>
    </header>
  )
}
