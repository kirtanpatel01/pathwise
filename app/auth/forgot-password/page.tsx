"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useState } from "react";

function page() {
	const [email, setEmail] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleForgotPassword = async (e: React.FormEvent) => {
		e.preventDefault();
		const supabase = createClient();
		setIsLoading(true);
		setError(null);

		try {
			const { error } = await supabase.auth.resetPasswordForEmail(email, {
				redirectTo: `${window.location.origin}/auth/reset-password`,
			});
			if (error) throw error;
			setSuccess(true);
		} catch (error) {
			setError((error as Error).message);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<div className="min-h-screen flex justify-center items-center">
			{success ? (
				<Card className="max-w-sm">
					<CardHeader>
						<CardTitle className="text-2xl">
							Check Your Email
						</CardTitle>
						<CardDescription>
							Password reset instructions sent
						</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-sm text-muted-foreground">
							If you registered using your email and password, you
							will receive a password reset email.
						</p>
					</CardContent>
				</Card>
			) : (
				<Card className="max-w-md w-full">
					<CardHeader>
						<CardTitle>Forgot Password</CardTitle>
						<CardDescription>
							Enter your email to reset your password.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form
							onSubmit={handleForgotPassword}
							className="flex flex-col gap-4"
						>
							<Field className="flex flex-col gap-1">
								<FieldLabel htmlFor="email">Email</FieldLabel>
								<Input
									type="email"
									id="email"
									name="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="example@mail.com"
									required
								/>
                <FieldError>{error}</FieldError>
							</Field>
							<Button
								type="submit"
								className="w-full"
								disabled={isLoading}
							>
								{isLoading ? "Sending..." : "Send reset email"}
							</Button>
							<div className="mt-4 text-center text-sm">
								Already have an account?{" "}
								<Link
									href="/auth/login"
									className="underline underline-offset-4"
								>
									Login
								</Link>
							</div>
						</form>
					</CardContent>
				</Card>
			)}
		</div>
	);
}

export default page;
