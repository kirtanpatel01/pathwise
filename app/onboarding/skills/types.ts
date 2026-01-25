export type RuntimeSkill = {
  skill_name: string;
  category: string;
  priority: number;
  min_proficiency: number;
};

export type UserSkillState = {
  skill_name: string;
  proficiency: number;
  used_in_project: boolean;
};

export type Skill = {
  id: string;
  skill_name: string;
  category: string;
};
