"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Spinner } from "./ui/spinner";
import { Skeleton } from "./ui/skeleton";

type ModeToggleProps = {
	className?: string;
	asChild?: boolean;
};

export function ModeToggle({ className, asChild }: ModeToggleProps) {
	const { theme, setTheme, resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const currentTheme = theme === "system" ? resolvedTheme : theme;

	const toggleTheme = () => {
		setTheme(currentTheme === "dark" ? "light" : "dark");
	};

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
	}, [mounted, currentTheme, toggleTheme]);

	if (!mounted) {
		return (
			<div className="flex items-center gap-1">
				<Skeleton className="h-6 w-6 rounded-full" />
				<Skeleton className="h-4 w-10 rounded-lg" />

			</div>
		);
	}

	const isDark = currentTheme === "dark";

	const Content = (
		<>
			{asChild ? (
				<div className="flex items-center gap-2">
					{isDark ? <Moon size={18} /> : <Sun size={18} />}
					<span>{isDark ? "Dark" : "Light"}</span>
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
