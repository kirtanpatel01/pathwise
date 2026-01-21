"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, Layers, Star, Rocket } from "lucide-react";

const roadmapStages = [
  {
    title: "Foundations",
    icon: <Layers className="h-5 w-5" />,
    description: "Core concepts you must understand before moving forward.",
    items: ["JavaScript fundamentals", "Browser & DOM basics", "Git & version control"],
    color: "from-blue-500/20 to-transparent",
  },
  {
    title: "Core Skills",
    icon: <Star className="h-5 w-5" />,
    description: "Skills actively required by companies hiring today.",
    items: ["React fundamentals", "State management", "API integration"],
    color: "from-primary/20 to-transparent",
  },
  {
    title: "Advanced",
    icon: <Rocket className="h-5 w-5" />,
    description: "Skills that differentiate strong candidates from average ones.",
    items: ["Performance optimization", "System design basics", "Production practices"],
    color: "from-purple-500/20 to-transparent",
  },
];

function RoadmapPreview() {
  return (
    <section id="roadmaps" className="relative scroll-mt-20 py-24">
      <div className="landing-page-container">
        <div className="relative mb-16 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="mb-4 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary"
          >
            The Journey
          </motion.div>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Your roadmap, step by step
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            A clear progression path designed around real job expectations — not random tutorials.
          </p>
        </div>

        <div className="relative grid gap-8 md:grid-cols-3">
          {/* CREATIVE ADD: Connecting Line for Desktop */}
          <div className="absolute top-1/2 left-0 hidden w-full -translate-y-1/2 px-12 md:block">
            <svg width="100%" height="2" fill="none" className="opacity-20">
              <line x1="0" y1="1" x2="100%" y2="1" stroke="currentColor" strokeWidth="2" strokeDasharray="8 8" />
            </svg>
          </div>

          {roadmapStages.map((stage, index) => (
            <RoadmapStageCard
              key={stage.title}
              index={index}
              {...stage}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function RoadmapStageCard({ title, description, items, icon, index, color }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      whileHover={{ y: -10 }}
      className="group relative rounded-3xl border bg-card p-8 shadow-sm transition-all hover:shadow-2xl hover:ring-2 hover:ring-primary/20"
    >
      {/* Visual Background Gradient */}
      <div className={`absolute inset-0 -z-10 rounded-3xl bg-linear-to-b ${color} opacity-0 transition-opacity group-hover:opacity-100`} />

      <div className="mb-6 flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          {icon}
        </div>
        <span className="text-xs font-black uppercase tracking-tighter text-muted-foreground">Phase 0{index + 1}</span>
      </div>

      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>

      <div className="my-6 h-px w-full bg-border" />

      <ul className="space-y-4">
        {items.map((item: string, i: number) => (
          <motion.li 
            key={item}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + (i * 0.1) }}
            className="flex items-center gap-3 text-sm font-medium"
          >
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Check className="h-3 w-3 stroke-[3px]" />
            </div>
            {item}
          </motion.li>
        ))}
      </ul>

      {/* CREATIVE ADD: Card Footer CTA */}
      <div className="mt-8">
        <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary opacity-0 transition-all group-hover:opacity-100 hover:gap-3">
          Explore Phase
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </motion.div>
  );
}

export default RoadmapPreview;