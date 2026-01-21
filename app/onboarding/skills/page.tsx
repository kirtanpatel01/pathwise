"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useOnboardingStore } from "@/stores/onboarding.store";

import {
	Card,
	CardHeader,
	CardContent,
	CardTitle,
	CardFooter,
	CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";

export default function Step3SkillsPage() {
	const supabase = createClient();
	const router = useRouter();

	const {
		skillsMaster,
		userSkills,
		setUserSkills,
		setStep,
		setMaxStepCompleted,
	} = useOnboardingStore();

	const [skills, setSkills] = useState(userSkills);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setSkills(userSkills);
	}, [userSkills]);

  const hasSkills = Boolean(skills && skills.length > 0);

	async function onSubmit() {
		setLoading(true);

		const {
			data: { user },
		} = await supabase.auth.getUser();

		if (!user) return;

		await supabase.from("user_skills").delete().eq("user_id", user.id);

		if (skills.length > 0) {
			await supabase.from("user_skills").insert(
				skills.map((s) => ({
					user_id: user.id,
					...s,
				})),
			);
		}

		await supabase
			.from("profiles")
			.update({ onboarding_step: 4 })
			.eq("user_id", user.id);

		setUserSkills(skills);
		setMaxStepCompleted(4);
		setStep(4);
		router.push("/onboarding/links");
	}

	const groupedSkills = skillsMaster.reduce(
		(acc, skill) => {
			acc[skill.category] ??= [];
			acc[skill.category].push(skill);
			return acc;
		},
		{} as Record<string, typeof skillsMaster>,
	);

	return (
		<Card className="max-w-lg mx-auto rounded-none sm:rounded-xl">
			<CardHeader className="space-y-2">
				<CardTitle>Select your skills</CardTitle>
				<CardDescription>
					Select only the skills you already know. We&apos;ll use this
					to build a personalized learning roadmap.
				</CardDescription>
			</CardHeader>

			<CardContent className="space-y-6 max-h-[54vh] overflow-y-auto">
				{skillsMaster.map((skill) => {
					const existing = skills.find(
						(s) => s.skill_id === skill.id,
					);

					return (
						<div
							key={skill.id}
							className="border rounded-xl p-4 space-y-4"
						>
							<div className="flex items-center justify-between">
								<span className="font-medium">
									{skill.skill_name}
								</span>
								<Checkbox
									checked={!!existing}
									onCheckedChange={(checked) => {
										if (!checked) {
											setSkills(
												skills.filter(
													(s) =>
														s.skill_id !== skill.id,
												),
											);
										} else {
											setSkills([
												...skills,
												{
													skill_id: skill.id,
													proficiency: 3,
													used_in_project: false,
												},
											]);
										}
									}}
								/>
							</div>

							{existing && (
								<div className="space-y-3 pl-2 border-l">
									<div className="flex justify-between text-xs text-muted-foreground">
										<span>Beginner</span>
										<span>Intermediate</span>
										<span>Advanced</span>
									</div>

									<Slider
										min={1}
										max={5}
										step={1}
										value={[existing.proficiency]}
										onValueChange={([value]) =>
											setSkills(
												skills.map((s) =>
													s.skill_id === skill.id
														? {
																...s,
																proficiency:
																	value,
															}
														: s,
												),
											)
										}
									/>

									<p className="text-xs text-muted-foreground">
										Rate how confident you are in this
										skill.
									</p>

									<label className="flex items-start gap-2 text-sm">
										<Checkbox
											checked={existing.used_in_project}
											onCheckedChange={(checked) =>
												setSkills(
													skills.map((s) =>
														s.skill_id === skill.id
															? {
																	...s,
																	used_in_project:
																		!!checked,
																}
															: s,
													),
												)
											}
										/>
										<span>
											<strong>
												Used in real projects
											</strong>
											<br />
											<span className="text-xs text-muted-foreground">
												Applied in internships,
												freelance, college or personal
												projects.
											</span>
										</span>
									</label>
								</div>
							)}
						</div>
					);
				})}
			</CardContent>

			<CardFooter className="space-y-2">
				<Button
					className="w-full"
					onClick={onSubmit}
					disabled={loading}
				>
					{loading ? "Saving..." : hasSkills ? "Update" : "Continue"}
				</Button>
			</CardFooter>
		</Card>
	);
}
