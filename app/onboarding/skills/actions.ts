"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { DbSkill, UserSkill } from "./types";

export async function getAvailableSkills(): Promise<DbSkill[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("skills")
    .select("id, name, category")
    .order("name");
  
  return data || [];
}

export async function getUserProfileAndSkills() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return { status: "unauthorized", skills: [], role: null };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("github_verification_status, role")
    .eq("user_id", user.id)
    .single();

  const status = profile?.github_verification_status || "idle";
  const role = profile?.role || null;
  let skills: UserSkill[] = [];

  if (status === "completed") {
    const { data } = await supabase
      .from("user_skills")
      .select(`
        *,
        skills ( id, name, category )
      `)
      .eq("user_id", user.id);
    
    // Cast to UserSkill[] for type safety, asserting the structure matches
    skills = (data as unknown as UserSkill[]) || [];
  }

  return { status, role, skills };
}

export async function updateUserRole(role: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("profiles")
    .update({ role })
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);
  revalidatePath("/onboarding/skills");
}

export async function deleteUserSkill(skillId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("user_skills")
    .delete()
    .eq("user_id", user.id)
    .eq("skill_id", skillId);

  if (error) throw new Error(error.message);
  revalidatePath("/onboarding/skills");
}

export async function addUserSkill(skill: DbSkill) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("user_skills")
    .insert({
      user_id: user.id,
      skill_id: skill.id,
      proficiency: "intermediate",
      evidence: "Manual entry"
    });

  if (error) throw new Error(error.message);
  revalidatePath("/onboarding/skills");
}

export async function updateUserSkill(skillId: string, proficiency: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("user_skills")
    .update({ proficiency })
    .eq("user_id", user.id)
    .eq("skill_id", skillId);

  if (error) throw new Error(error.message);
  revalidatePath("/onboarding/skills");
}
