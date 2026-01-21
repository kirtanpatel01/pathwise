const features = [
	{
		title: "Skill Audit",
		description:
			"You start by declaring what you already know — skills, tools, projects, and experience.",
		subtext: "This becomes your personal skill baseline.",
	},
	{
		title: "Market Alignment",
		description:
			"We compare your skills against up-to-date job requirements for your target role.",
		subtext: "No outdated taxonomies. No guesswork.",
	},
	{
		title: "Technical Delta",
		description:
			"Pathwise identifies the exact skills you're missing — not 20 things, just what actually matters.",
		subtext: "Clear gaps. Clear priorities.",
	},
	{
		title: "Dynamic Roadmap",
		description:
			"You get a step-by-step roadmap ordered from beginner to advanced.",
		subtext: "Each step is tied to real market demand.",
	},
];

function HowItWorks() {
	return (
		<section id="how-it-works" className="scroll-mt-20">
			<div className="landing-page-container">
				<div className="mb-6 sm:mb-14 max-w-2xl">
					<h2 className="landing-page-h1">How Pathwise works</h2>
					<p className="mt-4 text-base text-muted-foreground md:text-lg">
						A structured system that turns your current skills into
						a clear, job-aligned roadmap.
					</p>
				</div>

				<div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
					{features.map((feature) => (
						<FeatureCard
							key={feature.title}
							title={feature.title}
							description={feature.description}
							subtext={feature.subtext}
						/>
					))}
				</div>
			</div>
		</section>
	);
}

export default HowItWorks;

type FeatureCardProps = {
	title: string;
	description: string;
	subtext?: string;
};

function FeatureCard({ title, description, subtext }: FeatureCardProps) {
	return (
		<div className="rounded-xl border bg-card p-3 sm:p-6 shadow-sm transition-shadow hover:shadow-md">
			<h3 className="text-lg font-semibold">{title}</h3>

			<p className="mt-2 text-sm text-muted-foreground">{description}</p>

			{subtext && (
				<p className="mt-3 text-sm text-muted-foreground">{subtext}</p>
			)}
		</div>
	);
}
