'use server'

import { revalidatePath } from 'next/cache'

export async function navigateToOrganization(slug: string) {
  revalidatePath(`/org/${slug}`)
}

export async function navigateToCreateOrganization() {
  revalidatePath('/create-organization')
  revalidatePath('/')
}
