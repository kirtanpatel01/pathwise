"use client";

import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";

import {
	profileSchema,
	ProfileFormData,
} from "./schema";
import { useOnboardingStore } from "@/stores/onboarding.store";
import { updateProfile } from "./actions";

import {
	Field,
	FieldLabel,
	FieldError,
	FieldDescription,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@/components/ui/select";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";

export function ProfileForm() {
	const router = useRouter();
	const { profile, setProfile, setStep, setMaxStepCompleted } =
		useOnboardingStore();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const hasProfile = Boolean(profile.full_name);

	const form = useForm<ProfileFormData>({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			full_name: profile.full_name ?? "",
			institute: profile.institute ?? "",
			status: profile.status,
			graduation_year: profile.graduation_year,
			location: profile.location ?? "",
		},
	});

	const status = form.watch("status");

	async function onSubmit(data: ProfileFormData) {
		setIsSubmitting(true);
		
    try {
      await updateProfile(data); // Server Action
      
      // Zustand update
      setProfile(data);
      setStep(2);
      setMaxStepCompleted(1);
      
      router.push("/onboarding/role");
    } catch (error) {
      toast.error("Failed to save profile information.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
	}

	const currentYear = new Date().getFullYear();
	const graduationYears = Array.from(
		{ length: 7 },
		(_, i) => currentYear + i,
	);

	return (
		<Card className="max-w-3xl mx-auto rounded-none sm:rounded-xl">
			<CardHeader>
				<CardTitle>Tell us about yourself</CardTitle>
				<CardDescription>
					This helps us personalize your learning path.
				</CardDescription>
			</CardHeader>

			<CardContent>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-6"
					noValidate
				>
					{/* Full Name */}
					<Controller
						name="full_name"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor={field.name}>
									Full name
								</FieldLabel>
								<Input
									{...field}
									id={field.name}
									placeholder="John Doe"
									aria-invalid={fieldState.invalid}
								/>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>

					{/* Institute */}
					<Controller
						name="institute"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor={field.name}>
									Institute
								</FieldLabel>
								<Input
									{...field}
									id={field.name}
									placeholder="Parul University"
									aria-invalid={fieldState.invalid}
								/>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>

					{/* Status */}
					<Controller
						name="status"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel>Status</FieldLabel>
								<Select
									value={field.value}
									onValueChange={field.onChange}
								>
									<SelectTrigger
										aria-invalid={fieldState.invalid}
									>
										<SelectValue placeholder="Select status" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="student">
											Student
										</SelectItem>
										<SelectItem value="graduate">
											Graduate
										</SelectItem>
										<SelectItem value="professional">
											Professional
										</SelectItem>
									</SelectContent>
								</Select>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>

					{/* Graduation Year */}
					{status === "student" && (
						<Controller
							name="graduation_year"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel>Graduation year</FieldLabel>

									<Select
										value={field.value?.toString()}
										onValueChange={(value) =>
											field.onChange(Number(value))
										}
									>
										<SelectTrigger
											aria-invalid={fieldState.invalid}
										>
											<SelectValue placeholder="Select graduation year" />
										</SelectTrigger>

										<SelectContent>
											{graduationYears.map((year) => (
												<SelectItem
													key={year}
													value={year.toString()}
												>
													{year}
												</SelectItem>
											))}
										</SelectContent>
									</Select>

									<FieldDescription>
										Expected year of graduation
									</FieldDescription>

									{fieldState.invalid && (
										<FieldError
											errors={[fieldState.error]}
										/>
									)}
								</Field>
							)}
						/>
					)}

					{/* Location */}
					<Controller
						name="location"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor={field.name}>
									Location
								</FieldLabel>
								<Input
									{...field}
									id={field.name}
									placeholder="India"
									aria-invalid={fieldState.invalid}
								/>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>

					<Button
						type="submit"
						className="w-full"
						disabled={isSubmitting}
					>
						{isSubmitting
							? "Saving..."
							: hasProfile
								? "Update"
								: "Continue"}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
