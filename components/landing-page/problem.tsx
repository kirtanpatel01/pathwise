"use client";

import { XCircle, AlertCircle, HelpCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

function Problem() {
  const problems = [
    {
      title: "The Course Trap",
      description: "Courses teach you tools, but they don't map to real job requirements. You're left with skills that don't move the needle.",
      icon: <XCircle className="h-6 w-6 text-red-500" />,
    },
    {
      title: "One-Size-Fits-None",
      description: "Generic roadmaps ignore your existing strengths. You waste months learning what you already know—or skipping the basics.",
      icon: <AlertCircle className="h-6 w-6 text-red-500" />,
    },
    {
      title: "The 'Ready' Dilemma",
      description: "Progress feels random. You don't know what to learn next, or more importantly, when you're actually job-ready.",
      icon: <HelpCircle className="h-6 w-6 text-red-500" />,
    },
  ];

  return (
    <section className="relative border-y bg-muted/30 py-24 overflow-hidden">
      {/* CREATIVE ADD: Subtle 'Tangled' background pattern to symbolize confusion */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 100 Q 250 50 400 200 T 800 100" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M100 300 Q 400 150 600 400 T 1000 250" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>

      <div className="landing-page-container relative z-10">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
          >
            The problem isn&apos;t lack of effort. <br />
            <span className="text-muted-foreground">It&apos;s lack of direction.</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg text-muted-foreground"
          >
            Most students work hard—collecting certificates and building 
            random projects—yet still fail to cross the "job-ready" gap.
          </motion.p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {problems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative rounded-2xl border bg-card p-8 shadow-sm transition-shadow hover:shadow-md"
            >
              {/* Creative Detail: Red corner accent on hover */}
              <div className="absolute top-0 right-0 p-4 opacity-0 transition-opacity group-hover:opacity-100">
                <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
              </div>

              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-red-500/10">
                {item.icon}
              </div>
              
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CREATIVE ADD: The "Bridge" Call to Action */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-16 flex flex-col items-center justify-center space-y-4 rounded-3xl bg-foreground p-8 text-center text-background sm:p-12"
        >
          <h3 className="text-2xl font-bold sm:text-3xl">Stop guessing. Start mapping.</h3>
          <p className="max-w-md text-sm opacity-80 sm:text-base">
            Pathwise bridges the gap between where you are and where the market needs you to be.
          </p>
          <button className="group mt-4 flex items-center gap-2 font-bold text-primary transition-colors hover:text-primary/80">
            Learn how Pathwise fixes this
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default Problem;