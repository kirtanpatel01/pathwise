import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RoadmapItem } from "./roadmap-item";

import { DashboardRoadmapItem } from "@/types/dashboard";

export function RoadmapList({
	roadmap,
}: {
	roadmap: DashboardRoadmapItem[];
}) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Your Learning Roadmap</CardTitle>
			</CardHeader>
			<CardContent className="space-y-3">
				{roadmap.map((item) => (
					<RoadmapItem
						key={item.id}
						index={item.order_index}
						skill={item.skill}
						status={item.status}
					/>
				))}
			</CardContent>
		</Card>
	);
}
