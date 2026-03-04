import { ability, getCurrentOrg } from '@/auth/auth'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { HeaderOrg } from '../../components/header-org'
import { ProjectList } from './project-list'

export default async function ProjectsPage() {
  const currentOrg = await getCurrentOrg()
  const permissions = await ability()
  return (
    <div className="space-y-4">
      <HeaderOrg />
      <main className="mx-auto w-full max-w-300 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Projects</h1>
          {permissions?.can('create', 'Project') && (
            <Button size="sm" asChild>
              <Link href={`/org/${currentOrg!}/create-project`}>
                <Plus className="size-4" />
                Create Project
              </Link>
            </Button>
          )}
        </div>

        {permissions?.can('get', 'Project') ? (
          <ProjectList />
        ) : (
          <p>You are not allowed to see organization projects.</p>
        )}
      </main>
    </div>
  )
}
