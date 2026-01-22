"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { SkillCardProps } from "@/types/roadmap"
import { UpdateProficiencyModal } from "./update-profeciency-level"
export function SkillCard({
  skillId,
  skillName,
  category,
  gapType,
  currentProficiency,
  requiredProficiency,
}: SkillCardProps) {
  const [open, setOpen] = useState(false)

  const current = currentProficiency ?? 0
  const progress =
    requiredProficiency > 0
      ? Math.min((current / requiredProficiency) * 100, 100)
      : 0

  return (
    <div className="rounded-lg border p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">{skillName}</h3>
        <Badge variant="secondary">{category}</Badge>
      </div>

      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">
          Proficiency: {current} → {requiredProficiency}
        </p>
        <Progress value={progress} />
        <p className="text-xs text-muted-foreground">
          {gapType === "missing"
            ? "Required for this role"
            : `Improve to level ${requiredProficiency}`}
        </p>
      </div>

      <div className="flex justify-between">
        <p className="text-sm text-muted-foreground">
          {current >= requiredProficiency
            ? "Requirement met"
            : "Needs improvement"}
        </p>

        <Button size="sm" onClick={() => setOpen(true)}>
          Update proficiency
        </Button>

        <UpdateProficiencyModal
          open={open}
          onClose={() => setOpen(false)}
          skillId={skillId}
          current={current}
        />
      </div>
    </div>
  )
}
