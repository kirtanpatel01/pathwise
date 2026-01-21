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
			{/* Desktop arrows */}
			<div className="hidden lg:block">
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
					className="absolute -left-20 top-1/2 -translate-y-1/2 h-14 w-14 rounded-full"
				>
					<ChevronLeft />
				</Button>

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
					className="absolute -right-20 top-1/2 -translate-y-1/2 h-14 w-14 rounded-full"
				>
					<ChevronRight />
				</Button>
			</div>

			{/* Mobile bottom navigation */}
			<div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t bg-background p-4 flex justify-between">
				<Button
					variant="outline"
					disabled={!canGoBack}
					onClick={() => {
						if (!canGoBack) return;
						const prev = step - 1;
						setStep(prev);
						router.push(`/onboarding/${routeFromStep(prev)}`);
					}}
				>
					Back
				</Button>

				<Button
					disabled={!canGoNext}
					onClick={() => {
						if (!canGoNext) return;
						const next = step + 1;
						setStep(next);
						router.push(`/onboarding/${routeFromStep(next)}`);
					}}
				>
					Next
				</Button>
			</div>
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
