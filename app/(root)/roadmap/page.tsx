// app/(root)/dashboard/roadmap/page.tsx
import { PhaseAccordion } from "./phase-accordion";
import { ReadinessOverview } from "./readiness-overview";
import RoadmapHeader from "./RoadmapHeader";
import { getRoadmapAction } from "@/lib/actions/roadmap.action";
import { SkillRadar } from "./skill-radar";
import { RoadmapPhase } from "@/types/roadmap";

export default async function RoadmapPage() {
	const { roadmap, readiness, radar, roleName } = await getRoadmapAction();


	return (
		<div className="mx-auto max-w-5xl space-y-8 px-6 py-8">
			<RoadmapHeader roleName={roleName} />

			<ReadinessOverview value={readiness} />
			<SkillRadar data={radar} />

			{roadmap &&
				roadmap.map((phase: RoadmapPhase) => (
					<PhaseAccordion key={phase.phase} {...phase} />
				))}
		</div>
	);
}
