// app/(root)/dashboard/roadmap/actions.ts
"use server"

import { createClient } from "@/lib/supabase/server"
import {
  detectSkillGaps,
  scoreSkillGap,
  bucketIntoPhases,
  calculateReadiness,
  buildRadarData,
} from "@/lib/helpers/roadmap.helper"
import {
  getRoleRequiredSkills,
  getUserSkills,
  getUserTargetRole,
} from "@/lib/queries/roadmap.query"
import type { RoadmapPhase, RadarSkill } from "@/types/roadmap"

export type RoadmapActionResult = {
  roleName: string
  roadmap: RoadmapPhase[]
  readiness: number
  radar: RadarSkill[]
}

export async function getRoadmapAction(): Promise<RoadmapActionResult> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  const { roleId, roleName } = await getUserTargetRole(
    supabase,
    user.id
  )

  const [roleSkills, userSkills] = await Promise.all([
    getRoleRequiredSkills(supabase, roleId),
    getUserSkills(supabase, user.id),
  ])

  const gaps = detectSkillGaps(roleSkills, userSkills)

  const sorted = gaps
    .map(skill => ({
      ...skill,
      score: scoreSkillGap(skill),
    }))
    .sort((a, b) => b.score - a.score)

  return {
    roleName,
    roadmap: bucketIntoPhases(sorted),
    readiness: calculateReadiness(roleSkills, userSkills),
    radar: buildRadarData(roleSkills, userSkills),
  }
}

export async function updateSkillProgressAction(
  skillId: string,
  completed: boolean
) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  // Get user's current role
  const { data: role, error: roleError } = await supabase
    .from("user_target_role")
    .select("role_id")
    .eq("user_id", user.id)
    .single()

  if (roleError || !role) {
    throw new Error("Role not found")
  }

  const { error: upsertError } = await supabase
    .from("user_skill_progress")
    .upsert({
      user_id: user.id,
      role_id: role.role_id,
      skill_id: skillId,
      completed,
      completed_at: completed ? new Date() : null,
    })

  if (upsertError) {
    throw upsertError
  }

  return { success: true }
}
