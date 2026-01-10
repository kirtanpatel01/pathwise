"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/landing-page/site-header";
import RoadmaPreview from "@/components/landing-page/roadmap-preview";
import RoadmapPreview from "@/components/landing-page/roadmap-preview";
import SkillDNADelta from "@/components/landing-page/skill-dna-delta";
import HowItWorks from "@/components/landing-page/how-it-works";
import Hero from "@/components/landing-page/hero";
import Problem from "@/components/landing-page/problem";
import WhoIsThisFor from "@/components/landing-page/who-is-this-for";
import Footer from "@/components/landing-page/footer";

export default function HomePage() {
	return (
		<>
			<SiteHeader />
			<main>
				<Hero />
				<Problem />
				<HowItWorks />
				<SkillDNADelta />
				<RoadmapPreview />
        <WhoIsThisFor />
			</main>
      <Footer />
		</>
	);
}
