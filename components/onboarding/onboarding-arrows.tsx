"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useOnboardingStore } from "@/stores/onboarding.store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function OnboardingArrows() {
	const router = useRouter();

	const step = useOnboardingStore((s) => s.step);
const setStep = useOnboardingStore((s) => s.setStep);

	const maxStepCompleted = useOnboardingStore((s) => s.maxStepCompleted);

	const canGoBack = step > 1;
	const canGoNext = step < maxStepCompleted;

	return (
		<>
			{/* Left Arrow */}
			<Button
				variant="secondary"
				size="icon"
				disabled={!canGoBack}
				onClick={() => {
					if (!canGoBack) return;
					const prev = step - 1;
					setStep(prev);
					router.push(`/onboarding/${routeFromStep(prev)}`);
				}}
				className={cn(
					"absolute -left-36 top-96",
					"h-16 w-16 rounded-full shadow-md",
				)}
			>
				<ChevronLeft className="h-16 w-16" />
			</Button>

			{/* Right Arrow */}
			<Button
				variant="secondary"
				size="icon"
				disabled={!canGoNext}
				onClick={() => {
					if (!canGoNext) return;
					const next = step + 1;
					setStep(next);
					router.push(`/onboarding/${routeFromStep(next)}`);
				}}
				className={cn(
					"absolute -right-36 top-96",
					"h-16 w-16 rounded-full shadow-md",
				)}
			>
				<ChevronRight className="h-16 w-16" />
			</Button>
		</>
	);
}

function routeFromStep(step: number) {
	switch (step) {
		case 1:
			return "profile";
		case 2:
			return "role";
		case 3:
			return "skills";
		case 4:
			return "links";
		default:
			return "profile";
	}
}
