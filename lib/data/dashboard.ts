import { DashboardRoadmapItem } from "@/types/dashboard";

export const dashboardMock: {
	user: {
		id: string;
		name: string;
	};
	targetRole: {
		role_id: string;
		title: string;
		is_exploring: boolean;
	};
	readiness: {
		totalSkills: number;
		completedSkills: number;
	};
	roadmap: DashboardRoadmapItem[];
} = {
	user: {
		id: "user-uuid",
		name: "Kirtan Patel",
	},
	targetRole: {
		role_id: "backend-dev-id",
		title: "Back-end Developer",
		is_exploring: false,
	},
	readiness: {
		totalSkills: 12,
		completedSkills: 5,
	},
	roadmap: [
		{
			id: "1",
			skill: "Programming Fundamentals",
			order_index: 1,
			status: "done",
		},
		{
			id: "2",
			skill: "Data Structures & Algorithms",
			order_index: 2,
			status: "in-progress",
		},
		{
			id: "3",
			skill: "SQL & Relational Databases",
			order_index: 3,
			status: "pending",
		},
	],
};
