"use client";

import { useRouter } from "next/navigation";
import { useOnboardingStore } from "@/stores/onboarding.store";
import { cn } from "@/lib/utils";

const steps = [
	{ id: 1, label: "Profile", path: "/onboarding/profile" },
	{ id: 2, label: "Role", path: "/onboarding/role" },
	{ id: 3, label: "Skills", path: "/onboarding/skills" },
	{ id: 4, label: "Links", path: "/onboarding/links" },
];

export default function Stepper() {
  const router = useRouter();
  const step = useOnboardingStore((s) => s.step);
  const setStep = useOnboardingStore((s) => s.setStep);
  const maxStepCompleted = useOnboardingStore(
    (s) => s.maxStepCompleted
  );

  return (
    <div
      className={cn(
        // mobile fixed header
        "fixed top-0 left-0 right-0 z-40 bg-background border-b",
        "px-4 py-3",
        "lg:static lg:border-none lg:px-0 lg:py-0"
      )}
    >
      <div className="flex items-center justify-between gap-2 mx-auto">
        {steps.map((s, index) => {
          const isClickable = s.id <= maxStepCompleted;

          return (
            <button
              key={s.id}
              type="button"
              disabled={!isClickable}
              onClick={() => {
                if (!isClickable) return;
                setStep(s.id);
                router.push(s.path);
              }}
              className={cn(
                "flex items-center gap-2 flex-1",
                !isClickable && "cursor-not-allowed"
              )}
            >
              <div
                className={cn(
                  "flex items-center justify-center rounded-full text-sm font-medium",
                  "h-8 w-8",
                  s.id === step
                    ? "bg-primary text-primary-foreground"
                    : isClickable
                    ? "bg-primary/20 text-primary"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {s.id}
              </div>

              {/* labels only desktop */}
              <span className="hidden sm:inline text-sm">
                {s.label}
              </span>

              {index < steps.length - 1 && (
                <div className="hidden sm:block flex-1 h-px bg-border mx-2" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
