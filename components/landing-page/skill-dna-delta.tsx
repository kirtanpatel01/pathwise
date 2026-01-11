import { SkillDNAIllustration } from "./skill-illustrator";

function SkillDNADelta() {
	return (
      <section className="border-t bg-muted/30">
			<div className="mx-auto max-w-7xl px-6 py-24">
				<div className="grid gap-12 md:grid-cols-2 md:items-center">
					{/* Left: Explanation */}
					<div className="space-y-6">
						<h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
							Skill DNA, not guesswork
						</h2>

						<p className="text-base text-muted-foreground md:text-lg">
							Every student has a unique combination of skills,
							experience, and gaps. Pathwise captures this as your{" "}
							<strong>Skill DNA</strong>.
						</p>

						<p className="text-base text-muted-foreground md:text-lg">
							We then compare it against real job-role
							requirements to calculate your{" "}
							<strong>Technical Delta</strong> — the exact skills
							you need to focus on next.
						</p>

						<ul className="space-y-3 text-sm">
							<li className="flex gap-2">
								<span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
								No generic roadmaps
							</li>
							<li className="flex gap-2">
								<span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
								No outdated advice
							</li>
							<li className="flex gap-2">
								<span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
								Just the skills that actually move the needle
							</li>
						</ul>
					</div>

					{/* Right: Visual Representation */}
					<div className="rounded-xl border bg-card p-6 shadow-sm">
						<h3 className="mb-4 text-sm font-medium text-muted-foreground">
							Example: Frontend Developer
						</h3>
						<SkillDNAIllustration />

						<div className="space-y-3">
							<div className="flex items-center justify-between rounded-md bg-muted px-3 py-2">
								<span className="text-sm">HTML / CSS</span>
								<span className="text-xs font-medium text-primary">
									Ready
								</span>
							</div>

							<div className="flex items-center justify-between rounded-md bg-muted px-3 py-2">
								<span className="text-sm">JavaScript</span>
								<span className="text-xs font-medium text-primary">
									In progress
								</span>
							</div>

							<div className="flex items-center justify-between rounded-md bg-muted px-3 py-2">
								<span className="text-sm">React</span>
								<span className="text-xs font-medium text-destructive">
									Missing
								</span>
							</div>

							<div className="flex items-center justify-between rounded-md bg-muted px-3 py-2">
								<span className="text-sm">System Design</span>
								<span className="text-xs font-medium text-destructive">
									Missing
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default SkillDNADelta;
