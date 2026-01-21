"use client";

import { Button } from "../ui/button";
import { ArrowUpRight } from "lucide-react";

function Hero() {
	return (
		<section className="relative overflow-hidden">
			<div className="landing-page-container">
				<div className="grid gap-4 sm:gap-12 md:grid-cols-2 md:items-center">
					{/* Left: Copy */}
					<div className="space-y-6">
						<h1 className="landing-page-h1">
							From skill confusion <br />
							to career clarity
						</h1>

						<p className="max-w-xl text-base text-muted-foreground md:text-lg">
							Pathwise analyzes your current skills, compares them
							with real job-market requirements, and builds a
							personalized roadmap to make you job-ready — step by
							step.
						</p>

						<div className="flex flex-wrap items-center gap-4">
							<Button size="lg">
								Build my roadmap
								<ArrowUpRight className="ml-2 h-4 w-4" />
							</Button>

							<Button
								variant="outline"
								size="lg"
								onClick={() => {
									document
										.getElementById("how-it-works")
										?.scrollIntoView({
											behavior: "smooth",
										});
								}}
							>
								See how it works
							</Button>
						</div>

						<p className="text-sm text-muted-foreground">
							Built for students who want clarity, not guesswork.
						</p>
					</div>

					<div className="relative">
						<div className="rounded-md sm:rounded-xl border bg-card p-3 sm:p-6 shadow-sm">
							<ol className="space-y-4">
								{[
									"Skill audit",
									"Market alignment",
									"Technical delta",
									"Personalized roadmap",
								].map((step, index) => (
									<li
										key={step}
										className="flex items-center gap-3"
									>
										<span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
											{index + 1}
										</span>
										<span className="text-sm font-medium">
											{step}
										</span>
									</li>
								))}
							</ol>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Hero;
