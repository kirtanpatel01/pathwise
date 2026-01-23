import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function ReadinessOverview({
	completed,
	total,
}: {
	completed: number;
	total: number;
}) {
	const percentage = Math.round((completed / total) * 100);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Readiness Overview</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex justify-between text-sm">
					<span className="text-muted-foreground">
						Skill Completion
					</span>
					<span className="font-medium">{percentage}%</span>
				</div>
				<Progress value={percentage} />
				<p className="text-sm text-muted-foreground">
					{completed} of {total} skills completed
				</p>
			</CardContent>
		</Card>
	);
}
