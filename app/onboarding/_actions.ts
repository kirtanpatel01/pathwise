"use server";

import { OnboardingFormData } from "./types";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { onboardingSchema } from "./schema";

export async function updateProfile(data: OnboardingFormData) {
  // 1. Authenticate user
  const { userId } = await auth();

  if (!userId) {
    return { success: false, error: "Unauthorized" };
  }

  // 2. Validate input
  const validation = onboardingSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, error: "Invalid input data" };
  }

  const validatedData = validation.data;
  const client = await clerkClient();

  try {
    await client.users.updateUser(userId, {
      publicMetadata: {
        onboardingComplete: true,
        institute: validatedData.institute,
        status: validatedData.status,
        graduation_year: validatedData.graduation_year,
        location: validatedData.location,
        github: validatedData.github,
        linkedin: validatedData.linkedin,
        portfolio: validatedData.portfolio,
        target_role: validatedData.target_role,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Action error:", error);
    return { success: false, error: "Failed to update profile" };
  }
}
