"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useOnboardingStore } from "@/stores/onboarding.store";
import Stepper from "@/components/onboarding/stepper";
import { ModeToggle } from "@/components/mode-toggle";
import { OnboardingArrows } from "@/components/onboarding/onboarding-arrows";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

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

			// roles
			if (!rolesLoaded) {
				const { data: roles } = await supabase
					.from("roles_master")
					.select("id, role_name");

				setRoles(roles ?? []);
			}

			// skills
			if (!skillsLoaded) {
				const { data: skills } = await supabase
					.from("skills_master")
					.select("id, skill_name, category");

				setSkillsMaster(skills ?? []);
			}

			// user skills (optional)
			const { data: userSkills } = await supabase
				.from("user_skills")
				.select("skill_id, proficiency, used_in_project")
				.eq("user_id", user.id);

			setUserSkills(userSkills ?? []);

			// target role (optional)
			const { data: targetRole } = await supabase
				.from("user_target_role")
				.select("role_id")
				.eq("user_id", user.id)
				.maybeSingle();

			setTargetRole(targetRole?.role_id);

			// profile (OPTIONAL)
			const { data: profile } = await supabase
				.from("profiles")
				.select("*")
				.eq("user_id", user.id)
				.maybeSingle();

			if (profile) {
				setProfile({
					full_name: profile.full_name,
					institute: profile.institute,
					status: profile.status,
					graduation_year: profile.graduation_year,
					location: profile.location,
				});

				setMaxStepCompleted(profile.onboarding_step ?? 1);
			}

			// 👇 ALWAYS CALL THIS
			setStep(currentStep);
			setHydrated();
		}

		hydrate();
	}, []);

	const hydrated = useOnboardingStore((s) => s.hydrated);

	console.log(hydrated);

	if (!hydrated) {
		return (
			<div className="h-screen flex items-center justify-center">
				Loading…
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-background">
			<ModeToggle className="fixed top-2.5 sm:top-4 right-2 sm:right-4 z-50" />

			<div
				className={cn(
					// mobile spacing for fixed header + footer
					"pt-14 sm:pt-20 pb-0 sm:pb-24 px-0 sm:px-4",
					// desktop normal spacing
					"lg:pt-6 lg:pb-6",
				)}
			>
				<div className="w-full max-w-3xl mx-auto flex flex-col gap-6">
					<Stepper />

					<div className="relative">
						{children}
						<OnboardingArrows />
					</div>
				</div>
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
