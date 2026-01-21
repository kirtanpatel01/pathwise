"use client";

import { Button } from "../ui/button";
import { ArrowUpRight, CheckCircle2, Sparkles, TrendingUp } from "lucide-react";
import { motion, easeInOut } from "motion/react";

function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeInOut } },
  };

  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -z-10 h-250 w-250 -translate-x-1/2 -translate-y-1/2 [background:radial-gradient(50%_50%_at_50%_50%,rgba(120,119,198,0.1)_0%,rgba(255,255,255,0)_100%)]" />

      <div className="landing-page-container">
        <motion.div 
          className="grid gap-12 lg:grid-cols-2 lg:items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left: Copy */}
          <div className="space-y-8">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              <span>AI-Powered Career Guidance</span>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
                From skill <span className="text-primary italic">confusion</span> <br />
                to career <span className="relative">
                  clarity
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 138 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 7C35.6667 3 103.4 -1.4 137 7" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                </span>
              </h1>

              <p className="max-w-xl text-lg text-muted-foreground md:text-xl leading-relaxed">
                Pathwise analyzes your skills, compares them with real-world requirements, 
                and builds a roadmap to make you job-ready.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
              <Button size="lg" className="h-12 px-8 text-base shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
                Build my roadmap
                <ArrowUpRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="lg"
                className="h-12 px-8 text-base"
                onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
              >
                See how it works
              </Button>
            </motion.div>
          </div>

          {/* Right: Visual Creative */}
          <motion.div 
            variants={itemVariants}
            className="relative lg:ml-10"
          >
            {/* The "Glow" behind the card */}
            <div className="absolute -inset-4 rounded-4xl bg-linear-to-tr from-primary/20 to-secondary/20 blur-2xl opacity-50" />
            
            <div className="relative rounded-2xl border bg-card/90 backdrop-blur-md p-8 shadow-2xl">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg">Fullstack Engineer</h3>
                  <p className="text-xs text-muted-foreground">Target Role</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-primary">75%</span>
                  <p className="text-[10px] uppercase tracking-wider font-bold opacity-60">Match Score</p>
                </div>
              </div>

              <div className="space-y-5">
                {[
                  { label: "React & Next.js", status: "completed", val: 100 },
                  { label: "System Design", status: "current", val: 45 },
                  { label: "AWS Deployment", status: "pending", val: 0 },
                ].map((step, index) => (
                  <motion.div 
                    key={index} 
                    whileHover={{ x: 5 }}
                    className="group cursor-default"
                  >
                    <div className="flex justify-between mb-2">
                      <span className={`text-sm font-semibold ${step.status === 'pending' ? 'text-muted-foreground' : ''}`}>
                        {step.label}
                      </span>
                      {step.status === 'completed' && <CheckCircle2 className="h-4 w-4 text-primary" />}
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${step.val}%` }}
                        transition={{ duration: 1, delay: 0.5 + (index * 0.2) }}
                        className={`h-full ${step.status === 'current' ? 'bg-primary animate-pulse' : 'bg-primary/60'}`} 
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Floating Creative Element */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="absolute -bottom-6 -right-6 flex items-center gap-3 rounded-xl border bg-background p-4 shadow-2xl"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold italic">+12% Market Value</p>
                  <p className="text-[10px] text-muted-foreground">After last skill update</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}

export default Hero;