"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { GraduationCap, ArrowLeftRight, School, Check } from "lucide-react";

const audiences = [
	{
		title: "Students",
		icon: <GraduationCap className="h-6 w-6" />,
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
		icon: <ArrowLeftRight className="h-6 w-6" />,
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
		icon: <School className="h-6 w-6" />,
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
		<section
			id="students"
			className="relative border-t bg-muted/30 py-24 scroll-mt-20 overflow-hidden"
		>
			<div className="landing-page-container">
				<div className="mb-16 max-w-2xl">
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="text-4xl font-bold tracking-tight sm:text-5xl"
					>
						Built for those who <br />
						<span className="text-primary italic font-serif">
							refuse to guess.
						</span>
					</motion.h2>
					<motion.p
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ delay: 0.2 }}
						className="mt-6 text-lg text-muted-foreground leading-relaxed"
					>
						Pathwise adapts to where you are—from your first line of
						code to your career pivot.
					</motion.p>
				</div>

				<div className="grid gap-6 md:grid-cols-3">
					{audiences.map((audience, index) => (
						<AudienceCard
							key={audience.title}
							{...audience}
							index={index}
						/>
					))}
				</div>
			</div>
		</section>
	);
}

function AudienceCard({
	title,
	description,
	benefits,
	icon,
	index,
}: {
	title: string;
	description: string;
	benefits: string[];
	icon: React.ReactNode;
	index: number;
}) {
	const cardRef = useRef<HTMLDivElement>(null);

	// Spotlight effect logic
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);

	function onMouseMove({
		currentTarget,
		clientX,
		clientY,
	}: React.MouseEvent) {
		const { left, top } = currentTarget.getBoundingClientRect();
		mouseX.set(clientX - left);
		mouseY.set(clientY - top);
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ delay: index * 0.1 }}
			onMouseMove={onMouseMove}
			className="group relative overflow-hidden rounded-3xl border bg-card p-8 shadow-sm transition-all hover:shadow-xl"
		>
			{/* CREATIVE ADD: Spotlight Background */}
			<motion.div
				className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity group-hover:opacity-100"
				style={{
					background: useTransform(
						[mouseX, mouseY],
						([x, y]) =>
							`radial-gradient(600px circle at ${x}px ${y}px, rgba(var(--primary-rgb), 0.06), transparent 40%)`,
					),
				}}
			/>

			<div className="relative z-10">
				<div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
					{icon}
				</div>

				<h3 className="text-xl font-bold">{title}</h3>
				<p className="mt-3 text-sm leading-relaxed text-muted-foreground">
					{description}
				</p>

				<div className="mt-8 space-y-3">
					{benefits.map((benefit: string) => (
						<div
							key={benefit}
							className="flex items-center gap-3 text-sm font-medium"
						>
							<div className="flex h-5 w-5 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors group-hover:bg-primary/20 group-hover:text-primary">
								<Check className="h-3 w-3" />
							</div>
							<span>{benefit}</span>
						</div>
					))}
				</div>
			</div>
		</motion.div>
	);
}

export default WhoIsThisFor;
