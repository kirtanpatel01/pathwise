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
    <div className="flex items-center justify-between">
      {steps.map((s, index) => {
        // 🔥 THIS IS THE FIX
        const isClickable = s.id <= maxStepCompleted;

        return (
          <button
            key={s.id}
            type="button"
            aria-disabled={!isClickable}
            onClick={() => {
              if (!isClickable) return;
              setStep(s.id);      // current screen update
              router.push(s.path);
            }}
            className={cn(
              "flex-1 flex items-center",
              isClickable
                ? "cursor-pointer"
                : "cursor-not-allowed"
            )}
          >
            <div
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium",
                s.id === step
                  ? "bg-primary text-primary-foreground"
                  : isClickable
                  ? "bg-primary/20 text-primary"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {s.id}
            </div>

            <span className="ml-2 text-sm">{s.label}</span>

            {index < steps.length - 1 && (
              <div className="flex-1 h-px bg-border mx-4" />
            )}
          </button>
        );
      })}
    </div>
  );
}
