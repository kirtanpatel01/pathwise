"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { Search, BarChart3, Target, Map } from "lucide-react";

const features = [
	{
		title: "Skill Audit",
		description:
			"Declare what you already know—skills, tools, projects, and experience.",
		subtext: "This becomes your personal skill baseline.",
		icon: <Search className="h-5 w-5" />,
		color: "blue",
	},
	{
		title: "Market Alignment",
		description:
			"We compare your skills against real-time job requirements for your target role.",
		subtext: "Live data. No outdated taxonomies.",
		icon: <BarChart3 className="h-5 w-5" />,
		color: "purple",
	},
	{
		title: "Technical Delta",
		description:
			"Pathwise identifies the exact skills you're missing—not 20 things, just the essentials.",
		subtext: "Clear gaps. High-impact priorities.",
		icon: <Target className="h-5 w-5" />,
		color: "orange",
	},
	{
		title: "Dynamic Roadmap",
		description:
			"A step-by-step path ordered from your current level to advanced mastery.",
		subtext: "Tied directly to market demand.",
		icon: <Map className="h-5 w-5" />,
		color: "green",
	},
];

function HowItWorks() {
	return (
		<section
			id="how-it-works"
			className="relative scroll-mt-20 py-24 overflow-hidden"
		>
			<div className="landing-page-container">
				<div className="relative mb-16 max-w-2xl">
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						className="flex items-center gap-2 mb-4 text-primary font-bold tracking-widest uppercase text-xs"
					>
						<span className="h-px w-8 bg-primary" />
						The Process
					</motion.div>

					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="text-4xl font-bold tracking-tight sm:text-5xl"
					>
						How Pathwise works
					</motion.h2>
					<motion.p
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ delay: 0.2 }}
						className="mt-4 text-lg text-muted-foreground"
					>
						A structured system that turns your current skills into
						a clear, job-aligned roadmap.
					</motion.p>
				</div>

				<div className="grid gap-6 lg:grid-cols-2 relative">
					{features.map((feature, index) => (
						<FeatureCard
							key={feature.title}
							index={index}
							{...feature}
						/>
					))}
				</div>
			</div>
		</section>
	);
}

function FeatureCard({
	title,
	description,
	subtext,
	icon,
	index,
}: {
	title: string;
	description: string;
	subtext: string;
	icon: React.ReactNode;
	index: number;
}) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-50px" }}
			transition={{ delay: index * 0.1, duration: 0.5 }}
			whileHover={{ y: -8 }}
			className="group relative overflow-hidden rounded-2xl border bg-card p-6 shadow-sm transition-all hover:shadow-xl hover:border-primary/50"
		>
			{/* CREATIVE ADD: Animated Background Glow on Hover */}
			<div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/5 blur-3xl transition-all group-hover:bg-primary/20" />

			<div className="relative z-10">
				<div className="flex items-center justify-between mb-6">
					<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
						{icon}
					</div>
					<span className="text-4xl font-black opacity-5 transition-opacity group-hover:opacity-10">
						0{index + 1}
					</span>
				</div>

				<h3 className="text-xl font-bold tracking-tight">{title}</h3>

				<p className="mt-3 text-muted-foreground leading-relaxed">
					{description}
				</p>

				{subtext && (
					<motion.div
						initial={{ opacity: 0.6 }}
						whileHover={{ opacity: 1, x: 5 }}
						className="mt-4 flex items-center gap-2 text-sm font-medium text-primary/80"
					>
						<div className="h-1 w-1 rounded-full bg-primary" />
						{subtext}
					</motion.div>
				)}
			</div>

			{/* CREATIVE ADD: The "Scanning" Line for step 02 specifically */}
			{index === 1 && (
				<div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
					<motion.div
						animate={{ y: [0, 200, 0] }}
						transition={{
							duration: 3,
							repeat: Infinity,
							ease: "linear",
						}}
						className="h-px w-full bg-linear-to-r from-transparent via-primary/50 to-transparent"
					/>
				</div>
			)}
		</motion.div>
	);
}

export default HowItWorks;
