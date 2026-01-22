// roadmap/readiness-overview.tsx
import { Progress } from "@/components/ui/progress"

export function ReadinessOverview({ value }: { value: number }) {
  const label =
    value >= 70
      ? "Job Ready"
      : value >= 40
      ? "Progressing"
      : "Beginner"

  return (
    <div className="rounded-lg border p-4 space-y-2">
      <p className="text-sm text-muted-foreground">
        Readiness Score
      </p>
      <p className="text-2xl font-semibold">{value}%</p>
      <Progress value={value} />
      <p className="text-sm">{label}</p>
    </div>
  )
}
