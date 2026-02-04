import z from "zod";
import { onboardingSchema } from "./schema";

export type OnboardingFormData = z.infer<typeof onboardingSchema>;
