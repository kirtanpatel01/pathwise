import { OnboardingHeader } from "@/components/onboarding/onboarding-header";

export default function OnboardingLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="bg-background">
			<OnboardingHeader />
			<div className="min-h-screen mt-12 flex justify-center items-center">
				{children}
			</div>
		</div>
	);
}


