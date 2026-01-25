import { createClient } from "@/lib/supabase/server";
import { ProfileForm } from "./profile-form";
import { redirect } from "next/navigation";

export default async function Step1ProfilePage() {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		redirect("/auth/login");
	}

	const { data: profile } = await supabase
		.from("profiles")
		.select("*")
		.eq("user_id", user.id)
		.maybeSingle();

	// Format initial data matching the form schema
	const initialData = profile
		? {
				full_name: profile.full_name ?? "",
				institute: profile.institute ?? "",
				status: profile.status as any,
				graduation_year: profile.graduation_year ?? undefined,
				location: profile.location ?? "",
				github: profile.github?.replace("https://github.com/", "") ?? "",
				linkedin: profile.linkedin?.replace("https://linkedin.com/in/", "") ?? "",
				portfolio: profile.portfolio ?? "",
		  }
		: undefined;

	return (
		<div className="max-w-5xl w-full mx-auto sm:p-6">
			<ProfileForm initialData={initialData} />
		</div>
	);
}
