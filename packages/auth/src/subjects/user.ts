import { z } from 'zod';

export const userSubjectSchema = z.tuple([
  z.enum(['manage', 'get', 'update', 'delete', 'invite']),
  z.literal('User')
]);

export type UserSubject = z.infer<typeof userSubjectSchema>;