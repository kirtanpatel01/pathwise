import { z } from "zod";

export const linksSchema = z.object({
  github: z
    .string()
    .min(1, "GitHub username is required")
    .regex(/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i, "Invalid GitHub username"),
  linkedin: z
    .string()
    .regex(/^[a-z0-9-]+$/i, "Invalid LinkedIn username")
    .optional()
    .or(z.literal("")),
  portfolio: z.string().url("Enter a valid portfolio URL").optional().or(z.literal("")),
});

export type LinksFormData = z.infer<typeof linksSchema>;
