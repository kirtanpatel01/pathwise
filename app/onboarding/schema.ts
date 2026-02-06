import { z } from "zod";

const currentYear = new Date().getFullYear();

export const onboardingSchema = z.object({
	institute: z.string().min(2, "Institute is required"),

	status: z.enum(["student", "graduate", "professional"]),

	graduation_year: z
		.number()
		.min(currentYear)
		.max(currentYear + 6)
		.optional(),

	location: z.string().min(2, "Location is required"),

	github: z
		.string()
		.min(1, "GitHub username is required")
		.regex(
			/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i,
			"Invalid GitHub username",
		),

	linkedin: z
		.string()
		.regex(/^[a-z0-9-]+$/i, "Invalid LinkedIn username")
		.optional()
		.or(z.literal("")),

	portfolio: z
		.string()
		.url("Enter a valid portfolio URL")
		.optional()
		.or(z.literal("")),

	target_role: z.string().min(2, "Target role is required"),
});
