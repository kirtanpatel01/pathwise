"use client";

import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { ArrowRight, Sparkles, Star, Zap } from "lucide-react";

function FinalCTA() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-background">
      <div className="landing-page-container">
        {/* We use a fixed dark background here to create a "Power Block" */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 px-8 py-16 text-center shadow-2xl sm:px-16 sm:py-24 border border-white/5">
          
          {/* CREATIVE ADD: Subtle Radial Glow */}
          <div className="absolute top-0 left-1/2 z-0 h-full w-full -translate-x-1/2 bg-[radial-gradient(circle_at_50%_0%,rgba(var(--primary-rgb),0.15)_0%,transparent_70%)] pointer-events-none" />

          {/* CREATIVE ADD: Animated Skill Pills (Now with proper contrast) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
            <FloatingPill text="Next.js" top="15%" left="10%" delay={0} color="border-blue-500/30 text-blue-400" />
            <FloatingPill text="Data Structures" bottom="20%" left="15%" delay={1} color="border-purple-500/30 text-purple-400" />
            <FloatingPill text="System Design" top="20%" right="10%" delay={0.5} color="border-emerald-500/30 text-emerald-400" />
            <FloatingPill text="Cloud Arch" bottom="15%" right="15%" delay={1.5} color="border-orange-500/30 text-orange-400" />
          </div>

          <div className="relative z-10 mx-auto max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-sm font-bold text-primary mb-8"
            >
              <Zap className="h-4 w-4 fill-current" />
              <span>Limited Alpha Access</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-bold tracking-tight text-white sm:text-6xl"
            >
              Stop scrolling. <br />
              <span className="text-primary italic">Start building.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-lg text-slate-400 leading-relaxed"
            >
              Join 5,000+ students who use Pathwise to turn their skill confusion into
              a job-ready technical delta. Your roadmap is waiting.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Button 
                size="lg" 
                className="h-14 px-10 text-lg font-bold bg-primary text-primary-foreground shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] transition-all hover:scale-105 active:scale-95 hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.5)]"
              >
                Build my roadmap
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-8 flex items-center justify-center gap-6 text-sm text-slate-500"
            >
              <div className="flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span>No credit card required</span>
              </div>
              <div className="h-1 w-1 rounded-full bg-slate-700" />
              <span>30-second setup</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FloatingPill({ text, color, ...props }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ 
        y: [0, -15, 0],
        opacity: [0.2, 0.4, 0.2]
      }}
      transition={{ 
        duration: 5, 
        repeat: Infinity, 
        delay: props.delay,
        ease: "easeInOut" 
      }}
      className="absolute hidden lg:block"
      style={{ ...props }}
    >
      <div className={`rounded-full border ${color} bg-white/5 px-4 py-2 text-xs font-semibold backdrop-blur-md`}>
        {text}
      </div>
    </motion.div>
  );
}

export default FinalCTA;