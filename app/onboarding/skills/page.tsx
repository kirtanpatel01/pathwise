"use client";

import { useRouter } from "next/navigation";
import { AlertCircle, ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AnimatePresence } from "motion/react";
import useSWR from "swr";

import { SkillCard } from "./_components/skill-card";
import { AddSkillDialog } from "./_components/add-skill-dialog";
import { SkillsLoader } from "./_components/skills-loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

import { DbSkill, UserSkill } from "./types";
import { 
  getAvailableSkills, 
  getUserProfileAndSkills, 
  updateUserRole, 
  deleteUserSkill, 
  addUserSkill,
  updateUserSkill
} from "./actions";
import { Separator } from "@/components/ui/separator";

const MOCK_ROLES = [
  "Software Engineer",
  "Frontend Engineer",
  "Backend Engineer",
  "Full Stack Engineer",
  "Mobile Engineer",
  "DevOps Engineer",
  "Data Scientist",
  "AI/ML Engineer",
  "Product Manager",
  "UI/UX Designer",
];

export default function Step2SkillsPage() {
  const router = useRouter();

  // Immutable fetch for available skills (only fetches once)
  const { data: availableSkills = [] } = useSWR<DbSkill[]>(
    "availableSkills", 
    getAvailableSkills,
    { revalidateOnFocus: false }
  );

  // Poll for profile status and skills until completed
  const { data: profileData, mutate } = useSWR(
    "userProfileAndSkills",
    getUserProfileAndSkills,
    {
      refreshInterval: (data) => {
        return (data?.status === "processing" || data?.status === "idle") ? 2000 : 0;
      }
    }
  );

  const status = profileData?.status || "idle";
  const userSkills = profileData?.skills || [];
  const role = profileData?.role || "";

  const handleRoleChange = async (newRole: string) => {
    // Optimistic update
    mutate(
      { ...profileData!, role: newRole }, 
      { revalidate: false }
    );
    
    try {
      await updateUserRole(newRole);
      toast.success("Role updated");
      mutate(); // Revalidate to be sure
    } catch (error) {
      toast.error("Failed to update role");
      mutate(); // Revert on error
    }
  };

  const handleDelete = async (skillId: string) => {
    // Optimistic update
    const previousSkills = userSkills;
    const newSkills = userSkills.filter(s => s.skill_id !== skillId);
    
    mutate(
      { ...profileData!, skills: newSkills },
      { revalidate: false }
    );

    try {
      await deleteUserSkill(skillId);
      toast.success("Skill removed");
      mutate();
    } catch (error) {
      // Revert
      mutate(
        { ...profileData!, skills: previousSkills },
        { revalidate: false }
      );
      toast.error("Failed to delete skill");
    }
  };

  const handleAddSkill = async (skill: DbSkill) => {
    if (userSkills.some(s => s.skills.id === skill.id)) {
      toast.error("You already have this skill");
      return;
    }

    // Create optimistic skill object
    const optimisticSkill: UserSkill = {
      skill_id: skill.id, 
      proficiency: "intermediate",
      evidence: "Manual entry",
      skills: skill
    };

    const previousSkills = userSkills;
    const newSkills = [...userSkills, optimisticSkill];

    mutate(
      { ...profileData!, skills: newSkills },
      { revalidate: false }
    );

    try {
      await addUserSkill(skill);
      toast.success("Skill added");
      mutate(); // Revalidate to get real IDs/state
    } catch (error) {
      // Revert
      mutate(
        { ...profileData!, skills: previousSkills },
        { revalidate: false }
      );
      toast.error("Failed to add skill");
    }
  };

  const handleUpdateSkill = async (skillId: string, proficiency: string) => {
    // Optimistic update
    const previousSkills = userSkills;
    const newSkills = userSkills.map(s => 
      s.skill_id === skillId ? { ...s, proficiency: proficiency as any } : s
    );

    mutate(
      { ...profileData!, skills: newSkills },
      { revalidate: false }
    );

    try {
      await updateUserSkill(skillId, proficiency);
      toast.success("Proficiency updated");
      mutate();
    } catch (error) {
      // Revert
      mutate(
        { ...profileData!, skills: previousSkills },
        { revalidate: false }
      );
      console.log(error);
      toast.error("Failed to update proficiency");
    }
  };

  if (status === "processing" || status === "idle") {
    return <SkillsLoader />;
  }

  if (status === "failed") {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="max-w-md w-full border-destructive/20 bg-destructive/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertCircle className="size-5" /> Analysis Failed
            </CardTitle>
            <CardDescription>
              We couldn't analyze your GitHub profile. Please check if your profile is public or try adding skills manually.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => window.location.reload()}>Try Again</Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto w-full p-2 sm:p-6 lg:p-10 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-4">
        <div className="space-y-4 md:space-y-1">
          <div>
              <h1 className="text-xl sm:text-3xl font-bold tracking-tight">Verified Skills</h1>
              <p className="text-muted-foreground text-sm max-w-lg leading-relaxed">
                We found <span className="text-primary font-medium">{userSkills.length} skills</span> based on your code.
              </p>
          </div>
          
          <div className="flex flex-col gap-2 min-w-[200px]">
             <Label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Primary Role</Label>
             <Select value={role} onValueChange={handleRoleChange}>
                <SelectTrigger className="h-9">
                    <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                  <SelectContent>
                    {/* Ensure the current role is an option even if not in the mock list */}
                    {role && !MOCK_ROLES.includes(role) && (
                      <SelectItem value={role}>{role}</SelectItem>
                    )}
                    {MOCK_ROLES.map((r) => (
                        <SelectItem key={r} value={r}>{r}</SelectItem>
                    ))}
                </SelectContent>
             </Select>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <AddSkillDialog
            availableSkills={availableSkills}
            userSkillIds={userSkills.map(s => s.skills.id)}
            onAddSkill={handleAddSkill}
          />
          <Button
            size="lg"
            onClick={() => router.push('/dashboard')}
            className="gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
          >
            Complete Onboarding <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>

      <Separator className="my-4 sm:my-6" /> 

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 pb-20">
        <AnimatePresence mode="popLayout">
          {userSkills.map((item) => (
            <SkillCard
              key={item.skill_id}
              skill={item}
              onDelete={handleDelete}
              onUpdate={handleUpdateSkill}
            />
          ))}
        </AnimatePresence>

        {userSkills.length === 0 && (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-border rounded-xl bg-muted/20">
            <p className="text-muted-foreground">No skills found. Try adding some manually.</p>
          </div>
        )}
      </div>
    </div>
  );
}

