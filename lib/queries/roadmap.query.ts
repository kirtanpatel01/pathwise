// lib/queries/roadmap.query.ts
import { SupabaseClient } from "@supabase/supabase-js"

export async function getUserTargetRole(
  supabase: SupabaseClient,
  userId: string
) {
  const { data, error } = await supabase
    .from("user_target_role")
    .select(`
      role_id,
      roles_master (
        role_name
      )
    `)
    .eq("user_id", userId)
    .single()

  if (error) throw error

  const role = Array.isArray(data.roles_master)
    ? data.roles_master[0]
    : data.roles_master

  return {
    roleId: data.role_id,
    roleName: role?.role_name ?? "Unknown Role",
  }
}

export async function getRoleRequiredSkills(
  supabase: SupabaseClient,
  roleId: string
) {
  const { data, error } = await supabase
    .from("role_required_skills")
    .select(`
      skill_id,
      priority,
      min_proficiency,
      skills_master (
        skill_name,
        category
      )
    `)
    .eq("role_id", roleId)

  if (error) throw error

  return data.map((r) => {
    const skill = Array.isArray(r.skills_master)
      ? r.skills_master[0]
      : r.skills_master

    return {
      skillId: r.skill_id,
      skillName: skill?.skill_name ?? "Unknown Skill",
      category: skill?.category ?? "other",
      priority: r.priority,
      minProficiency: r.min_proficiency,
    }
  })
}

export async function getUserSkills(
  supabase: SupabaseClient,
  userId: string
) {
  const { data, error } = await supabase
    .from("user_skills")
    .select("skill_id, proficiency, used_in_project")
    .eq("user_id", userId)

  if (error) throw error

  return data.map(s => ({
    skillId: s.skill_id,
    proficiency: s.proficiency,
    usedInProject: s.used_in_project,
  }))
}
