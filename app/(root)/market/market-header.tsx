import { Badge } from "@/components/ui/badge";

export function MarketHeader() {
	return (
		<div className="space-y-3">
			<div className="flex items-center gap-2">
				<h1 className="text-3xl font-bold tracking-tight">
					Market Trends
				</h1>
				<Badge variant="secondary">2025 Snapshot</Badge>
			</div>

			<p className="text-muted-foreground max-w-2xl">
				A static overview of current in-demand roles, recruiter
				hiring intensity, and the core skills expected by the
				industry.
			</p>
		</div>
	);
}
