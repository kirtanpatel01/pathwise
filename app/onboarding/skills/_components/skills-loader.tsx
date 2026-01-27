import { Loader2 } from "lucide-react";

export function SkillsLoader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-2xl mx-auto text-center space-y-8 relative">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full z-0 opacity-50" />

      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
          <div className="relative bg-background/50 p-4 rounded-full border border-primary/20 backdrop-blur-sm">
            <Loader2 className="size-12 animate-spin text-primary" />
          </div>
        </div>

        <div className="space-y-3 max-w-md">
          <h2 className="text-3xl font-bold tracking-tight bg-linear-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
            Analyzing GitHub Profile
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            We're extracting your tech stack, inferring proficiency levels, and generating your developer persona.
            <br />
            <span className="text-xs opacity-70 mt-2 block">Typically takes 10-20 seconds.</span>
          </p>
        </div>

        <div className="w-full max-w-sm bg-card/50 border border-border rounded-xl p-4 text-xs font-mono backdrop-blur-md shadow-sm">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-primary">
              <span className="size-1.5 rounded-full bg-primary" /> Connected to GitHub
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="size-3 animate-spin" /> Parsing repositories & commits...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
