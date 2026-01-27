import { inngest } from "../client";
import { fetchGithubStats } from "@/lib/github";
import { GoogleGenAI } from "@google/genai";
import { createClient } from "@supabase/supabase-js";

export const generateProfileInsights = inngest.createFunction(
  { id: "generate-profile-insights" },
  { event: "user.onboarding.started" },
  async ({ event, step }) => {
    const { userId, githubUsername } = event.data;
    console.log("[Inngest] Starting analysis", { userId, githubUsername });

    // Use Service Role Key to bypass RLS for background updates
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    await step.run("update-status-processing", async () => {
      await supabase
        .from("profiles")
        .update({ github_verification_status: "processing" })
        .eq("user_id", userId);
    });

    const githubStats = await step.run("fetch-github-stats", async () => {
      console.log("[Inngest] Fetching GitHub stats...");
      if (!githubUsername) return null;
      return fetchGithubStats(githubUsername);
    });

    if (!githubStats) {
      await supabase
        .from("profiles")
        .update({ github_verification_status: "failed" })
        .eq("user_id", userId);
      return;
    }

    // ---------------- AI STEP ----------------
    const insights = await step.run("analyze-profile", async () => {
      console.log("[Inngest] Analyzing with Gemini 2.5 flash...");

      const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
      if (!apiKey) throw new Error("GOOGLE_GENERATIVE_AI_API_KEY missing");

      const ai = new GoogleGenAI({ apiKey });

      const prompt = `
        Analyze this GitHub profile and return ONLY valid JSON.

        Schema:
        {
          "skills": [
            {
              "name": string, // Normalized, lowercase, single tech name
              "category": string,
              "proficiency": "beginner" | "intermediate" | "advanced",
              "evidence": string
            }
          ],
          "suggested_role": string, // Specific job title (e.g. "Frontend Engineer")
          "bio_summary": string // Professional summary (max 200 chars)
        }

        CRITICAL INSTRUCTIONS FOR SKILLS:
        1. SINGLE CONCEPTS ONLY:
          - "React/Next.js" -> SPLIT into "React" and "Next.js"
          - "HTML5/CSS3" -> SPLIT into "HTML" and "CSS"
        2. PREFERRED NAMES (STRICT):
          - "React" (NOT React.js, ReactJS)
          - "Next.js" (NOT NextJS)
          - "Node.js" (NOT NodeJS, Node)
          - "TypeScript" (NOT TS)
          - "JavaScript" (NOT JS)
          - "PostgreSQL" (NOT Postgres)
        3. NO DUPLICATES: If you have "React" and "Next.js", do NOT add "React.js" again.

        GitHub Data:
        ${JSON.stringify(githubStats, null, 2)}
      `;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
        config: {
          responseMimeType: "application/json",
        },
      });

      const raw = response.text;
      if (!raw) throw new Error("Empty Gemini response");

      const cleaned = raw.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(cleaned);

      console.log("[Inngest] Gemini OK", {
        skills: parsed.skills?.length,
      });

      return parsed;
    });

    const saveResult = await step.run("save-relational-data", async () => {
      if (!insights?.skills) return { success: false, reason: "No skills found in insights" };

      const { skills, suggested_role, bio_summary } = insights;

      const skillRows = skills.map((s: any) => ({
        name: s.name.toLowerCase().trim(),
        category: s.category,
        description: "Auto-detected from GitHub",
      }));

      const { data: upsertedSkills, error: skillsError } = await supabase
        .from("skills")
        .upsert(skillRows, { onConflict: "name" })
        .select("id, name");

      if (skillsError) throw new Error(`Failed to upsert skills: ${skillsError.message}`);

      const map = new Map(upsertedSkills?.map((s) => [s.name, s.id]));

      const userSkills = skills
        .map((s: any) => {
          const id = map.get(s.name.toLowerCase().trim());
          if (!id) return null;
          return {
            user_id: userId,
            skill_id: id,
            proficiency: s.proficiency,
            evidence: s.evidence,
          };
        })
        .filter(Boolean);

      if (userSkills.length) {
        const { error: userSkillsError } = await supabase
          .from("user_skills")
          .upsert(userSkills, { onConflict: "user_id,skill_id" });

        if (userSkillsError) throw new Error(`Failed to link user skills: ${userSkillsError.message}`);
      }

      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          role: suggested_role,
          bio: bio_summary,
          github_stats: githubStats,
          github_verification_status: "completed",
        })
        .eq("user_id", userId);

      if (profileError) throw new Error(`Failed to update profile: ${profileError.message}`);

      return {
        success: true,
        skills_saved: userSkills.length,
        profile_updated: true,
      };
    });

    return { success: true, role: insights.suggested_role };
  },
);
