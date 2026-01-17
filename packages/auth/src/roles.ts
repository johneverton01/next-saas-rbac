import z from "zod";

export const RolesSchema = z.enum([
  "ADMIN",
  "MEMBER",
  "BILLING",
]);

export type Role = z.infer<typeof RolesSchema>;