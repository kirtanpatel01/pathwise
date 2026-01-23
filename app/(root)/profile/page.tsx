import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Github, Linkedin, Globe, MapPin, GraduationCap } from "lucide-react";

export default function ProfilePage() {
	// -----------------------------
	// Mock Profile Data
	// -----------------------------
	const profile = {
		full_name: "Kirtan Patel",
		institute: "Parul Institute of Technology",
		status: "Student",
		graduation_year: 2026,
		location: "Gujarat, India",
		onboarding_step: 4,
		onboarding_completed: false,
	};

	const links = {
		github: "https://github.com/kirtanpatel",
		linkedin: "https://linkedin.com/in/kirtanpatel",
		portfolio: "https://kirtan.dev",
	};

	const onboardingProgress = Math.round(
		(profile.onboarding_step / 5) * 100
	);

	return (
		<div className="space-y-8 max-w-5xl p-6">
			{/* Header */}
			<div className="flex items-start justify-between">
				<div className="space-y-1">
					<h1 className="text-3xl font-bold tracking-tight">
						{profile.full_name}
					</h1>
					<p className="text-muted-foreground">
						{profile.status}
					</p>
				</div>

				<Button variant="outline" disabled>
					Edit Profile
				</Button>
			</div>

			{/* Profile Overview */}
			<Card>
				<CardHeader>
					<CardTitle>Profile Overview</CardTitle>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="grid gap-4 md:grid-cols-2">
						<div className="flex items-center gap-3 text-sm">
							<GraduationCap className="h-4 w-4 text-muted-foreground" />
							<span>{profile.institute}</span>
						</div>

						<div className="flex items-center gap-3 text-sm">
							<MapPin className="h-4 w-4 text-muted-foreground" />
							<span>{profile.location}</span>
						</div>

						<div className="text-sm">
							<span className="text-muted-foreground">
								Graduation Year:{" "}
							</span>
							<span className="font-medium">
								{profile.graduation_year}
							</span>
						</div>

						<div>
							<Badge
								variant={
									profile.onboarding_completed
										? "default"
										: "secondary"
								}
							>
								{profile.onboarding_completed
									? "Onboarding Completed"
									: "Onboarding In Progress"}
							</Badge>
						</div>
					</div>

					<Separator />

					{/* Onboarding Progress */}
					<div className="space-y-2">
						<div className="flex justify-between text-sm">
							<span className="text-muted-foreground">
								Onboarding Progress
							</span>
							<span className="font-medium">
								{onboardingProgress}%
							</span>
						</div>
						<Progress value={onboardingProgress} />
					</div>
				</CardContent>
			</Card>

			{/* Links */}
			<Card>
				<CardHeader>
					<CardTitle>Professional Links</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<a
						href={links.github}
						className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition"
					>
						<Github className="h-4 w-4" />
						<span>{links.github}</span>
					</a>

					<a
						href={links.linkedin}
						className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition"
					>
						<Linkedin className="h-4 w-4" />
						<span>{links.linkedin}</span>
					</a>

					<a
						href={links.portfolio}
						className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition"
					>
						<Globe className="h-4 w-4" />
						<span>{links.portfolio}</span>
					</a>
				</CardContent>
			</Card>
		</div>
	);
}
