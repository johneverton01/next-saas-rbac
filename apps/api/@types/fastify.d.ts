import 'fastify'

import { Member, Organization } from '@/prisma/client'

declare module 'fastify' {
  export interface FastifyRequest {
    getCurrentUserUserId(): Promise<string>
    getUserMemberships(
      slug: string
    ): Promise<{ organization: Organization; membership: Member }>
  }
}
