import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { motion } from "motion/react";

interface SkillCardProps {
  skill: {
    skill_id: string;
    proficiency: "beginner" | "intermediate" | "advanced";
    evidence: string;
    skills: {
      name: string;
      category: string;
    };
  };
  onDelete: (id: string) => void;
}

export function SkillCard({ skill, onDelete }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="group hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="capitalize">{skill.skills.name}</CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant={skill.proficiency === "advanced" ? "default" : skill.proficiency === "intermediate" ? "secondary" : "outline"}>
                {skill.proficiency}
              </Badge>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => onDelete(skill.skill_id)}
              >
                <Trash2 className="size-3.5" />
              </Button>
            </div>
          </div>
          <CardDescription className="font-mono text-xs">
            {skill.skills.category}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p
            className="text-xs text-muted-foreground italic truncate"
            title={skill.evidence}
          >
            "{skill.evidence}"
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
