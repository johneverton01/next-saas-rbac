import { HeaderOrg } from '../../../components/header-org'

export default async function ProjectPage() {
  return (
    <div className="space-y-4">
      <HeaderOrg />
      <main className="mx-auto w-full max-w-300">
        <h1 className="text-2xl font-bold">Project</h1>
      </main>
    </div>
  )
}
