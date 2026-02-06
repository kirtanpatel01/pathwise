"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState, useCallback } from "react";

type ModeToggleProps = {
	className?: string;
	asChild?: boolean;
};

export function ModeToggle({ className, asChild }: ModeToggleProps) {
	const { setTheme, resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const toggleTheme = useCallback(() => {
		setTheme(resolvedTheme === "dark" ? "light" : "dark");
	}, [resolvedTheme, setTheme]);

	useEffect(() => {
		if (!mounted) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (
				e.key.toLowerCase() === "d" &&
				!["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName) &&
				!(e.target as HTMLElement).isContentEditable
			) {
				e.preventDefault();
				toggleTheme();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [mounted, toggleTheme]);

	const Content = (
		<>
			{asChild ? (
				<div className="flex items-center gap-2">
					<div className="relative flex h-4 w-4 items-center justify-center">
						<Sun size={18} className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
						<Moon size={18} className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
					</div>
					<span className="dark:hidden">Light</span>
					<span className="hidden dark:inline">Dark</span>
				</div>
			) : (
				<>
					<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
					<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
				</>
			)}
			<span className="sr-only">Toggle theme</span>
		</>
	);

	if (asChild) {
		return (
			<div
				role="button"
				tabIndex={0}
				onClick={toggleTheme}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						e.preventDefault();
						toggleTheme();
					}
				}}
				className={cn("w-full select-none flex items-center", className)}
			>
				{Content}
			</div>
		);
	}

	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={toggleTheme}
			className={cn("relative cursor-pointer", className)}
		>
			{Content}
		</Button>
	);
}
