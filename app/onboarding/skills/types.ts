export interface DbSkill {
  id: string;
  name: string;
  category: string;
}

export interface UserSkill {
  skill_id: string;
  proficiency: "beginner" | "intermediate" | "advanced";
  evidence: string;
  skills: {
    id: string;
    name: string;
    category: string;
  };
}

export interface ProfileStatus {
  github_verification_status: string | null;
  role: string | null;
}
