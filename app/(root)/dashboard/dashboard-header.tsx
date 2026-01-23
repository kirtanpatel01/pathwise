export function DashboardHeader({ name }: { name: string }) {
	return (
		<div className="space-y-1">
			<h1 className="text-3xl font-bold tracking-tight">
				Welcome back, {name}
			</h1>
			<p className="text-muted-foreground">
				Here&apos;s your current learning progress and roadmap.
			</p>
		</div>
	);
}
