import { Button } from "../ui/button";

function CTA() {
	return (
		<section className="border-t">
			<div className="landing-page-container text-center">
				<h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
					Stop guessing. Start progressing.
				</h2>

				<p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground md:text-lg">
					Build a roadmap that reflects where you are today — and
					where the job market expects you to be.
				</p>

				<div className="mt-8 flex flex-wrap justify-center gap-4">
					<Button size="lg">Create my roadmap</Button>
					<Button variant="outline" size="lg">
						Explore as guest
					</Button>
				</div>
			</div>
		</section>
	);
}

export default CTA;
