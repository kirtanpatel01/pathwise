import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  Github, 
  Linkedin, 
  Globe, 
  MapPin, 
  GraduationCap, 
  Calendar, 
  Mail, 
  Award, 
  Code2, 
  ChevronRight, 
  UserCircle 
} from "lucide-react";

/**
 * Profile Page Component
 * Uses official Shadcn UI components with a modern dashboard layout.
 */
export default function Page() {
  // -----------------------------
  // Data
  // -----------------------------
  const profile = {
    full_name: "Kirtan Patel",
    institute: "Parul Institute of Technology",
    status: "Computer Science Student",
    graduation_year: 2026,
    location: "Gujarat, India",
    onboarding_step: 4,
    onboarding_completed: false,
    bio: "Passionate full-stack developer focusing on building scalable web applications and exploring the intersection of AI and user experience.",
    skills: ["React", "Node.js", "TypeScript", "Python", "Tailwind CSS", "PostgreSQL"],
  };

  const links = [
    { label: "GitHub", url: "https://github.com/kirtanpatel", icon: Github, color: "hover:text-black dark:hover:text-white" },
    { label: "LinkedIn", url: "https://linkedin.com/in/kirtanpatel", icon: Linkedin, color: "hover:text-blue-600" },
    { label: "Portfolio", url: "https://kirtan.dev", icon: Globe, color: "hover:text-indigo-500" },
    { label: "Email", url: "mailto:hello@kirtan.dev", icon: Mail, color: "hover:text-red-500" },
  ];

  const onboardingProgress = Math.round((profile.onboarding_step / 5) * 100);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-20">
      
      {/* Cover Section */}
      <div className="h-48 md:h-64 bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 relative">
        <div className="absolute inset-0 bg-black/5" />
      </div>

      {/* Main Content Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-20 relative z-10">
        
        {/* Profile Header Section */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-8">
          <div className="flex flex-col md:flex-row items-end gap-6 w-full md:w-auto">
            {/* Avatar Container */}
            <div className="p-1.5 bg-white dark:bg-slate-900 rounded-3xl shadow-xl">
              <div className="h-32 w-32 md:h-40 md:w-40 rounded-[1.25rem] bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden border-4 border-white dark:border-slate-900">
                 <UserCircle className="w-20 h-20 text-slate-300 dark:text-slate-600" />
              </div>
            </div>

            {/* Identity Info */}
            <div className="pb-2 text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center gap-3">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                  {profile.full_name}
                </h1>
                <Badge variant={profile.onboarding_completed ? "default" : "secondary"}>
                  {profile.onboarding_completed ? "Fully Verified" : "Account Setup"}
                </Badge>
              </div>
              <p className="text-lg text-slate-600 dark:text-slate-400 mt-1 flex items-center justify-center md:justify-start gap-2">
                <GraduationCap className="h-5 w-5" />
                {profile.status}
              </p>
            </div>
          </div>

          <div className="flex gap-3 pb-2 w-full md:w-auto">
            <Button variant="outline" className="flex-1 md:flex-none">Download CV</Button>
            <Button className="flex-1 md:flex-none">Edit Profile</Button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Details & Content */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* About / Bio Section */}
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <UserCircle className="h-5 w-5 text-indigo-500" />
                  About Me
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {profile.bio}
                </p>
                
                <Separator className="my-8" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="flex items-center gap-4 group">
                    <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/20 transition-colors">
                      <GraduationCap className="h-5 w-5 text-indigo-500" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Institute</p>
                      <p className="text-sm font-medium">{profile.institute}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 group">
                    <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/20 transition-colors">
                      <MapPin className="h-5 w-5 text-indigo-500" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Location</p>
                      <p className="text-sm font-medium">{profile.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 group">
                    <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/20 transition-colors">
                      <Calendar className="h-5 w-5 text-indigo-500" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Graduation</p>
                      <p className="text-sm font-medium">Class of {profile.graduation_year}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 group">
                    <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/20 transition-colors">
                      <Award className="h-5 w-5 text-indigo-500" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Specialization</p>
                      <p className="text-sm font-medium">Full Stack Development</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Technical Skills Card */}
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Code2 className="h-5 w-5 text-indigo-500" />
                  Technical Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill) => (
                    <Badge 
                      key={skill} 
                      variant="secondary" 
                      className="px-4 py-1.5 text-sm font-medium bg-slate-100 dark:bg-slate-800 hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-600 transition-colors cursor-default"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Sidebar Stats & Actions */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Setup Progress Sidebar Card */}
            <Card className="border-none shadow-sm bg-indigo-50/50 dark:bg-indigo-950/20">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-indigo-900 dark:text-indigo-100">Profile Strength</h3>
                  <span className="text-sm font-bold text-indigo-600">{onboardingProgress}%</span>
                </div>
                <Progress value={onboardingProgress} className="bg-indigo-100 dark:bg-indigo-900" />
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-4 leading-relaxed">
                  A complete profile is 5x more likely to get noticed by potential recruiters.
                </p>
                <Button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700">
                  Continue Onboarding
                </Button>
              </CardContent>
            </Card>

            {/* Social Links Sidebar Card */}
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Connect</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {links.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-between p-3 rounded-xl border border-slate-50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group ${link.color}`}
                  >
                    <div className="flex items-center gap-3">
                      <link.icon className="h-5 w-5" />
                      <span className="text-sm font-medium">{link.label}</span>
                    </div>
                    <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-slate-400" />
                  </a>
                ))}
              </CardContent>
            </Card>

            {/* Achievement Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
               <Card className="border-none shadow-sm p-4 text-center">
                  <p className="text-2xl font-bold text-indigo-600">12</p>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-tighter">Projects</p>
               </Card>
               <Card className="border-none shadow-sm p-4 text-center">
                  <p className="text-2xl font-bold text-indigo-600">4.8</p>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-tighter">GPA</p>
               </Card>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}