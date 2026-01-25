"use server";

import { createClient } from "@/lib/supabase/server";
import { LinksFormData } from "./types";

export async function updateUserLinks(data: LinksFormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  // Validate on server
  const { github, linkedin, portfolio } = await import("./schema").then((m) =>
    m.linksSchema.parseAsync(data)
  );

  const { error } = await supabase.from("user_links").upsert(
    {
      user_id: user.id,
      github: `https://github.com/${github}`,
      linkedin: linkedin ? `https://linkedin.com/in/${linkedin}` : null,
      portfolio: portfolio || null,
    },
    { onConflict: "user_id" }
  );

  if (error) {
    console.error("Links update error:", error);
    throw new Error("Failed to save links");
  }

  return { success: true };
}

export async function completeOnboarding() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const { error } = await supabase
    .from("profiles")
    .update({ onboarding_completed: true, onboarding_step: 4 })
    .eq("user_id", user.id);

  if (error) {
    console.error("Onboarding completion error:", error);
    throw new Error("Failed to complete onboarding");
  }

  return { success: true };
}
