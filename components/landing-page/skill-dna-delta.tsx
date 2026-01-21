import { SkillDNAIllustration } from "./skill-illustrator";

function SkillDNADelta() {
	return (
      <section className="border-t bg-muted/30">
			<div className="landing-page-container">
				<div className="grid gap-6 sm:gap-12 md:grid-cols-2 md:items-center">
					<div className="space-y-6">
						<h2 className="landing-page-h1">
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

					<div className="rounded-xl border bg-card p-4 sm:p-6 shadow-sm">
						<h3 className="mb-4 text-sm font-medium text-muted-foreground">
							Example: Frontend Developer
						</h3>
						<SkillDNAIllustration />

						<div className="space-y-3">
							<SkillStatusItem label="HTML / CSS" status="ready" />
							<SkillStatusItem label="JavaScript" status="in-progress" />
							<SkillStatusItem label="React" status="missing" />
							<SkillStatusItem label="System Design" status="missing" />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default SkillDNADelta;

type SkillStatus = "ready" | "in-progress" | "missing";

type SkillStatusItemProps = {
	label: string;
	status: SkillStatus;
};

const statusStyles: Record<SkillStatus, string> = {
	ready: "text-primary",
	"in-progress": "text-primary/80",
	missing: "text-destructive",
};

const statusLabels: Record<SkillStatus, string> = {
	ready: "Ready",
	"in-progress": "In progress",
	missing: "Missing",
};

function SkillStatusItem({
	label,
	status,
}: SkillStatusItemProps) {
	return (
		<div className="flex items-center justify-between rounded-md bg-muted px-3 py-2">
			<span className="text-sm">{label}</span>
			<span
				className={`text-xs font-medium ${statusStyles[status]}`}
			>
				{statusLabels[status]}
			</span>
		</div>
	);
}
