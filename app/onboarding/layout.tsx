import { OnboardingHeader } from "@/components/onboarding/onboarding-header";

export default function OnboardingLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="bg-background">
			<OnboardingHeader />
			<div className="min-h-screen flex justify-center items-center pt-12">
				{children}
			</div>
		</div>
	);
}


