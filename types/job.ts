export type JobRole = "frontend" | "backend" | "fullstack";

export interface Job {
	id: string;
	title: string;
	company: string;
	location: string;
	employmentType: string;
	isRemote: boolean;
	description: string;
	applyLinks: {
		publisher: string;
		url: string;
		isDirect: boolean;
	}[];
	postedAt: string;
}
