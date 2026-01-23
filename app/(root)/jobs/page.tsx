import { getJobs } from "@/lib/actions/jobs.action";
import { JobCard } from "./job-card";
import { JobsClient } from "./jobs-client";
import { JobRole } from "@/types/job";

const ALLOWED_ROLES: JobRole[] = ["frontend", "backend", "fullstack"];

export default async function JobsPage({
	searchParams,
}: {
	searchParams: Promise<{ role?: string }>;
}) {
	const { role: roleParam } = await searchParams;

	const role: JobRole = ALLOWED_ROLES.includes(roleParam as JobRole)
		? (roleParam as JobRole)
		: "frontend";

	const jobs = await getJobs(role);

	return (
		<div className="space-y-6 p-4">
			<div>
				<h1 className="text-2xl font-bold">Explore Jobs</h1>
				<p className="text-muted-foreground">
					Real-time roles aligned with the market
				</p>
			</div>

			<JobsClient role={role} />

			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{jobs.map((job) => (
					<JobCard key={job.id} job={job} />
				))}
			</div>
		</div>
	);
}
