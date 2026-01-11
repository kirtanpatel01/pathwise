import { SiteHeader } from "@/components/landing-page/site-header";
import RoadmapPreview from "@/components/landing-page/roadmap-preview";
import SkillDNADelta from "@/components/landing-page/skill-dna-delta";
import HowItWorks from "@/components/landing-page/how-it-works";
import Hero from "@/components/landing-page/hero";
import Problem from "@/components/landing-page/problem";
import WhoIsThisFor from "@/components/landing-page/who-is-this-for";
import Footer from "@/components/landing-page/footer";
import { createClient } from "@/lib/supabase/server";

export default async function HomePage() {
	const supabase = await createClient();

	const { data: user, error } = await supabase.auth.getClaims();
	if (error) {
		console.log("Error fetching user claims:", error);
	}

	console.log(user);

	return (
		<>
			<SiteHeader user={user} />
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
