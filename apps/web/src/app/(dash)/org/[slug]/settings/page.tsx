import { OrganizationForm } from '@/app/(dash)/create-organization/organization-form'
import { ability } from '@/auth/auth'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { HeaderOrg } from '../../components/header-org'
import { ShutdownOrganizationButton } from './shutdown-organization-button'

export default async function SettingsPage() {
  const permissions = await ability()

  const canUpdateOrganization = permissions?.can('update', 'Organization')
  const canGetBilling = permissions?.can('get', 'Billing')
  const canShutdownOrganization = permissions?.can('delete', 'Organization')
  return (
    <div className="space-y-4">
      <HeaderOrg />
      <main className="mx-auto w-full max-w-300 space-y-4">
        <h1 className="text-2xl font-bold">Settings & Billing</h1>

        <div className="space-y-4">
          {canUpdateOrganization && (
            <Card>
              <CardHeader>
                <CardTitle>Organization settings</CardTitle>
                <CardDescription>
                  Update your organization details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <OrganizationForm />
              </CardContent>
            </Card>
          )}
          {canGetBilling && <div>Billing information</div>}
          {canShutdownOrganization && (
            <Card>
              <CardHeader>
                <CardTitle>Shutdown organization</CardTitle>
                <CardDescription>
                  This will delete all organization data including all projects.
                  You cannot undo this action.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ShutdownOrganizationButton />
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
