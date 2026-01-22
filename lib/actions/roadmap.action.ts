// app/(root)/dashboard/roadmap/actions.ts
"use server";

import { createClient } from "@/lib/supabase/server";
import {
	detectSkillGaps,
	scoreSkillGap,
	bucketIntoPhases,
	calculateReadiness,
	buildRadarData,
} from "@/lib/helpers/roadmap.helper";
import {
	getRoleRequiredSkills,
	getUserSkills,
	getUserTargetRole,
} from "@/lib/queries/roadmap.query";
import type { RoadmapPhase, RadarSkill } from "@/types/roadmap";
import { revalidatePath } from "next/cache";

export type RoadmapActionResult = {
	roleName: string;
  isRoleReady: boolean;
	roadmap: RoadmapPhase[];
	readiness: number;
	radar: RadarSkill[];
};

export async function getRoadmapAction(): Promise<RoadmapActionResult> {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		throw new Error("Unauthorized");
	}

	const { roleId, roleName } = await getUserTargetRole(supabase, user.id);

	const [roleSkills, userSkills] = await Promise.all([
		getRoleRequiredSkills(supabase, roleId),
		getUserSkills(supabase, user.id),
	]);

	const gaps = detectSkillGaps(roleSkills, userSkills);

  const isRoleReady = gaps.length === 0

	const sorted = gaps
		.map((skill) => ({
			...skill,
			score: scoreSkillGap(skill),
		}))
		.sort((a, b) => b.score - a.score);

	return {
		roleName,
    isRoleReady,
		roadmap: bucketIntoPhases(sorted),
		readiness: calculateReadiness(roleSkills, userSkills),
		radar: buildRadarData(roleSkills, userSkills),
	};
}

export async function updateSkillProgressAction(
	skillId: string,
	completed: boolean,
) {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		throw new Error("Unauthorized");
	}

	// Get user's current role
	const role = await getUserTargetRole(supabase, user.id);

	if (!role) {
		throw new Error("Role not found");
	}

	const { error: upsertError } = await supabase
		.from("user_skill_progress")
		.upsert({
			user_id: user.id,
			role_id: role.roleId,
			skill_id: skillId,
			completed,
			completed_at: completed ? new Date() : null,
		});

	if (upsertError) {
		throw upsertError;
	}

	revalidatePath("/roadmap");

	return { success: true };
}

export async function updateSkillProficiencyAction(
  skillId: string,
  proficiency: number
) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) throw new Error("Unauthorized")

  await supabase
    .from("user_skills")
    .upsert({
      user_id: user.id,
      skill_id: skillId,
      proficiency,
    })

  revalidatePath("/roadmap")
}
