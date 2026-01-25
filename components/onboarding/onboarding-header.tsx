"use client";

import { useRouter } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function OnboardingHeader() {
  const router = useRouter();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-12 items-center border-b bg-background/60 px-1 sm:px-6 backdrop-blur-md">
      <div className="flex w-full items-center justify-between mx-auto max-w-7xl">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="gap-2 text-muted-foreground hover:text-foreground pl-0 hover:bg-transparent"
        >
          <ArrowLeft className="size-4" />
          Back
        </Button>

        <ModeToggle />
      </div>
    </header>
  );
}
