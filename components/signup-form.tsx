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
  const router = useRouter()
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	async function onSubmit(data: z.infer<typeof formSchema>) {
		console.log("Form submitted:", data);
    try {
      const response = await signupUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      if(response.success) {
        toast.success("Account created successfully!")
        form.reset();
        router.push('/auth/signup-success');
      } else {
        toast.error("Signup failed. Please try again.")
      }
    } catch (error) {
      console.log("Error while signing up the user: ", error)
      toast.error("An error occurred during signup. Please try again.")
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
				<Button variant="outline" type="button" className="w-full">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						x="0px"
						y="0px"
						width="100"
						height="100"
						viewBox="0 0 48 48"
					>
						<path
							fill="#FFC107"
							d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
						></path>
						<path
							fill="#FF3D00"
							d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
						></path>
						<path
							fill="#4CAF50"
							d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
						></path>
						<path
							fill="#1976D2"
							d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
						></path>
					</svg>
					<span>Sign up with Google</span>
				</Button>
				<div className="my-4 flex items-center gap-3 text-sm text-muted-foreground">
					<Separator className="flex-1" />
					or
					<Separator className="flex-1" />
				</div>
				<form id="signup-form" onSubmit={form.handleSubmit(onSubmit)}>
					<FieldGroup>
						<Controller
							name="name"
							control={form.control}
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
							control={form.control}
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
							control={form.control}
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
							control={form.control}
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
						onClick={() => form.reset()}
            className="flex-1"
					>
						Reset
					</Button>
					<Button type="submit" form="signup-form" className="flex-1">Create Account</Button>
				</Field>
				<FieldDescription className="px-6 text-center">
					Already have an account? <a href="/auth/login">Sign in</a>
				</FieldDescription>
			</CardFooter>
		</Card>
	);
}
