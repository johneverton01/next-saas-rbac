import { ability } from '@/auth/auth'
import { Header } from '@/components/header'
import { Separator } from '@/components/ui/separator'
import { redirect } from 'next/navigation'
import { ProjectForm } from './project-form'

export default async function CreateProjectPage() {
  const permissions = await ability()

  if (permissions?.cannot('create', 'Project')) {
    redirect('/')
  }

  return (
    <div className="space-y-4">
      <Header />
      <Separator />
      <h1 className="text-2xl font-bold">Create project</h1>
      <ProjectForm />
    </div>
  )
}
