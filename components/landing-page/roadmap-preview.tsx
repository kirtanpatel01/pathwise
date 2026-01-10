import React from "react";

function RoadmapPreview() {
	return (
		<section id="roadmaps" className="scroll-mt-20">
			<div className="mx-auto max-w-7xl px-6 py-24">
				<div className="mb-14 max-w-2xl">
					<h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
						Your roadmap, step by step
					</h2>
					<p className="mt-4 text-base text-muted-foreground md:text-lg">
						A clear progression path designed around real job
						expectations — not random tutorials.
					</p>
				</div>

				<div className="grid gap-6 md:grid-cols-3">
					{/* Beginner */}
					<div className="rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
						<h3 className="text-lg font-semibold">Foundations</h3>
						<p className="mt-2 text-sm text-muted-foreground">
							Core concepts you must understand before moving
							forward.
						</p>

						<ul className="mt-4 space-y-2 text-sm">
							<li>✔ JavaScript fundamentals</li>
							<li>✔ Browser & DOM basics</li>
							<li>✔ Git & version control</li>
						</ul>
					</div>

					{/* Intermediate */}
					<div className="rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
						<h3 className="text-lg font-semibold">Core Skills</h3>
						<p className="mt-2 text-sm text-muted-foreground">
							Skills actively required by companies hiring today.
						</p>

						<ul className="mt-4 space-y-2 text-sm">
							<li>✔ React fundamentals</li>
							<li>✔ State management</li>
							<li>✔ API integration</li>
						</ul>
					</div>

					{/* Advanced */}
					<div className="rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
						<h3 className="text-lg font-semibold">Advanced</h3>
						<p className="mt-2 text-sm text-muted-foreground">
							Skills that differentiate strong candidates from
							average ones.
						</p>

						<ul className="mt-4 space-y-2 text-sm">
							<li>✔ Performance optimization</li>
							<li>✔ System design basics</li>
							<li>✔ Production practices</li>
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
}

export default RoadmapPreview;
