// lib/helpers/roadmap.helper.ts

import {
	RoleRequiredSkill,
	UserSkill,
	SkillGap,
	RoadmapPhase,
	RadarSkill,
} from "@/types/roadmap";

export function detectSkillGaps(
	roleSkills: RoleRequiredSkill[],
	userSkills: UserSkill[],
): SkillGap[] {
	// Build fast lookup for user skills
	const userSkillMap = new Map<string, UserSkill>();

	for (const us of userSkills) {
		userSkillMap.set(us.skillId, us);
	}

	const gaps: SkillGap[] = [];

	for (const rs of roleSkills) {
		const userSkill = userSkillMap.get(rs.skillId);

		// Case 1: Skill completely missing
		if (!userSkill) {
			gaps.push({
				skillId: rs.skillId,
				skillName: rs.skillName,
				category: rs.category,
				gapType: "missing",
				requiredProficiency: rs.minProficiency,
				currentProficiency: null,
				priority: rs.priority,
				usedInProject: false,
			});
			continue;
		}

		// Case 2: Skill present but weak
		if (userSkill.proficiency < rs.minProficiency) {
			gaps.push({
				skillId: rs.skillId,
				skillName: rs.skillName,
				category: rs.category,
				gapType: "weak",
				requiredProficiency: rs.minProficiency,
				currentProficiency: userSkill.proficiency,
				priority: rs.priority,
				usedInProject: userSkill.usedInProject,
			});
			continue;
		}

		// Case 3: Skill OK → ignore for roadmap
	}

	return gaps;
}

export function scoreSkillGap(skill: SkillGap): number {
	let score = 0;

	// Priority weight
	score += skill.priority === 1 ? 100 : 50;

	// Gap severity
	score += skill.gapType === "missing" ? 40 : 20;

	// Role expectation
	score += skill.requiredProficiency * 5;

	// Real-world usage bonus (reduces urgency)
	if (skill.usedInProject) {
		score -= 10;
	}

	return score;
}

// export const sortedSkills = gaps
//   .map(skill => ({
//     ...skill,
//     score: scoreSkillGap(skill),
//   }))
//   .sort((a, b) => b.score - a.score)

// lib/roadmap/bucketIntoPhases.ts

export function bucketIntoPhases(sortedSkills: SkillGap[]): RoadmapPhase[] {
	const phase1: SkillGap[] = [];
	const phase2: SkillGap[] = [];
	const phase3: SkillGap[] = [];
	const phase4: SkillGap[] = [];

	for (const skill of sortedSkills) {
		if (skill.priority === 1 && skill.gapType === "missing") {
			phase1.push(skill);
		} else if (skill.priority === 1 && skill.gapType === "weak") {
			phase2.push(skill);
		} else if (skill.priority === 2) {
			phase3.push(skill);
		} else {
			phase4.push(skill);
		}
	}

	const limit = (arr: SkillGap[]) => arr.slice(0, 6);

	return [
		{
			phase: 1,
			title: "Foundations",
			goal: "Build mandatory core skills for your role",
			skills: limit(phase1),
		},
		{
			phase: 2,
			title: "Core Strengthening",
			goal: "Raise proficiency to role-ready level",
			skills: limit(phase2),
		},
		{
			phase: 3,
			title: "Enhancers",
			goal: "Differentiate yourself from average candidates",
			skills: limit(phase3),
		},
		{
			phase: 4,
			title: "Optional Polish",
			goal: "Nice-to-have skills and refinements",
			skills: limit(phase4),
		},
	].filter((phase) => phase.skills.length > 0);
}

// import { detectSkillGaps } from "./detectSkillGaps"
// import { scoreSkillGap } from "./scoreSkillGap"
// import { bucketIntoPhases } from "./bucketIntoPhases"

// const gaps = detectSkillGaps(roleSkills, userSkills)

// const sorted = gaps
//   .map(s => ({ ...s, score: scoreSkillGap(s) }))
//   .sort((a, b) => b.score - a.score)

// const roadmap = bucketIntoPhases(sorted)

// lib/roadmap/calculateReadiness.ts

export function calculateReadiness(
	roleSkills: RoleRequiredSkill[],
	userSkills: UserSkill[],
) {
	const userMap = new Map(userSkills.map((s) => [s.skillId, s]));

	let met = 0;

	for (const rs of roleSkills) {
		const us = userMap.get(rs.skillId);
		if (!us) continue;

		if (us.proficiency >= rs.minProficiency) {
			met += us.usedInProject ? 1.1 : 1;
		}
	}

	const readiness = (met / roleSkills.length) * 100;

	return Math.min(Math.round(readiness), 100);
}

export function buildRadarData(
	roleSkills: RoleRequiredSkill[],
	userSkills: UserSkill[],
): RadarSkill[] {
	const userMap = new Map(userSkills.map((s) => [s.skillId, s]));

	return roleSkills.slice(0, 6).map((rs) => {
		const us = userMap.get(rs.skillId);

		return {
			skill: rs.skillName,
			required: rs.minProficiency,
			current: us?.proficiency ?? 0,
		};
	});
}
