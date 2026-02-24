import { Sheet, SheetContent, SheetHeader } from '@/components/ui/sheet'
import { OrganizationForm } from '../../create-organization/organization-form'

export default function CreateOrganization() {
  return (
    <Sheet defaultOpen>
      <SheetContent>
        <SheetHeader>Create organization</SheetHeader>

        <div className="p-4">
          <OrganizationForm />
        </div>
      </SheetContent>
    </Sheet>
  )
}
