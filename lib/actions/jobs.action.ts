"use server";

import { Job, JobRole } from "@/types/job";

const ROLE_QUERY_MAP: Record<JobRole, string> = {
	frontend: "frontend developer",
	backend: "backend developer",
	fullstack: "full stack developer",
};

export async function getJobs(role: JobRole): Promise<Job[]> {
	const query = `${ROLE_QUERY_MAP[role]} jobs in chicago`;

	const res = await fetch(
		`https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(
			query
		)}&page=1&num_pages=1&country=us`,
		{
			headers: {
				"x-rapidapi-key": process.env.RAPIDAPI_KEY!,
				"x-rapidapi-host": "jsearch.p.rapidapi.com",
			},
			cache: "no-store",
		}
	);

	if (!res.ok) throw new Error("Failed to fetch jobs");

	const json = await res.json();

	return json.data.map((job: any): Job => ({
		id: job.job_id,
		title: job.job_title,
		company: job.employer_name,
		location: job.job_location,
		employmentType: job.job_employment_type_text,
		isRemote: job.job_is_remote,
		description: job.job_description,
		postedAt: job.job_posted_human_readable,
		applyLinks: job.apply_options.map((opt: any) => ({
			publisher: opt.publisher,
			url: opt.apply_link,
			isDirect: opt.is_direct,
		})),
	}));
}

export async function getJobById(jobId: string): Promise<Job | null> {
	const res = await fetch(
		`https://jsearch.p.rapidapi.com/job-details?job_id=${jobId}`,
		{
			headers: {
				"x-rapidapi-key": process.env.RAPIDAPI_KEY!,
				"x-rapidapi-host": "jsearch.p.rapidapi.com",
			},
			cache: "no-store",
		}
	);

	if (!res.ok) return null;

	const json = await res.json();
	const job = json.data?.[0];
	if (!job) return null;

	return {
		id: job.job_id,
		title: job.job_title,
		company: job.employer_name,
		location: job.job_location,
		employmentType: job.job_employment_type_text,
		isRemote: job.job_is_remote,
		description: job.job_description,
		postedAt: job.job_posted_human_readable,
		applyLinks: job.apply_options.map((opt: any) => ({
			publisher: opt.publisher,
			url: opt.apply_link,
			isDirect: opt.is_direct,
		})),
	};
}
