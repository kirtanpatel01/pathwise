"use client";

import { useRouter } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function OnboardingHeader() {
  const router = useRouter();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-12 items-center border-b bg-background/60 px-1 sm:px-6 backdrop-blur-md">
      <div className="flex w-full items-center justify-between mx-auto max-w-7xl">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.back()}
            className="gap-2 text-muted-foreground hover:text-foreground pl-0 hover:bg-transparent rounded-full"
          >
            <ChevronLeft className="size-3" />
            <span className="hidden sm:block">Back</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.forward()}
            className="gap-2 text-muted-foreground hover:text-foreground pl-0 hover:bg-transparent rounded-full"
          >
            <span className="hidden sm:block">Next</span>
            <ChevronRight className="size-3" />
          </Button>
        </div>

        <ModeToggle />
      </div>
    </header>
  );
}
