import { Badge } from "@/components/ui/badge";

export function RoadmapItem({
	index,
	skill,
	status,
}: {
	index: number;
	skill: string;
	status: "pending" | "in-progress" | "done";
}) {
	const variant =
		status === "done"
			? "default"
			: status === "in-progress"
			? "secondary"
			: "outline";

	return (
		<div className="flex items-center justify-between border rounded-lg p-4">
			<div className="flex items-center gap-3">
				<span className="text-sm text-muted-foreground">
					{index}.
				</span>
				<p className="font-medium">{skill}</p>
			</div>
			<Badge variant={variant}>{status}</Badge>
		</div>
	);
}
