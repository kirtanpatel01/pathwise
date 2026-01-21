import { z } from "zod";

export const roleSchema = z.object({
  role_id: z.string().uuid("Select a role"),
});

export type RoleFormData = z.infer<typeof roleSchema>;

export type Role = {
  id: string;
  role_name: string;
};
