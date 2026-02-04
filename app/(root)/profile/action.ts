'use server'

import { createClient } from "@/lib/supabase/server";
import { ProfileFormData } from "./types";
import { revalidatePath } from "next/cache";

export async function getProfile() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Unauthenticated!" };
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user?.id)
    .single();

  if (error) {
    console.error(error);
    return { success: false, error: error.message };
  }

  return { success: true, profile };
}

export async function updateProfile(data: ProfileFormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Unauthenticated!" }
  }

  const { github, linkedin, portfolio, ...profileData } = data;

  const { error } = await supabase.from("profiles").update(
    {
      ...profileData,
      github: `https://github.com/${github}`,
      linkedin: linkedin ? `https://linkedin.com/in/${linkedin}` : null,
      portfolio: portfolio || null,
    },
  ).eq("user_id", user.id);

  if (error) {
    console.error("Profile update error:", error);
    return { success: false, error: error.message }
  }

  revalidatePath("/profile");
  return { success: true };
}