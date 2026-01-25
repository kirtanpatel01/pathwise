"use server";

import { createClient } from "@/lib/supabase/server";
import { ProfileFormData } from "./types";

export async function updateProfile(data: ProfileFormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const { error } = await supabase.from("profiles").upsert(
    {
      user_id: user.id,
      ...data,
      onboarding_step: 2,
    },
    {
      onConflict: "user_id",
    }
  );

  if (error) {
    console.error("Profile update error:", error);
    throw new Error("Failed to save profile information");
  }

  return { success: true };
}
