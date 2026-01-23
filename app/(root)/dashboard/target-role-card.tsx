import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function TargetRoleCard({
	title,
	isExploring,
}: {
	title: string;
	isExploring: boolean;
}) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Target Role</CardTitle>
			</CardHeader>
			<CardContent className="space-y-2">
				<p className="text-xl font-semibold">{title}</p>
				<Badge variant={isExploring ? "secondary" : "default"}>
					{isExploring ? "Exploring" : "Primary Goal"}
				</Badge>
			</CardContent>
		</Card>
	);
}
