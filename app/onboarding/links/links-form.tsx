"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useOnboardingStore } from "@/stores/onboarding.store";
import { linksSchema, LinksFormData } from "./schema";
import { updateUserLinks, completeOnboarding } from "./actions"; // Server Actions

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
import { Github, Linkedin } from "lucide-react";

export function LinksForm() {
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
		const github = links.github?.replace("https://github.com/", "") ?? "";
		const linkedin = links.linkedin?.replace("https://linkedin.com/in/", "") ?? "";
		
		form.reset({
			github,
			linkedin,
			portfolio: links.portfolio ?? "",
		});

		setLinksSaved(Boolean(links.github));
	}, [links]);

	// SAVE / UPDATE ONLY
	async function onSaveLinks(data: LinksFormData) {
		setLoading(true);

    try {
			// Construct full URLs for local store
			const fullData = {
				...data,
				github: `https://github.com/${data.github}`,
				linkedin: data.linkedin
					? `https://linkedin.com/in/${data.linkedin}`
					: "",
			};

			await updateUserLinks(data); // Server Action (Usernames)
			setLinks(fullData); // Local Store (URLs)
			setLinksSaved(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
	}

	// FINISH ONLY (REDIRECT)
	async function onFinish() {
		setFinishing(true);
    
    try {
      await completeOnboarding(); // Server Action
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      setFinishing(false);
    }
	}

	return (
		<Card className="max-w-xl mx-auto rounded-none sm:rounded-xl">
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
							<div className="flex rounded-lg shadow-sm shadow-black/5">
								<span className="inline-flex items-center rounded-l-lg border border-r-0 border-input bg-muted px-3 text-muted-foreground">
									<Github className="size-4" />
								</span>
								<Input
									{...field}
									className="rounded-l-none text-left"
									placeholder="username"
									aria-invalid={fieldState.invalid}
								/>
							</div>
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
							<div className="flex rounded-lg shadow-sm shadow-black/5">
								<span className="inline-flex items-center rounded-l-lg border border-r-0 border-input bg-muted px-3 text-muted-foreground">
									<Linkedin className="size-4" />
								</span>
								<Input
									{...field}
									className="rounded-l-none text-left"
									placeholder="username"
									aria-invalid={fieldState.invalid}
								/>
							</div>
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
