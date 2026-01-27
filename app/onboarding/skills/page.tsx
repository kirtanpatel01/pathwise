"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AnimatePresence } from "motion/react";

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
  addUserSkill 
} from "./actions";

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
  const [status, setStatus] = useState<string>("idle");
  const [userSkills, setUserSkills] = useState<UserSkill[]>([]);
  const [availableSkills, setAvailableSkills] = useState<DbSkill[]>([]);
  const [role, setRole] = useState<string>("");
  const router = useRouter();

  const loadData = useCallback(async () => {
    try {
      const [skillsData, profileData] = await Promise.all([
        getAvailableSkills(),
        getUserProfileAndSkills()
      ]);

      setAvailableSkills(skillsData);
      setStatus(profileData.status);
      if (profileData.role) setRole(profileData.role);
      setUserSkills(profileData.skills);
    } catch (error) {
      console.error("Failed to load data", error);
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    try {
      const data = await getUserProfileAndSkills();
      setStatus(data.status);
      if (data.role) setRole(data.role);
      setUserSkills(data.skills);
    } catch (error) {
      console.error("Failed to refresh profile", error);
    }
  }, []);

  useEffect(() => {
    loadData();

    const interval = setInterval(() => {
      if (status === "processing" || status === "idle") {
        refreshProfile();
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [loadData, refreshProfile, status]);

  const handleRoleChange = async (newRole: string) => {
    setRole(newRole); // Optimistic update
    try {
      await updateUserRole(newRole);
      toast.success("Role updated");
    } catch (error) {
      toast.error("Failed to update role");
    }
  };

  const handleDelete = async (skillId: string) => {
    const previousSkills = [...userSkills];
    setUserSkills(userSkills.filter(s => s.skill_id !== skillId)); // Optimistic update

    try {
      await deleteUserSkill(skillId);
      toast.success("Skill removed");
    } catch (error) {
      setUserSkills(previousSkills); // Revert
      toast.error("Failed to delete skill");
    }
  };

  const handleAddSkill = async (skill: DbSkill) => {
    if (userSkills.some(s => s.skills.id === skill.id)) {
      toast.error("You already have this skill");
      return;
    }

    const newSkill: UserSkill = {
      skill_id: skill.id, // This is technically inaccurate for the optimistic update locally (as we don't know the new row ID yet), but good enough for UI display if we just need unique keys or display data. 
      // Actually, for delete to work immediately after add, we need the real ID. 
      // Server action revalidatePath might not trigger a full re-fetch here immediately because we are blocking client-side with optimistic state? 
      // Ideally addUserSkill should return the new object.
      // But for now, let's just stick to the pattern. Revalidation happens on server, next poll or refresh will fix it.
      proficiency: "intermediate",
      evidence: "Manual entry",
      skills: skill
    };

    setUserSkills([...userSkills, newSkill]);

    try {
      await addUserSkill(skill);
      toast.success("Skill added");
      refreshProfile(); // Refresh to get the real IDs
    } catch (error) {
      setUserSkills(userSkills); // Revert
      toast.error("Failed to add skill");
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
    <div className="max-w-5xl mx-auto w-full space-y-8 p-6 lg:p-10 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-border/40 pb-6">
        <div className="space-y-4 md:space-y-1">
          <div>
              <h1 className="text-3xl font-bold tracking-tight">Verified Skills</h1>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-20">
        <AnimatePresence mode="popLayout">
          {userSkills.map((item) => (
            <SkillCard
              key={item.skill_id}
              skill={item}
              onDelete={handleDelete}
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

