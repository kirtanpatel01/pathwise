"use client";

import { useState, useEffect } from "react";
import { Menu, Zap } from "lucide-react";
import { motion, useScroll, useSpring } from "motion/react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ModeToggle } from "../mode-toggle";
import Link from "next/link";
import { JwtHeader, JwtPayload } from "@supabase/supabase-js";
import { useAuth } from "@clerk/nextjs";

export interface UserClaims {
  claims: JwtPayload;
  header: JwtHeader;
  signature: Uint8Array;
}

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isSignedIn, isLoaded, sessionClaims } = useAuth();
  const onboardingComplete = sessionClaims?.metadata?.onboardingComplete === true;
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "How it works", href: "#how-it-works" },
    { name: "Roadmaps", href: "#roadmaps" },
    { name: "For students", href: "#students" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? "border-b bg-background/80 backdrop-blur-md py-2" 
          : "bg-transparent py-4"
      }`}
    >
      {/* Scroll Progress Indicator */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary origin-left"
        style={{ scaleX }}
      />

      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo Section */}
        <Link href="/" className="group flex items-center gap-2 font-bold transition-transform active:scale-95">
          <motion.div 
            whileHover={{ rotate: 10 }}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20"
          >
            <Zap className="h-5 w-5 fill-current" />
          </motion.div>
          <span className="text-xl tracking-tight">Pathwise</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative text-sm font-medium text-muted-foreground transition-colors hover:text-primary group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <ModeToggle />
          </div>

          {!mounted || !isLoaded ? (
            <div className="hidden md:block">
              <Skeleton className="h-9 w-30 rounded-full" />
            </div>
          ) : isSignedIn ? (
            <Link href={onboardingComplete ? "/dashboard" : "/onboarding"} className="hidden md:block">
              <Button className="rounded-full px-6 font-bold shadow-md hover:shadow-primary/20 cursor-pointer">
                {onboardingComplete ? "Dashboard" : "Onboarding"}
              </Button>
            </Link>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <Link href="/auth/sign-in">
                <Button variant="ghost" className="rounded-full font-medium cursor-pointer">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/sign-up">
                <Button className="rounded-full px-6 font-bold shadow-lg shadow-primary/20 cursor-pointer">
                  Get started
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu */}
          {mounted && (
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="ghost" className="md:hidden rounded-full">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="flex flex-col border-l-0 bg-background/95 backdrop-blur-xl">
                <SheetHeader className="text-left border-b pb-6">
                  <SheetTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary fill-current" />
                    Pathwise
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-6 py-8">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="text-2xl font-bold tracking-tight hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>

                <div className="mt-auto flex flex-col gap-4 border-t pt-8">
                  {!isLoaded ? (
                    <Skeleton className="h-13 w-full rounded-lg" />
                  ) : isSignedIn ? (
                    <Link href={onboardingComplete ? "/dashboard" : "/onboarding"} className="w-full">
                      <Button className="w-full h-12 text-lg font-bold cursor-pointer">
                        {onboardingComplete ? "Dashboard" : "Onboarding"}
                      </Button>
                    </Link>
                  ) : (
                    <>
                      <Link href="/auth/sign-in" className="w-full">
                        <Button variant="outline" className="w-full h-12 text-lg cursor-pointer">Sign In</Button>
                      </Link>
                      <Link href="/auth/sign-up" className="w-full">
                        <Button className="w-full h-12 text-lg font-bold cursor-pointer">Get started</Button>
                      </Link>
                    </>
                  )}
                  <div className="flex justify-center pt-4">
                    <ModeToggle />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  );
}