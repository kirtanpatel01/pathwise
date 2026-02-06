import { ProfileForm } from "./onboarding-form";

export default async function page() {

	const initialData = {
		full_name: "",
		institute: "",
		status: "student" as "student" | "graduate" | "professional",
		graduation_year: undefined,
		location: "",
		github: "",
		linkedin: "",
		portfolio: "",
		target_role: "",
	}
	return (
		<div className="max-w-5xl w-full mx-auto p-0 sm:p-6 min-h-screen flex items-center justify-center">
			<ProfileForm initialData={initialData} />
		</div>
	);
}
