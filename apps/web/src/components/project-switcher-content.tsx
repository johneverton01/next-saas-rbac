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

interface Project {
  id: string
  slug: string
  name: string
  avatarUrl: string | null
  description: string
  organizationId: string
  ownerId: string
  createdAt: string
  owner: {
    id: string
    name: string
    avatarUrl: string | null
  }
}

interface ProjectSwitcherContentProps {
  projects?: Project[]
}

export function ProjectSwitcherContent({
  projects,
}: ProjectSwitcherContentProps) {
  return (
    <>
      <DropdownMenuGroup>
        <DropdownMenuLabel>Projects</DropdownMenuLabel>
        {projects &&
          projects.map((project) => {
            return (
              <DropdownMenuItem key={project.id} asChild>
                <Link href={`/org/${project.slug}`}>
                  <Avatar className="mr-2 size-4">
                    {project.avatarUrl && (
                      <AvatarImage src={project.avatarUrl} />
                    )}
                    <AvatarFallback />
                  </Avatar>
                  <span className="line-clamp-1">{project.name}</span>
                </Link>
              </DropdownMenuItem>
            )
          })}
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <Link href="/create-organization">
          <PlusCircle className="mr-2 size-4" />
          Create new
        </Link>
      </DropdownMenuItem>
    </>
  )
}
