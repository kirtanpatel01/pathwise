import Link from "next/link";
import { Job } from "@/types/job";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function JobCard({ job }: { job: Job }) {
	return (
		<Card className="hover:shadow-md transition">
			<CardContent className="p-5 space-y-3">
				<div>
					<h3 className="font-semibold leading-tight line-clamp-2">
						{job.title}
					</h3>
					<p className="text-sm text-muted-foreground">
						{job.company}
					</p>
				</div>

				<p className="text-sm">{job.location}</p>

				<div className="flex flex-wrap gap-2">
					{job.isRemote && <Badge>Remote</Badge>}
				</div>

				<Link
					href={`/jobs/${job.id}`}
					className="text-sm font-medium text-primary hover:underline"
				>
					View details →
				</Link>
			</CardContent>
		</Card>
	);
}
