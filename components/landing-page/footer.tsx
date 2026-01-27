"use client";

import { motion } from "motion/react";
import { Zap, Twitter, Github, Linkedin, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t bg-card pt-16 pb-8">
      <div className="landing-page-container">
        <div className="grid gap-12 lg:grid-cols-4 md:grid-cols-2">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-bold text-xl">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Zap className="h-4 w-4 fill-current" />
              </div>
              <span>Pathwise</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Bridging the gap between learning and employment with AI-driven skill DNA analysis and personalized roadmaps.
            </p>
            <div className="flex items-center gap-4">
              <SocialIcon icon={<Twitter className="h-4 w-4" />} href="#" />
              <SocialIcon icon={<Github className="h-4 w-4" />} href="#" />
              <SocialIcon icon={<Linkedin className="h-4 w-4" />} href="#" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><FooterLink href="#how-it-works">How it works</FooterLink></li>
              <li><FooterLink href="#roadmaps">Roadmaps</FooterLink></li>
              <li><FooterLink href="#students">For Students</FooterLink></li>
              <li><FooterLink href="#">Success Stories</FooterLink></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><FooterLink href="#">About Us</FooterLink></li>
              <li><FooterLink href="#">Privacy Policy</FooterLink></li>
              <li><FooterLink href="#">Terms of Service</FooterLink></li>
              <li><FooterLink href="#">Contact Support</FooterLink></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-wider">Stay Updated</h4>
            <p className="text-sm text-muted-foreground">
              Get the latest insights on market-ready skills and career growth.
            </p>
            <div className="flex gap-2">
              <Input 
                placeholder="Email address" 
                className="bg-muted/50 border-none rounded-full px-4"
              />
              <Button size="icon" className="rounded-full shrink-0">
                <Zap className="h-4 w-4 fill-current" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Pathwise AI. Built for the future of work.
          </p>
          
          <motion.button
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
          >
            Back to top
            <div className="flex h-8 w-8 items-center justify-center rounded-full border bg-muted/50">
              <ArrowUp className="h-4 w-4" />
            </div>
          </motion.button>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a 
      href={href} 
      className="transition-colors hover:text-primary flex items-center group"
    >
      <span className="h-px w-0 bg-primary transition-all group-hover:w-2 group-hover:mr-2" />
      {children}
    </a>
  );
}

function SocialIcon({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <a 
      href={href} 
      className="flex h-9 w-9 items-center justify-center rounded-full border bg-muted/50 text-muted-foreground transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary"
    >
      {icon}
    </a>
  );
}

export default Footer;