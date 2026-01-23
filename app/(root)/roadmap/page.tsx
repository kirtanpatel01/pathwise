// app/(root)/dashboard/roadmap/page.tsx
import { PhaseAccordion } from "./phase-accordion";
import { ReadinessOverview } from "./readiness-overview";
import RoadmapHeader from "./RoadmapHeader";
import { getRoadmapAction } from "@/lib/actions/roadmap.action";
import { SkillRadar } from "./skill-radar";
import { RoadmapPhase } from "@/types/roadmap";

export default async function RoadmapPage() {
	const { roadmap, readiness, radar, roleName, isRoleReady } =
		await getRoadmapAction();

	return (
		<div className="min-h-screen space-y-8 p-6">
			<RoadmapHeader roleName={roleName} isRoleReady={isRoleReady} />

			<ReadinessOverview value={readiness} />
			<SkillRadar data={radar} />

			{roadmap &&
				roadmap.map((phase: RoadmapPhase) => (
					<PhaseAccordion key={phase.phase} {...phase} />
				))}
		</div>
	);
}
