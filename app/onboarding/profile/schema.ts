import { z } from "zod";

const currentYear = new Date().getFullYear();

export const profileSchema = z.object({
	full_name: z.string().min(2, "Name is too short"),

	institute: z.string().min(2, "Institute is required"),

	status: z.enum(["student", "graduate", "professional"]),

	graduation_year: z
		.number()
		.min(currentYear)
		.max(currentYear + 6)
		.optional(),

	location: z.string().min(2, "Location is required"),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
