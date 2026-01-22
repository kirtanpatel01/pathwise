// roadmap/skill-card.tsx
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { SkillCardProps } from "@/types/roadmap";

export function SkillCard({
	skillName,
	category,
	gapType,
	currentProficiency,
	requiredProficiency,
	completed,
}: SkillCardProps) {
	const current = currentProficiency ?? 0;
	const progress =
		requiredProficiency > 0
			? Math.min((current / requiredProficiency) * 100, 100)
			: 0;

	return (
		<div
			className={`rounded-lg border p-4 space-y-3 ${
				completed ? "opacity-60" : ""
			}`}
		>
			<div className="flex items-center justify-between">
				<h3 className="font-medium">{skillName}</h3>
				<Badge variant="secondary">{category}</Badge>
			</div>

			<div className="space-y-1">
				<p className="text-sm text-muted-foreground">
					Proficiency: {current} → {requiredProficiency}
				</p>
				<Progress value={progress} />
				<p className="text-xs text-muted-foreground">
					{gapType === "missing"
						? "Required for this role"
						: `Improve to level ${requiredProficiency}`}
				</p>
			</div>

			<div className="flex justify-between">
				<p className="text-sm text-muted-foreground">
					{gapType === "missing"
						? "Not started"
						: "Needs improvement"}
				</p>

				<Button size="sm" variant={completed ? "secondary" : "outline"}>
					{completed ? "Completed" : "Mark as learned"}
				</Button>
			</div>
		</div>
	);
}
