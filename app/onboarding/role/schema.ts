import { z } from "zod";

export const roleSchema = z.object({
  role_id: z.string().min(1, "Select a role"),
});

export type RoleFormData = z.infer<typeof roleSchema>;

export type Role = {
  id: string;
  title: string;
};
