"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import { OnboardingFormData } from "./types";
import { onboardingSchema } from "./schema";
import { updateProfile } from "./_actions";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { PersonalInfo } from "./_components/personal-info";
import { SocialLinks } from "./_components/social-links";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info, Link, SquareArrowOutUpRight, SquareArrowUpRight } from "lucide-react";
import { useUser } from "@clerk/nextjs";

interface ProfileFormProps {
	initialData?: Partial<OnboardingFormData>;
}

export function ProfileForm({ initialData }: ProfileFormProps) {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { user } = useUser();

	const form = useForm<OnboardingFormData>({
		resolver: zodResolver(onboardingSchema),

		defaultValues: {
			institute: initialData?.institute || "",
			status: initialData?.status || undefined,
			graduation_year: initialData?.graduation_year || undefined,
			location: initialData?.location || "",
			github: initialData?.github || "",
			linkedin: initialData?.linkedin || "",
			portfolio: initialData?.portfolio || "",
			target_role: initialData?.target_role || "",
		},
	});

	async function onSubmit(data: OnboardingFormData) {
		setIsSubmitting(true);

		try {
			const { success, error } = await updateProfile(data);
			if (success) {
				toast.success("Profile saved successfully.");
				await user?.reload();
				router.push("/dashboard");
			} else {
				toast.error(error);
			}
		} catch (error) {
			toast.error("Failed to save profile information.");
			console.error(error);
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<Card className="flex-1">
			<CardHeader>
				<CardTitle className="flex items-center gap-3">
					<span>Profile Details</span>
					<Tooltip>
						<TooltipTrigger>
							<Info size={16} className="text-amber-600" />
						</TooltipTrigger>
						<TooltipContent>
							Please complete this information to get started.
						</TooltipContent>
					</Tooltip>
				</CardTitle>

				<CardDescription>
					This information helps us personalize your experience.
				</CardDescription>
			</CardHeader>

			<CardContent>
				<form
					id="profile-form"
					onSubmit={form.handleSubmit(onSubmit)}
					className="grid grid-cols-1 md:grid-cols-2 gap-8"
					noValidate
				>
					<div className="space-y-6">
						<PersonalInfo control={form.control} />
					</div>
					<div className="space-y-6">
						<SocialLinks control={form.control} />
					</div>
				</form>
			</CardContent>
			<CardFooter>
				<Button
					type="submit"
					form="profile-form"
					className="w-full h-11 text-base cursor-pointer"
					disabled={isSubmitting}
				>
					{isSubmitting ? "Saving…" : <span className="flex items-center gap-2">Save & Dashboard <SquareArrowOutUpRight /></span>}
				</Button>
			</CardFooter>
		</Card>
	);
}
