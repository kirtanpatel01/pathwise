//roadmap/phase-accordion.tsx
"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { SkillCard } from "./skill-card"
import { PhaseAccordionProps, SkillGap } from "@/types/roadmap"

export function PhaseAccordion({
  phase,
  title,
  goal,
  skills,
}: PhaseAccordionProps) {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={phase === 1 ? `phase-${phase}` : undefined}
    >
      <AccordionItem value={`phase-${phase}`}>
        <AccordionTrigger className="text-left">
          <div>
            <p className="font-medium">
              Phase {phase}: {title}
            </p>
            <p className="text-sm text-muted-foreground">{goal}</p>
          </div>
        </AccordionTrigger>

        <AccordionContent className="space-y-3">
          {skills.map((skill: SkillGap) => (
            <SkillCard key={skill.skillId} {...skill} />
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
