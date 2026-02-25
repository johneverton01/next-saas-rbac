'use client'

import { getProjects } from '@/http/get-projects'
import { useQuery } from '@tanstack/react-query'
import { ChevronsUpDown, Loader2 } from 'lucide-react'
import { useParams } from 'next/navigation'
import { ProjectSwitcherContent } from './project-switcher-content'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Skeleton } from './ui/skeleton'

export function ProjectSwitcher() {
  const { slug: orgSlug, project: projectSlug } = useParams<{
    slug: string
    project: string
  }>()

  const { data, isLoading } = useQuery({
    queryKey: [orgSlug, 'projects'],
    queryFn: () => getProjects(orgSlug),
    enabled: !!orgSlug,
  })

  const currentProject =
    data && projectSlug
      ? data?.projects.find((project) => project.slug === projectSlug)
      : undefined

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus-visible:ring-primary flex w-42 items-center gap-2 rounded p-1 text-sm font-medium outline-none focus-visible:ring-2">
        {isLoading ? (
          <>
            <Skeleton className="size-4 shrink-0 rounded-full" />
            <Skeleton className="h-4 w-full" />
          </>
        ) : currentProject ? (
          <>
            <Avatar className="size-4">
              {currentProject.avatarUrl && (
                <AvatarImage src={currentProject.avatarUrl} />
              )}
              <AvatarFallback />
            </Avatar>
            <span className="truncate text-left">{currentProject.name}</span>
          </>
        ) : (
          <span className="text-muted-foreground">Select project</span>
        )}
        {isLoading ? (
          <Loader2 className="text-muted-foreground ml-auto size-4 shrink-0 animate-spin" />
        ) : (
          <ChevronsUpDown className="text-muted-foreground ml-auto size-4 shrink-0" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        alignOffset={-16}
        sideOffset={12}
        className="w-50"
      >
        <ProjectSwitcherContent orgSlug={orgSlug} projects={data?.projects} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
