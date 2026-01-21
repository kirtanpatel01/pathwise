"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createClient } from "@/lib/supabase/client";
import { roleSchema, RoleFormData } from "@/lib/validations/role.schema";
import { useOnboardingStore } from "@/stores/onboarding.store";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function Step2RolePage() {
	const supabase = createClient();
	const router = useRouter();

	const { setStep, setMaxStepCompleted, setTargetRole } = useOnboardingStore();
	const roles = useOnboardingStore((s) => s.roles);
  const targetRole = useOnboardingStore((s) => s.targetRole);

	const [loading, setLoading] = useState(false);

	const form = useForm<RoleFormData>({
		resolver: zodResolver(roleSchema),
	});

	useEffect(() => {
			if (targetRole) {
				form.reset({ role_id: targetRole });
			}
	}, [targetRole]);

	const hasRole = Boolean(targetRole);

	async function onSubmit(data: RoleFormData) {
		setLoading(true);

		const {
			data: { user },
		} = await supabase.auth.getUser();

		if (!user) return;

		// 1️⃣ save target role
		const { error: roleError } = await supabase
			.from("user_target_role")
			.upsert(
				{
					user_id: user.id,
					role_id: data.role_id,
				},
				{ onConflict: "user_id" },
			);

		if (roleError) {
			console.error(roleError);
			setLoading(false);
			return;
		}

		// 2️⃣ advance onboarding step
		await supabase
			.from("profiles")
			.update({ onboarding_step: 3 })
			.eq("user_id", user.id);

		// 3️⃣ update state
    setTargetRole(data.role_id);
		setStep(3);
		setMaxStepCompleted(3);

		router.push("/onboarding/skills");
	}

	return (
		<div className="relative max-w-xl mx-auto">
			<Card>
				<CardHeader>
					<CardTitle>Select your target role</CardTitle>
				</CardHeader>

				<CardContent>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-6"
					>
						<Controller
							name="role_id"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel>Role</FieldLabel>

									<RadioGroup
										value={field.value}
										onValueChange={field.onChange}
										className="space-y-2"
									>
										{roles.map((role) => (
											<label
												key={role.id}
												className="flex items-center gap-3 border rounded-lg p-3 cursor-pointer"
											>
												<RadioGroupItem
													value={role.id}
												/>
												<span>{role.role_name}</span>
											</label>
										))}
									</RadioGroup>

									{fieldState.invalid && (
										<FieldError
											errors={[fieldState.error]}
										/>
									)}
								</Field>
							)}
						/>

						<Button
							type="submit"
							disabled={loading}
							className="w-full"
						>
							{loading
								? "Saving..."
								: hasRole
									? "Update"
									: "Continue"}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
