import { z } from 'zod';
import { projectSchema } from '../models/project';

export const projectSubjectSchema = z.tuple([
  z.enum(['manage', 'get', 'create', 'update', 'delete']),
  z.union([z.literal('Project'), projectSchema])
]);

export type ProjectSubject = z.infer<typeof projectSubjectSchema>;
