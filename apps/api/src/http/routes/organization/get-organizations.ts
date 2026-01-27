import { authMiddleware } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { RolesSchema } from '@saas/auth/src/roles'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

export function getOrganizations(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(authMiddleware)
    .get(
      '/organizations',
      {
        schema: {
          tags: ['Organizations'],
          summary: 'Get organizations where user is member',
          security: [{ bearerAuth: [] }],
          response: {
            200: z.object({
              organization: z.array(
                z.object({
                  id: z.uuid(),
                  name: z.string(),
                  slug: z.string(),
                  avatarUrl: z.url().nullable(),
                  role: RolesSchema,
                })
              ),
            }),
          },
        },
      },
      async (request) => {
        const userId = await request.getCurrentUserUserId()

        const organization = await prisma.organization.findMany({
          select: {
            id: true,
            name: true,
            slug: true,
            avatarUrl: true,
            members: {
              select: {
                role: true,
              },
              where: {
                userId,
              },
            },
          },
          where: {
            members: {
              some: {
                userId,
              },
            },
          },
        })

        const organizationsWithUserRole = organization.map(
          ({ members, ...org }) => {
            return {
              ...org,
              role: members[0]?.role,
            }
          }
        )

        return {
          organization: organizationsWithUserRole,
        }
      }
    )
}
