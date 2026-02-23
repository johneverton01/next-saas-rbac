'use client'

import {
  navigateToCreateOrganization,
  navigateToOrganization,
} from '@/actions/navigation'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from './ui/dropdown-menu'

interface Organization {
  id: string
  slug: string
  name: string
  avatarUrl: string | null
}

interface OrganizationSwitcherContentProps {
  organizations: Organization[]
}

export function OrganizationSwitcherContent({
  organizations,
}: OrganizationSwitcherContentProps) {
  const router = useRouter()
  const [, startTransition] = useTransition()

  const handleSelectOrg = (slug: string) => {
    startTransition(async () => {
      await navigateToOrganization(slug)
      router.push(`/org/${slug}`)
    })
  }

  const handleCreateNew = () => {
    startTransition(async () => {
      await navigateToCreateOrganization()
      router.push('/create-organization')
    })
  }

  return (
    <>
      <DropdownMenuGroup>
        <DropdownMenuLabel>Organizations</DropdownMenuLabel>
        {organizations ? (
          organizations.map((organization) => {
            return (
              <DropdownMenuItem
                key={organization.id}
                onSelect={() => handleSelectOrg(organization.slug)}
              >
                <Avatar className="mr-2 size-4">
                  {organization.avatarUrl && (
                    <AvatarImage src={organization.avatarUrl} />
                  )}
                  <AvatarFallback />
                </Avatar>
                <span className="line-clamp-1">{organization.name}</span>
              </DropdownMenuItem>
            )
          })
        ) : (
          <DropdownMenuItem asChild>
            <Link href="/create-organization">
              <PlusCircle className="mr-2 size-4" />
              Create new
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem onSelect={handleCreateNew}>
        <PlusCircle className="mr-2 size-4" />
        Create new
      </DropdownMenuItem>
    </>
  )
}
