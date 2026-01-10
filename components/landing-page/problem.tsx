import React from "react";
import { Reveal } from "./reveal";

function Problem() {
	return (
		<Reveal>
      <section className="border-t bg-muted/30">
			<div className="mx-auto max-w-3xl px-6 py-24 text-center">
				<h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
					The problem isn’t lack of effort.
					<br />
					It’s lack of direction.
				</h2>

				<p className="mt-6 text-base text-muted-foreground md:text-lg">
					Most students work hard — learning tools, completing
					courses, building projects — yet still feel unprepared for
					real jobs.
				</p>

				<div className="mt-10 space-y-4 text-left">
					<div className="rounded-lg border bg-card p-5 shadow-xs">
						<p className="font-medium">
							❌ Courses don’t map to job requirements
						</p>
						<p className="mt-1 text-sm text-muted-foreground">
							You learn topics, but don’t know if they actually
							matter for your target role.
						</p>
					</div>

					<div className="rounded-lg border bg-card p-5 shadow-xs">
						<p className="font-medium">
							❌ Career advice is generic and outdated
						</p>
						<p className="mt-1 text-sm text-muted-foreground">
							Everyone gets the same roadmap, regardless of their
							current skills or goals.
						</p>
					</div>

					<div className="rounded-lg border bg-card p-5 shadow-xs">
						<p className="font-medium">❌ Progress feels random</p>
						<p className="mt-1 text-sm text-muted-foreground">
							You don’t know what to learn next — or when you’re
							actually “ready”.
						</p>
					</div>
				</div>

				<p className="mt-10 text-base font-medium">
					Pathwise exists to fix this.
				</p>
			</div>
		</section>
    </Reveal>
	);
}

export default Problem;
