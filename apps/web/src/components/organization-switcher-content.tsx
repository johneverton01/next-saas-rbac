'use client'

import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
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
  return (
    <>
      <DropdownMenuGroup>
        <DropdownMenuLabel>Organizations</DropdownMenuLabel>
        {organizations &&
          organizations.map((organization) => {
            return (
              <DropdownMenuItem key={organization.id} asChild>
                <Link href={`/org/${organization.slug}`}>
                  <Avatar className="size-4">
                    {organization.avatarUrl && (
                      <AvatarImage src={organization.avatarUrl} />
                    )}
                    <AvatarFallback />
                  </Avatar>
                  <span className="line-clamp-1">{organization.name}</span>
                </Link>
              </DropdownMenuItem>
            )
          })}
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <Link href="/create-organization">
          <PlusCircle className="size-4" />
          Create new
        </Link>
      </DropdownMenuItem>
    </>
  )
}
