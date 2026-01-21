const roadmapStages = [
	{
		title: "Foundations",
		description: "Core concepts you must understand before moving forward.",
		items: [
			"JavaScript fundamentals",
			"Browser & DOM basics",
			"Git & version control",
		],
	},
	{
		title: "Core Skills",
		description: "Skills actively required by companies hiring today.",
		items: ["React fundamentals", "State management", "API integration"],
	},
	{
		title: "Advanced",
		description:
			"Skills that differentiate strong candidates from average ones.",
		items: [
			"Performance optimization",
			"System design basics",
			"Production practices",
		],
	},
];

function RoadmapPreview() {
	return (
		<section id="roadmaps" className="scroll-mt-20">
			<div className="landing-page-container">
				<div className="mb-6 sm:mb-14 max-w-2xl">
					<h2 className="landing-page-h1">
						Your roadmap, step by step
					</h2>
					<p className="mt-4 text-base text-muted-foreground md:text-lg">
						A clear progression path designed around real job
						expectations — not random tutorials.
					</p>
				</div>

				<div className="grid gap-4 sm:gap-6 md:grid-cols-3">
					{roadmapStages.map((stage) => (
						<RoadmapStageCard
							key={stage.title}
							title={stage.title}
							description={stage.description}
							items={stage.items}
						/>
					))}
				</div>
			</div>
		</section>
	);
}

export default RoadmapPreview;

type RoadmapStageCardProps = {
	title: string;
	description: string;
	items: string[];
};

function RoadmapStageCard({
	title,
	description,
	items,
}: RoadmapStageCardProps) {
	return (
		<div className="rounded-xl border bg-card p-3 sm:p-6 shadow-sm transition-shadow hover:shadow-md">
			<h3 className="text-lg font-semibold">{title}</h3>

			<p className="mt-2 text-sm text-muted-foreground">{description}</p>

			<ul className="mt-4 space-y-2 text-sm">
				{items.map((item) => (
					<li key={item}>✔ {item}</li>
				))}
			</ul>
		</div>
	);
}
