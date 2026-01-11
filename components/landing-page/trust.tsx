function Trust() {
	return (
      <section>
			<div className="mx-auto max-w-5xl px-6 py-24 text-center">
				<h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
					Designed for real-world outcomes
				</h2>

				<p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
					Pathwise is built around actual job requirements — not
					assumptions, trends, or generic advice.
				</p>

				<div className="mt-12 grid gap-6 md:grid-cols-3">
					<div className="rounded-lg border bg-card p-5 shadow-xs">
						<p className="font-medium">Market-aligned skills</p>
						<p className="mt-1 text-sm text-muted-foreground">
							Roadmaps reflect what companies actually ask for.
						</p>
					</div>

					<div className="rounded-lg border bg-card p-5 shadow-xs">
						<p className="font-medium">Structured progression</p>
						<p className="mt-1 text-sm text-muted-foreground">
							No random jumps — every step has a reason.
						</p>
					</div>

					<div className="rounded-lg border bg-card p-5 shadow-xs">
						<p className="font-medium">Built for scale</p>
						<p className="mt-1 text-sm text-muted-foreground">
							Designed to support individuals and institutions
							alike.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Trust;
