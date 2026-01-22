// types/roadmap.ts

export type RoleRequiredSkill = {
  skillId: string
  skillName: string
  category: string
  priority: 1 | 2
  minProficiency: number
}

export type UserSkill = {
  skillId: string
  proficiency: number
  usedInProject: boolean
}

export type SkillGapType = "missing" | "weak" | "ok"

export type SkillGap = {
  skillId: string
  skillName: string
  category: string
  gapType: SkillGapType
  requiredProficiency: number
  currentProficiency: number | null
  priority: 1 | 2
  usedInProject: boolean
}

export type RoadmapPhase = {
  phase: number
  title: string
  goal: string
  skills: SkillGap[]
}

export type RadarSkill = {
  skill: string
  required: number
  current: number
}

export type PhaseAccordionProps = {
  phase: number
  title: string
  goal: string
  skills: SkillGap[]
}

export type SkillCardProps = SkillGap & {
  completed?: boolean
}
