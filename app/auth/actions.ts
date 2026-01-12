"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function signupUser(formData: {
	name: string;
	email: string;
	password: string;
}) {
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
		console.error("Error during signup:", error);
		return { success: false, error: error.message };
	}

	return { success: true };
}

export async function loginUser(formData: { email: string; password: string }) {
	if (formData.email === "" || formData.password === "") {
		return { success: false, error: "All fields required" };
	}
	const supabase = await createClient();
	
	const { data, error } = await supabase.auth.signInWithPassword({
		email: formData.email,
		password: formData.password,
	});
	if (error) {
		console.error("Error during login:", error);
		return { success: false, error: error.message };
	}
	return { success: true };
}

export async function signOut() {
	const supabase = await createClient();
  const { error } = await supabase.auth.signOut()
	if(!error) {
		redirect('/auth/login');
	}
	console.error("Error while logging out: ", error)
}