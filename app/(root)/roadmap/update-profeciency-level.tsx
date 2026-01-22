"use client"

import { useEffect, useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"
import { updateSkillProficiencyAction } from "@/lib/actions/roadmap.action"
import { Badge } from "@/components/ui/badge"

const LEVEL_LABELS: Record<number, string> = {
  1: "Beginner",
  2: "Basic",
  3: "Intermediate",
  4: "Advanced",
  5: "Expert",
}

export function UpdateProficiencyModal({
  open,
  onClose,
  skillId,
  current,
}: {
  open: boolean
  onClose: () => void
  skillId: string
  current: number
}) {
  const [value, setValue] = useState(current)
  const [isPending, startTransition] = useTransition()

  // 🔑 sync when modal reopens
  useEffect(() => {
    if (open) setValue(current)
  }, [open, current])

  function onSave() {
    startTransition(async () => {
      await updateSkillProficiencyAction(skillId, value)
      onClose()
    })
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Update proficiency level</DialogTitle>
          <DialogDescription>
            This directly affects your roadmap, readiness score, and skill gaps.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          {/* Current vs Selected */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Current level
            </span>
            <Badge variant="outline">
              {current} · {LEVEL_LABELS[current] ?? "Unknown"}
            </Badge>
          </div>

          {/* Slider */}
          <div className="space-y-3">
            <Slider
              min={1}
              max={5}
              step={1}
              value={[value]}
              onValueChange={v => setValue(v[0])}
            />

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Selected
              </span>
              <Badge>
                {value} · {LEVEL_LABELS[value]}
              </Badge>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2">
            <Button
              variant="ghost"
              onClick={onClose}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              onClick={onSave}
              disabled={isPending || value === current}
            >
              {isPending ? "Saving…" : "Update level"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
