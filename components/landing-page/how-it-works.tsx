function HowItWorks() {
	return (
		<section id="how-it-works" className="scroll-mt-20">
			<div className="mx-auto max-w-7xl px-6 py-24">
				<div className="mb-14 max-w-2xl">
					<h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
						How Pathwise works
					</h2>
					<p className="mt-4 text-base text-muted-foreground md:text-lg">
						A structured system that turns your current skills into
						a clear, job-aligned roadmap.
					</p>
				</div>

				<div className="grid gap-6 md:grid-cols-2">
					<div className="rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
						<h3 className="text-lg font-semibold">Skill Audit</h3>
						<p className="mt-2 text-sm text-muted-foreground">
							You start by declaring what you already know —
							skills, tools, projects, and experience.
						</p>
						<p className="mt-3 text-sm text-muted-foreground">
							This becomes your personal skill baseline.
						</p>
					</div>

					<div className="rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
						<h3 className="text-lg font-semibold">
							Market Alignment
						</h3>
						<p className="mt-2 text-sm text-muted-foreground">
							We compare your skills against up-to-date job
							requirements for your target role.
						</p>
						<p className="mt-3 text-sm text-muted-foreground">
							No outdated taxonomies. No guesswork.
						</p>
					</div>

					<div className="rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
						<h3 className="text-lg font-semibold">
							Technical Delta
						</h3>
						<p className="mt-2 text-sm text-muted-foreground">
							Pathwise identifies the exact skills you&apos;re
							missing — not 20 things, just what actually matters.
						</p>
						<p className="mt-3 text-sm text-muted-foreground">
							Clear gaps. Clear priorities.
						</p>
					</div>

					<div className="rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
						<h3 className="text-lg font-semibold">
							Dynamic Roadmap
						</h3>
						<p className="mt-2 text-sm text-muted-foreground">
							You get a step-by-step roadmap ordered from beginner
							to advanced.
						</p>
						<p className="mt-3 text-sm text-muted-foreground">
							Each step is tied to real market demand.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}

export default HowItWorks;
