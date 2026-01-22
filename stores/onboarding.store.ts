import { Role } from "@/lib/validations/role.schema";
import { Skill } from "@/lib/validations/skills.schema";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type OnboardingState = {
	step: number;
	maxStepCompleted: number;

	profile: {
		full_name?: string;
		institute?: string;
		status?: "student" | "graduate" | "professional";
		graduation_year?: number;
		location?: string;
	};

	roles: Role[];
	rolesLoaded: boolean;

	hydrated: boolean;

	targetRole?: string;

	userSkills: {
		skill_id: string;
		proficiency: number;
		used_in_project: boolean;
	}[];

	skillsMaster: Skill[];
	skillsLoaded: boolean;

	links: {
		github?: string;
		linkedin?: string;
		portfolio?: string;
	};

	setStep: (step: number) => void;
	setMaxStepCompleted: (step: number) => void;
	setProfile: (data: Partial<OnboardingState["profile"]>) => void;
	setHydrated: () => void;
	setRoles: (roles: Role[]) => void;
	setTargetRole: (roleId: string) => void;
	setSkillsMaster: (skills: Skill[]) => void;
	setUserSkills: (skills: OnboardingState["userSkills"]) => void;
	setLinks: (links: OnboardingState["links"]) => void;
	reset: () => void;
};

export const useOnboardingStore = create<OnboardingState>()(
	persist(
		(set) => ({
			step: 1,
			maxStepCompleted: 1,
			profile: {},
			hydrated: false,

			roles: [],
			rolesLoaded: false,

			userSkills: [],

			skillsMaster: [],
			skillsLoaded: false,
			links: {},

			setStep: (step) => set({ step }),
			setMaxStepCompleted: (step: number) =>
				set((state) => ({
					maxStepCompleted: Math.max(state.maxStepCompleted, step),
				})),
			setProfile: (data) =>
				set((state) => ({ profile: { ...state.profile, ...data } })),
			setHydrated: () => set({ hydrated: true }),
			setRoles: (roles: Role[]) =>
				set({
					roles,
					rolesLoaded: true,
				}),

			setTargetRole: (roleId) => set({ targetRole: roleId }),
			setSkillsMaster: (skills) =>
				set({ skillsMaster: skills, skillsLoaded: true }),

			setUserSkills: (skills) => set({ userSkills: skills }),
			setLinks: (links) => set({ links }),
			reset: () =>
				set({
					step: 1,
					profile: {},
					targetRole: undefined,
					userSkills: [],
					links: {},
				}),
		}),
		{ name: "onboarding-store" },
	),
);
