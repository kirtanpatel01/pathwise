import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

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

	const { error } = await supabase.auth.signUp({
		email: formData.email,
		password: formData.password,
		options: {
			emailRedirectTo: `${process.env.SITE_URL}/auth/confirm`,
		},
	});

	if (error) {
		console.error("Error during signup:", error);
		return { success: false, error: error.message };
	}

	return { success: true };
}

export async function loginUser({
	email,
	password,
}: {
	email: string;
	password: string;
}) {
	const supabase = await createClient();

	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error || !data.user) {
		return { success: false };
	}

  revalidatePath("/", "layout"); // Revalidate layout to update header state

	const userId = data.user.id;

	const { data: profile } = await supabase
		.from("profiles")
		.select("onboarding_step")
		.eq("user_id", userId)
		.maybeSingle();

	if (!profile || profile.onboarding_step < 4) {
		return {
			success: true,
			redirectTo: "/onboarding/profile",
		};
	}

	return {
		success: true,
		redirectTo: "/dashboard",
	};
}

export async function signOut() {
	const supabase = await createClient();
	const { error } = await supabase.auth.signOut();
  
  revalidatePath("/", "layout"); // Revalidate layout to update header state

	if (!error) {
		redirect("/auth/login");
	}
	console.error("Error while logging out: ", error);
}
