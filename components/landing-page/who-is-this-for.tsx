function WhoIsThisFor() {
	return (
      <section id="students" className="border-t bg-muted/30 scroll-mt-20">
			<div className="mx-auto max-w-7xl px-6 py-24">
				<div className="mb-14 max-w-2xl">
					<h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
						Built for students who want clarity
					</h2>
					<p className="mt-4 text-base text-muted-foreground md:text-lg">
						Pathwise adapts to where you are — and helps you move
						forward with confidence.
					</p>
				</div>

				<div className="grid gap-6 md:grid-cols-3">
					{/* Students */}
					<div className="rounded-xl border bg-card p-6 shadow-sm">
						<h3 className="text-lg font-semibold">Students</h3>
						<p className="mt-2 text-sm text-muted-foreground">
							Unsure what to learn next? Pathwise gives you a
							clear, job-aligned progression path.
						</p>
						<ul className="mt-4 space-y-2 text-sm">
							<li>✔ Clear learning priorities</li>
							<li>✔ Reduced overwhelm</li>
							<li>✔ Confidence in readiness</li>
						</ul>
					</div>

					{/* Career Switchers */}
					<div className="rounded-xl border bg-card p-6 shadow-sm">
						<h3 className="text-lg font-semibold">
							Career Switchers
						</h3>
						<p className="mt-2 text-sm text-muted-foreground">
							Reuse what you already know and focus only on what’s
							missing for your new role.
						</p>
						<ul className="mt-4 space-y-2 text-sm">
							<li>✔ Skill overlap detection</li>
							<li>✔ Shorter transition paths</li>
							<li>✔ Focused learning</li>
						</ul>
					</div>

					{/* Institutions */}
					<div className="rounded-xl border bg-card p-6 shadow-sm">
						<h3 className="text-lg font-semibold">Institutions</h3>
						<p className="mt-2 text-sm text-muted-foreground">
							Track and improve placement readiness with real,
							skill-based insight.
						</p>
						<ul className="mt-4 space-y-2 text-sm">
							<li>✔ Readiness metrics</li>
							<li>✔ Market-aligned curricula</li>
							<li>✔ Better outcomes</li>
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
}

export default WhoIsThisFor;
