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
import { Separator } from "@/components/ui/separator";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { loginUser } from "@/app/auth/actions";
import { useRouter } from "next/navigation";
import GoogleLoginBtn from "./google-login-btn";
import { createClient } from "@/lib/supabase/client";

const formSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(1, "Password is required"),
});

export function LoginForm(props: React.ComponentProps<typeof Card>) {
	const router = useRouter();

	const {
		control,
		handleSubmit,
		formState: { isSubmitting },
		reset,
	} = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(data: z.infer<typeof formSchema>) {
		try {
			const response = await loginUser(data);

			if (!response.success) {
				toast.error("Invalid credentials");
				return;
			}

			toast.success("Logged in successfully");
			reset();

			router.push(response.redirectTo || "/dashboard");
		} catch (error) {
			console.error(error);
			toast.error("Something went wrong");
		}
	}

	return (
		<Card {...props}>
			<CardHeader>
				<CardTitle>Login to your account</CardTitle>
				<CardDescription>
					Enter your credentials below to access your account
				</CardDescription>
			</CardHeader>

			<CardContent>
				<GoogleLoginBtn />
				<div className="my-4 flex items-center gap-3 text-sm text-muted-foreground">
					<Separator className="flex-1" />
					or
					<Separator className="flex-1" />
				</div>

				<form id="login-form" onSubmit={handleSubmit(onSubmit)}>
					<FieldGroup>
						{/* Email */}
						<Controller
							name="email"
							control={control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="email">
										Email
									</FieldLabel>
									<Input
										{...field}
										id="email"
										type="email"
										placeholder="e.g. name@example.com"
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
									<div className="flex items-center">
										<FieldLabel htmlFor="password">
											Password
										</FieldLabel>
										<a
											href="/auth/forgot-password"
											className="ml-auto text-xs underline-offset-4 hover:underline opacity-90"
										>
											Forgot password?
										</a>
									</div>
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
					</FieldGroup>
				</form>
			</CardContent>

			<CardFooter className="flex flex-col gap-4">
				<Button
					type="submit"
					form="login-form"
					className="w-full"
					disabled={isSubmitting}
				>
					{isSubmitting ? "Logging in…" : "Log In"}
				</Button>

				<FieldDescription className="px-6 text-center">
					Don&apos;t have an account?{" "}
					<a href="/auth/signup" className="underline">
						Sign up
					</a>
				</FieldDescription>
			</CardFooter>
		</Card>
	);
}
