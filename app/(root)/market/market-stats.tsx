import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MarketRole } from "@/types/market";
import { TrendingUp, Users, Code, Award } from "lucide-react";

export function MarketStats({ roles }: { roles: MarketRole[] }) {
	const topRole = [...roles].sort(
		(a, b) => b.demandPercentage - a.demandPercentage,
	)[0];
	const avgSkills = Math.round(
		roles.reduce((acc, r) => acc + r.skills.length, 0) / roles.length,
	);

	const stats = [
		{
			title: "Total Roles",
			value: roles.length,
			icon: Users,
			color: "text-blue-600",
		},
		{
			title: "Highest Demand",
			value: topRole.title,
			subValue: `${topRole.demandPercentage}%`,
			icon: TrendingUp,
			color: "text-emerald-600",
		},
		{
			title: "Avg Skills",
			value: avgSkills,
			icon: Code,
			color: "text-purple-600",
		},
		{
			title: "Top Certs",
			value: "Cloud/AI",
			icon: Award,
			color: "text-orange-600",
		},
	];

	return (
		<div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
			{stats.map((stat) => (
				<Card
					key={stat.title}
					className="overflow-hidden border-none shadow-sm bg-accent backdrop-blur-sm"
				>
					<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
						<CardTitle className="text-sm font-medium">
							{stat.title}
						</CardTitle>
						<stat.icon className={`h-4 w-4 ${stat.color}`} />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{stat.value}</div>
						{stat.subValue && (
							<p className="text-xs text-muted-foreground mt-1">
								{stat.subValue} intensity
							</p>
						)}
					</CardContent>
				</Card>
			))}
		</div>
	);
}
