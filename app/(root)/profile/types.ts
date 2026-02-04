import z from "zod";
import { profileSchema } from "./schema";

export type ProfileFormData = z.infer<typeof profileSchema>;
