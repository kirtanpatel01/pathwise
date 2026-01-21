import { z } from "zod";

export const linksSchema = z.object({
  github: z.string().url("Enter a valid GitHub URL"),
  linkedin: z.string().url("Enter a valid LinkedIn URL").optional().or(z.literal("")),
  portfolio: z.string().url("Enter a valid portfolio URL").optional().or(z.literal("")),
});

export type LinksFormData = z.infer<typeof linksSchema>;
