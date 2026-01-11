"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ModeToggleProps = {
	className?: string;
	asChild?: boolean;
};

export function ModeToggle({ className, asChild }: ModeToggleProps) {
	const { theme, setTheme, resolvedTheme } = useTheme();

	const currentTheme =
		theme === "system" ? resolvedTheme : theme;

	const toggleTheme = () => {
		setTheme(currentTheme === "dark" ? "light" : "dark");
	};

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

	/* ---------------- asChild: NOT a button ---------------- */
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
				className={cn(
					"select-none flex items-center",
					className
				)}
			>
				{Content}
			</div>
		);
	}

	/* ---------------- default: Button ---------------- */
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
