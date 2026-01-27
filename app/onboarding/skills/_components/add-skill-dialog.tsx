import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check, Plus, Search } from "lucide-react";
import { useState } from "react";

interface DbSkill {
  id: string;
  name: string;
  category: string;
}

interface AddSkillDialogProps {
  availableSkills: DbSkill[];
  userSkillIds: string[];
  onAddSkill: (skill: DbSkill) => void;
}

export function AddSkillDialog({ availableSkills, userSkillIds, onAddSkill }: AddSkillDialogProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = (skill: DbSkill) => {
    onAddSkill(skill);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Plus className="size-3.5" /> Add Skill
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {/* <Search size={16} /> */}
            Find a skill
          </DialogTitle>
        </DialogHeader>
        <Command>
          <CommandInput placeholder="Search explicitly (e.g. React, Docker)…" />
          <CommandList>
            <CommandEmpty>No skill found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              {availableSkills.map((skill) => {
                const isSelected = userSkillIds.includes(skill.id);
                return (
                  <CommandItem
                    key={skill.id}
                    value={skill.name}
                    onSelect={() => handleSelect(skill)}
                    disabled={isSelected}
                    className="flex justify-between items-center"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">{skill.name}</span>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                        {skill.category}
                      </span>
                    </div>
                    {isSelected && <Check className="size-4 text-primary" />}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
