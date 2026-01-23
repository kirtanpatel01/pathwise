import { getJobById } from "@/lib/actions/jobs.action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";

export default async function JobDetailPage({
	params,
}: {
	params: { jobId: string };
}) {
	const job = await getJobById(params.jobId);

	if (!job) notFound();

	return (
		<div className="max-w-3xl space-y-6 p-4">
			<div>
				<h1 className="text-2xl font-bold">{job.title}</h1>
				<p className="text-muted-foreground">{job.company}</p>
			</div>

			<div className="flex gap-2">
				<Badge>{job.employmentType}</Badge>
				{job.isRemote && <Badge>Remote</Badge>}
			</div>

			<p className="whitespace-pre-line text-sm">
				{job.description}
			</p>

			<div className="space-y-2">
				{job.applyLinks.map((link) => (
					<Button key={link.url} asChild variant="outline">
						<a href={link.url} target="_blank">
							Apply via {link.publisher}
						</a>
					</Button>
				))}
			</div>
		</div>
	);
}
