import 'fastify'

declare module 'fastify' {
  export interface FastifyRequest {
    getCurrentUserUserId(): Promise<string>
  }
}
