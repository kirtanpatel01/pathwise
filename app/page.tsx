import { SiteHeader } from "@/components/landing-page/site-header";
import RoadmapPreview from "@/components/landing-page/roadmap-preview";
import SkillDNADelta from "@/components/landing-page/skill-dna-delta";
import HowItWorks from "@/components/landing-page/how-it-works";
import Hero from "@/components/landing-page/hero";
import Problem from "@/components/landing-page/problem";
import WhoIsThisFor from "@/components/landing-page/who-is-this-for";
import Footer from "@/components/landing-page/footer";
import FinalCTA from "@/components/landing-page/cta";
import { auth } from "@clerk/nextjs/server";

export default async function HomePage() {
	const { isAuthenticated } = await auth()

	return (
		<>
			<SiteHeader isAuthenticated={isAuthenticated} />
			<main>
				<Hero />
				<Problem />
				<HowItWorks />
				<SkillDNADelta />
				<RoadmapPreview />
				<WhoIsThisFor />
				<FinalCTA />
			</main>
			<Footer />
		</>
	);
}
