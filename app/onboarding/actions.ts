"use server";

import { createClient } from "@/lib/supabase/server";
import { OnboardingFormData } from "./types";
import { revalidatePath } from "next/cache";

export async function updateProfile(data: OnboardingFormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

	const { github, linkedin, portfolio, ...profileData } = data;

	const { error } = await supabase.from("profiles").upsert(
		{
			user_id: user.id,
			...profileData,
			github: `https://github.com/${github}`,
			linkedin: linkedin ? `https://linkedin.com/in/${linkedin}` : null,
			portfolio: portfolio || null,
		},
		{
			onConflict: "user_id",
		},
	);

	if (error) {
    console.error("[updateProfile] Profile update error:", error);
    throw new Error("Failed to save profile information");
  }

	revalidatePath("/dashboard");
  return { success: true };
}
