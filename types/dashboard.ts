export type RoadmapStatus = "pending" | "in-progress" | "done";

export type DashboardRoadmapItem = {
	id: string;
	skill: string;
	order_index: number;
	status: RoadmapStatus;
};
