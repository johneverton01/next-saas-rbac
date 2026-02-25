import { Header } from '@/components/header'
import { Separator } from '@/components/ui/separator'
import { OrganizationForm } from './organization-form'

export default function CreateOrganizationPage() {
  return (
    <div className="space-y-4 py-4">
      <Header />
      <Separator className="my-4" />
      <main className="mx-auto w-full max-w-300 space-y-4">
        <OrganizationForm />
      </main>
    </div>
  )
}
