import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { DashboardHeader } from "./dashboard-header";
import { TargetRoleCard } from "./target-role-card";
import { ReadinessOverview } from "./readiness-overview";
import { RoadmapList } from "./roadmap-list";
import { dashboardMock } from "@/lib/data/dashboard";

export default async function page() {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		redirect("/auth/login");
	}

	const { data: profile, error } = await supabase
		.from("profiles")
		.select("onboarding_step")
		.eq("user_id", user.id)
		.maybeSingle();

	if (error) {
		console.error("Dashboard profile error:", error);
		redirect("/onboarding/profile");
	}

	if (!profile || profile.onboarding_step < 4) {
		redirect("/onboarding/profile");
	}

	return (
		<div className="space-y-6 p-6">
			<DashboardHeader name={dashboardMock.user.name} />

			<div className="grid gap-6 md:grid-cols-2">
				<TargetRoleCard
					title={dashboardMock.targetRole.title}
					isExploring={dashboardMock.targetRole.is_exploring}
				/>
				<ReadinessOverview
					completed={dashboardMock.readiness.completedSkills}
					total={dashboardMock.readiness.totalSkills}
				/>
			</div>

			<RoadmapList roadmap={dashboardMock.roadmap} />
		</div>
	);
}
