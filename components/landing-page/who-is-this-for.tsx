const audiences = [
	{
		title: "Students",
		description:
			"Unsure what to learn next? Pathwise gives you a clear, job-aligned progression path.",
		benefits: [
			"Clear learning priorities",
			"Reduced overwhelm",
			"Confidence in readiness",
		],
	},
	{
		title: "Career Switchers",
		description:
			"Reuse what you already know and focus only on what’s missing for your new role.",
		benefits: [
			"Skill overlap detection",
			"Shorter transition paths",
			"Focused learning",
		],
	},
	{
		title: "Institutions",
		description:
			"Track and improve placement readiness with real, skill-based insight.",
		benefits: [
			"Readiness metrics",
			"Market-aligned curricula",
			"Better outcomes",
		],
	},
];

function WhoIsThisFor() {
	return (
		<section id="students" className="border-t bg-muted/30 scroll-mt-20">
			<div className="landing-page-container">
				<div className="mb-6 sm:mb-14 max-w-2xl">
					<h2 className="landing-page-h1">
						Built for students who want clarity
					</h2>
					<p className="mt-4 text-base text-muted-foreground md:text-lg">
						Pathwise adapts to where you are — and helps you move
						forward with confidence.
					</p>
				</div>

				<div className="grid gap-4 sm:gap-6 md:grid-cols-3">
					{audiences.map((audience) => (
						<AudienceCard
							key={audience.title}
							title={audience.title}
							description={audience.description}
							benefits={audience.benefits}
						/>
					))}
				</div>
			</div>
		</section>
	);
}

export default WhoIsThisFor;

type AudienceCardProps = {
	title: string;
	description: string;
	benefits: string[];
};

function AudienceCard({ title, description, benefits }: AudienceCardProps) {
	return (
		<div className="rounded-xl border bg-card p-3 sm:p-6 shadow-sm">
			<h3 className="text-lg font-semibold">{title}</h3>

			<p className="mt-2 text-sm text-muted-foreground">{description}</p>

			<ul className="mt-4 space-y-2 text-sm">
				{benefits.map((benefit) => (
					<li key={benefit}>✔ {benefit}</li>
				))}
			</ul>
		</div>
	);
}
