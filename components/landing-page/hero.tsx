'use client'

import { Button } from "../ui/button";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { Reveal } from "./reveal";

function Hero() {
	return (
		<Reveal>
			<section className="relative overflow-hidden">
				<div className="mx-auto max-w-7xl px-6 py-24">
					<div className="grid gap-12 md:grid-cols-2 md:items-center">
						{/* Left: Copy */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, ease: "easeOut" }}
							className="space-y-6"
						>
							<h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">
								From skill confusion <br />
								to career clarity
							</h1>

							<p className="max-w-xl text-base text-muted-foreground md:text-lg">
								Pathwise analyzes your current skills, compares
								them with real job-market requirements, and
								builds a personalized roadmap to make you
								job-ready — step by step.
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
								Built for students who want clarity, not
								guesswork.
							</p>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, scale: 0.96 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{
								duration: 0.5,
								ease: "easeOut",
								delay: 0.1,
							}}
							className="relative"
						>
							<div className="rounded-xl border bg-card p-6 shadow-sm">
								<ol className="space-y-4">
									{[
										"Skill audit",
										"Market alignment",
										"Technical delta",
										"Personalized roadmap",
									].map((step, index) => (
										<motion.li
											key={step}
											initial={{ opacity: 0, x: -8 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{
												delay: 0.2 + index * 0.08,
												duration: 0.3,
											}}
											className="flex items-center gap-3"
										>
											<span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
												{index + 1}
											</span>
											<span className="text-sm font-medium">
												{step}
											</span>
										</motion.li>
									))}
								</ol>
							</div>
						</motion.div>
					</div>
				</div>
			</section>
		</Reveal>
	);
}

export default Hero;
