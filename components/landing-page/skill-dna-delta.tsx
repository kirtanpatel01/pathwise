"use client";

import { motion } from "motion/react";
import { Check, Clock, AlertCircle, Fingerprint, Zap } from "lucide-react";

function SkillDNADelta() {
  return (
    <section className="relative border-t bg-muted/20 py-24 overflow-hidden">
      {/* Background Decoration: Abstract DNA Helix shape */}
      <div className="absolute right-0 top-0 -z-10 opacity-5">
        <Fingerprint size={600} strokeWidth={0.5} />
      </div>

      <div className="landing-page-container">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          
          {/* Left Side: Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                <Zap className="h-3 w-3" />
                The Delta Analysis
              </div>
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Skill DNA, <br />
                <span className="text-primary italic">not guesswork</span>
              </h2>
            </div>

            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                Every student has a unique combination of skills,
                experience, and gaps. Pathwise captures this as your{" "}
                <strong className="text-foreground">Skill DNA</strong>.
              </p>
              <p>
                We then compare it against real-time job-role
                requirements to calculate your{" "}
                <strong className="text-foreground">Technical Delta</strong> — the exact skills
                you need to focus on next.
              </p>
            </div>

            <ul className="grid gap-4">
              {[
                "No generic roadmaps",
                "No outdated advice",
                "Skills that actually move the needle"
              ].map((item, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + (i * 0.1) }}
                  className="flex items-center gap-3 text-sm font-medium"
                >
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <Check className="h-3 w-3 stroke-[3px]" />
                  </div>
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right Side: Visual Illustration */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Decorative "Delta Score" Badge */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 z-20 rounded-2xl border bg-background/80 backdrop-blur-md p-4 shadow-xl"
            >
              <p className="text-[10px] font-bold uppercase text-muted-foreground">Tech Delta</p>
              <p className="text-2xl font-black text-destructive">-24%</p>
              <div className="mt-1 h-1 w-12 rounded-full bg-destructive/20 overflow-hidden">
                <div className="h-full w-3/4 bg-destructive" />
              </div>
            </motion.div>

            <div className="relative overflow-hidden rounded-3xl border bg-card p-6 shadow-2xl sm:p-8">
              <div className="mb-8 flex items-center justify-between border-b pb-4">
                <div>
                  <h3 className="font-bold">DNA Analysis</h3>
                  <p className="text-xs text-muted-foreground">Target: Senior Frontend Dev</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                  <Fingerprint className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              {/* The Skills List */}
              <div className="relative space-y-3">
                {/* Vertical DNA Strand line */}
                <div className="absolute left-2.75 top-2 bottom-2 w-0.5 bg-linear-to-b from-primary via-primary/50 to-destructive/50" />
                
                <SkillStatusItem label="HTML / CSS / Tailwind" status="ready" delay={0.1} />
                <SkillStatusItem label="JavaScript (ES6+)" status="ready" delay={0.2} />
                <SkillStatusItem label="React & State Management" status="in-progress" delay={0.3} />
                <SkillStatusItem label="System Design & Scalability" status="missing" delay={0.4} />
                <SkillStatusItem label="AWS / CI-CD Pipelines" status="missing" delay={0.5} />
              </div>

              <div className="mt-8 rounded-xl bg-primary/5 p-4 border border-primary/10">
                <p className="text-xs leading-relaxed text-muted-foreground">
                  <span className="font-bold text-primary italic">Insight:</span> You are strong in UI, but your "Delta" shows you need to focus on <strong>Architecture</strong> to hit your target salary.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

type SkillStatus = "ready" | "in-progress" | "missing";

function SkillStatusItem({ label, status, delay }: { label: string; status: SkillStatus; delay: number }) {
  const configs = {
    ready: { 
      icon: <Check className="h-3 w-3" />, 
      color: "text-emerald-500", 
      bg: "bg-emerald-500/10",
      label: "Mastered"
    },
    "in-progress": { 
      icon: <Clock className="h-3 w-3" />, 
      color: "text-amber-500", 
      bg: "bg-amber-500/10",
      label: "Growth Area"
    },
    missing: { 
      icon: <AlertCircle className="h-3 w-3" />, 
      color: "text-destructive", 
      bg: "bg-destructive/10",
      label: "Critical Gap"
    },
  };

  const current = configs[status];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="group relative flex items-center justify-between rounded-xl border border-transparent bg-muted/50 px-4 py-3 transition-all hover:border-border hover:bg-muted"
    >
      <div className="flex items-center gap-3">
        <div className={`z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 border-background ${current.bg} ${current.color}`}>
          {current.icon}
        </div>
        <span className="text-sm font-semibold tracking-tight">{label}</span>
      </div>
      
      <div className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-tighter ${current.bg} ${current.color}`}>
        {current.label}
      </div>
    </motion.div>
  );
}

export default SkillDNADelta;