"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function signupUser(formData: {
	name: string;
	email: string;
	password: string;
}) {
	console.log("Signing up user:", formData);
	if (
		formData.email === "" ||
		formData.password === "" ||
		formData.name === ""
	) {
		return { success: false, error: "All fields required" };
	}

	const supabase = await createClient();

	const { data, error } = await supabase.auth.signUp({
		email: formData.email,
		password: formData.password,
		options: {
			emailRedirectTo: `${process.env.SITE_URL}/auth/confirm?next=/onboarding`,
		},
	});

	if (error) {
		console.log("Error during signup:", error);
		return { success: false, error: error.message };
	}

	return { success: true };
}
