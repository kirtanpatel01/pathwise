"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useOnboardingStore } from "@/stores/onboarding.store";
import Stepper from "@/components/onboarding/stepper";
import { ModeToggle } from "@/components/mode-toggle";
import { OnboardingArrows } from "@/components/onboarding/onboarding-arrows";
import { usePathname } from "next/navigation";

export default function OnboardingLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const supabase = createClient();
	const {
		setProfile,
		setStep,
		setMaxStepCompleted,
		setHydrated,
		setRoles,
		rolesLoaded,
		skillsLoaded,
		setTargetRole,
		setSkillsMaster,
		setUserSkills,
	} = useOnboardingStore();

	const pathname = usePathname();
	const currentStep = getStepFromPath(pathname);

	useEffect(() => {
		async function hydrate() {
			const {
				data: { user },
			} = await supabase.auth.getUser();

			if (!user) {
				setHydrated();
				return;
			}

			if (!rolesLoaded) {
				const { data: roles } = await supabase
					.from("roles_master")
					.select("id, role_name");

				setRoles(roles ?? []);
			}

			if (!skillsLoaded) {
				const { data: skills } = await supabase
					.from("skills_master")
					.select("id, skill_name, category");

				setSkillsMaster(skills ?? []);
			}

			const { data: userSkills } = await supabase
				.from("user_skills")
				.select("skill_id, proficiency, used_in_project")
				.eq("user_id", user.id);

			setUserSkills(userSkills ?? []);

			const { data } = await supabase
				.from("user_target_role")
				.select("role_id")
				.eq("user_id", user.id)
				.maybeSingle();

			const { data: profile, error } = await supabase
				.from("profiles")
				.select("*")
				.eq("user_id", user.id)
				.maybeSingle();

			if (error) {
				console.error("Hydration error:", error);
				return;
			}

			if (!profile) return;

			// hydrate Zustand
			setProfile({
				full_name: profile.full_name,
				institute: profile.institute,
				status: profile.status,
				graduation_year: profile.graduation_year,
				location: profile.location,
			});

			setTargetRole(data?.role_id ?? "");

			setStep(currentStep);
			setMaxStepCompleted(profile.onboarding_step ?? 1);
			setHydrated();
		}

		hydrate();
	}, []);

	const hydrated = useOnboardingStore((s) => s.hydrated);

	if (!hydrated) {
		return (
			<div className="h-screen flex items-center justify-center">
				Loading…
			</div>
		);
	}

	return (
		<div className="flex items-center justify-center p-4">
			<ModeToggle className="absolute top-4 right-4" />
			<div className="relative max-w-3xl mx-auto px-4 py-10 space-y-8">
				<Stepper />
				{children}
				<OnboardingArrows />
			</div>
		</div>
	);
}

function getStepFromPath(path: string) {
	if (path.includes("/profile")) return 1;
	if (path.includes("/role")) return 2;
	if (path.includes("/skills")) return 3;
	if (path.includes("/links")) return 4;
	return 1;
}
