'use server'

// import { createOrganization } from '@/http/create-organization'
import { z } from 'zod'

const ProjectSchema = z.object({
  name: z.string().min(4, { message: 'Please include at least 4 characters' }),
  description: z.string(),
})

export async function createProjectAction(data: FormData) {
  const result = ProjectSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return {
      success: false,
      message: undefined,
      errors,
    }
  }

  const { name, description } = result.data

  // try {
  //   await createOrganization({
  //     name,
  //     domain,
  //     shouldAttachUsersByDomain,
  //   })
  // } catch (error) {
  //   if (error instanceof HTTPError) {
  //     const { message } = await error.response.json()

  //     return {
  //       success: false,
  //       message,
  //       errors: undefined,
  //     }
  //   }

  //   console.error(error)

  //   return {
  //     success: false,
  //     message: 'Unexpected error, try again in a few minutes.',
  //     errors: undefined,
  //   }
  // }

  return {
    success: true,
    message: 'Successfully saved the project',
    errors: undefined,
  }
}
