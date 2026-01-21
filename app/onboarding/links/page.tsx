"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createClient } from "@/lib/supabase/client";
import { linksSchema, LinksFormData } from "@/lib/validations/links.schema";
import { useOnboardingStore } from "@/stores/onboarding.store";

import {
	Card,
	CardHeader,
	CardContent,
	CardTitle,
	CardDescription,
	CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";

export default function Step4LinksPage() {
	const supabase = createClient();
	const router = useRouter();
	const [finishing, setFinishing] = useState(false);

	const { links, setLinks } = useOnboardingStore();

	const [loading, setLoading] = useState(false);
	const [linksSaved, setLinksSaved] = useState(Boolean(links.github));

	const form = useForm<LinksFormData>({
		resolver: zodResolver(linksSchema),
		defaultValues: {
			github: links.github ?? "",
			linkedin: links.linkedin ?? "",
			portfolio: links.portfolio ?? "",
		},
	});

	// prefill on back / refresh
	useEffect(() => {
		form.reset({
			github: links.github ?? "",
			linkedin: links.linkedin ?? "",
			portfolio: links.portfolio ?? "",
		});

		setLinksSaved(Boolean(links.github));
	}, [links]);

	// SAVE / UPDATE ONLY
	async function onSaveLinks(data: LinksFormData) {
		setLoading(true);

		const {
			data: { user },
		} = await supabase.auth.getUser();

		if (!user) return;

		const { error } = await supabase.from("user_links").upsert(
			{
				user_id: user.id,
				github: data.github,
				linkedin: data.linkedin || null,
				portfolio: data.portfolio || null,
			},
			{ onConflict: "user_id" },
		);

		if (error) {
			console.error(error);
			setLoading(false);
			return;
		}

		setLinks(data);
		setLinksSaved(true);
		setLoading(false);
	}

	// FINISH ONLY (REDIRECT)
	async function onFinish() {
		setFinishing(true);

		const {
			data: { user },
		} = await supabase.auth.getUser();

		if (!user) {
			setFinishing(false);
			return;
		}

		const { error } = await supabase
			.from("profiles")
			.update({ onboarding_completed: true })
			.eq("user_id", user.id);

		if (error) {
			console.error(error);
			setFinishing(false);
			return;
		}

		router.push("/dashboard");
	}

	return (
		<Card className="max-w-xl mx-auto">
			<CardHeader className="space-y-2">
				<CardTitle>Add your links</CardTitle>
				<CardDescription>
					Save your links first. You can finish onboarding after that.
				</CardDescription>
			</CardHeader>

			<CardContent className="space-y-6">
				{/* GitHub */}
				<Controller
					name="github"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel>GitHub *</FieldLabel>
							<Input
								{...field}
								placeholder="https://github.com/username"
								aria-invalid={fieldState.invalid}
							/>
							{fieldState.invalid && (
								<FieldError errors={[fieldState.error]} />
							)}
						</Field>
					)}
				/>

				{/* LinkedIn */}
				<Controller
					name="linkedin"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel>LinkedIn</FieldLabel>
							<Input
								{...field}
								placeholder="https://linkedin.com/in/username"
								aria-invalid={fieldState.invalid}
							/>
							{fieldState.invalid && (
								<FieldError errors={[fieldState.error]} />
							)}
						</Field>
					)}
				/>

				{/* Portfolio */}
				<Controller
					name="portfolio"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel>Portfolio</FieldLabel>
							<Input
								{...field}
								placeholder="https://your-portfolio.com"
								aria-invalid={fieldState.invalid}
							/>
							{fieldState.invalid && (
								<FieldError errors={[fieldState.error]} />
							)}
						</Field>
					)}
				/>
			</CardContent>

			<CardFooter className="flex flex-col gap-3">
				{/* SAVE / UPDATE */}
				<Button
					type="button"
					variant="secondary"
					className="w-full"
					disabled={loading}
					onClick={form.handleSubmit(onSaveLinks)}
				>
					{loading
						? "Saving..."
						: linksSaved
							? "Update links"
							: "Save links"}
				</Button>

				{/* FINISH — only after save */}
				{linksSaved && (
					<Button
						onClick={onFinish}
						disabled={finishing}
						className="w-full"
					>
						{finishing ? "Finishing..." : "Finish onboarding"}
					</Button>
				)}
			</CardFooter>
		</Card>
	);
}
