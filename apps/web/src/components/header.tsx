import { ability } from '@/auth/auth'
import { Laptop2, Slash } from 'lucide-react'
import { OrganizationSwitcher } from './organization-switcher'
import { PendingInvites } from './pending-invites'
import { ProfileButton } from './profile-button'
import { ProjectSwitcher } from './project-switcher'
import { ThemeSwitcher } from './theme/theme-switcher'
import { Separator } from './ui/separator'

export async function Header() {
  const permissions = await ability()
  return (
    <header className="mx-auto flex max-w-300 items-center justify-between">
      <div className="flex items-center gap-3">
        <div>
          <Laptop2 className="light:invert size-6" />
        </div>

        <Slash className="text-muted-foreground size-3 -rotate-24" />
        <OrganizationSwitcher />

        {permissions?.can('get', 'Project') && (
          <>
            <Slash className="text-muted-foreground size-3 -rotate-24" />
            <ProjectSwitcher />
          </>
        )}
      </div>

      <div className="flex items-center gap-4">
        <PendingInvites />
        <ThemeSwitcher />
        <Separator orientation="vertical" className="h-5" />
        <ProfileButton />
      </div>
    </header>
  )
}
