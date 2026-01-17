import { z } from 'zod';
import { RolesSchema } from '../roles.js';

export const userSchema = z.object({
  id: z.string(),
  role: RolesSchema
})

export type User = z.infer<typeof userSchema>;