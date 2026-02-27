'use server'

import { getCurrentOrg } from '@/auth/auth'
import { shutdownOrganization } from '@/http/shutdown-organization'
import { redirect } from 'next/navigation'

export async function shutdownOrganizationAction() {
  const currentOrg = await getCurrentOrg()

  await shutdownOrganization({ org: currentOrg! })

  redirect('/')
}
