"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "./ui/separator";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { signupUser } from "@/app/auth/actions";
import { useRouter } from "next/navigation";

const formSchema = z
	.object({
		name: z.string().min(1, "Name is required"),
		email: z.string().email("Invalid email address"),
		password: z
			.string()
			.min(8, "Password must be at least 8 characters long"),
		confirmPassword: z.string().min(8, "Please confirm your password"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
	const router = useRouter();
	const {
		control,
		handleSubmit,
		formState: { isSubmitting },
		reset,
	} = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	async function onSubmit(data: z.infer<typeof formSchema>) {
		try {
			const response = await signupUser({
				name: data.name,
				email: data.email,
				password: data.password,
			});
			if (response.success) {
				toast.success("Account created successfully!");
				reset();
				router.push("/auth/signup-success");
			} else {
				toast.error("Signup failed. Please try again.");
			}
		} catch (error) {
			console.error("Error while signing up the user: ", error);
			toast.error("An error occurred during signup. Please try again.");
		}
	}

	return (
		<Card {...props}>
			<CardHeader>
				<CardTitle>Create an account</CardTitle>
				<CardDescription>
					Enter your information below to create your account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Button
					variant="outline"
					type="button"
					className="w-full"
					disabled={isSubmitting}
				>
					{isSubmitting ? "Please wait..." : "Login with Google"}
				</Button>
				<div className="my-4 flex items-center gap-3 text-sm text-muted-foreground">
					<Separator className="flex-1" />
					or
					<Separator className="flex-1" />
				</div>
				<form id="signup-form" onSubmit={handleSubmit(onSubmit)}>
					<FieldGroup>
						<Controller
							name="name"
							control={control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="name">
										Full Name
									</FieldLabel>
									<Input
										{...field}
										id="name"
										type="text"
										placeholder="John Doe"
										aria-invalid={fieldState.invalid}
										disabled={isSubmitting}
									/>
									{fieldState.invalid && (
										<FieldError
											errors={[fieldState.error]}
										/>
									)}
								</Field>
							)}
						/>
						<Controller
							name="email"
							control={control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="email">
										Email Address
									</FieldLabel>
									<Input
										{...field}
										id="email"
										type="email"
										placeholder="john.doe@example.com"
										aria-invalid={fieldState.invalid}
										disabled={isSubmitting}
									/>
									{fieldState.invalid && (
										<FieldError
											errors={[fieldState.error]}
										/>
									)}
								</Field>
							)}
						/>
						<Controller
							name="password"
							control={control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="password">
										Password
									</FieldLabel>
									<Input
										{...field}
										id="password"
										type="password"
										aria-invalid={fieldState.invalid}
										autoComplete="off"
										disabled={isSubmitting}
									/>
									{fieldState.invalid && (
										<FieldError
											errors={[fieldState.error]}
										/>
									)}
								</Field>
							)}
						/>
						<Controller
							name="confirmPassword"
							control={control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="confirmPassword">
										Confirm Password
									</FieldLabel>
									<Input
										{...field}
										id="confirmPassword"
										type="password"
										aria-invalid={fieldState.invalid}
										disabled={isSubmitting}
										autoComplete="off"
									/>
									{fieldState.invalid && (
										<FieldError
											errors={[fieldState.error]}
										/>
									)}
								</Field>
							)}
						/>
					</FieldGroup>
				</form>
			</CardContent>
			<CardFooter className="flex flex-col gap-4">
				<Field orientation="horizontal">
					<Button
						type="button"
						variant={"outline"}
						onClick={() => reset()}
						disabled={isSubmitting}
						className="flex-1"
					>
						Reset
					</Button>
					<Button
						type="submit"
						form="signup-form"
						className="flex-1"
						disabled={isSubmitting}
					>
						Create Account
					</Button>
				</Field>
				<FieldDescription className="px-6 text-center">
					Already have an account? <a href="/auth/login">Sign in</a>
				</FieldDescription>
			</CardFooter>
		</Card>
	);
}
