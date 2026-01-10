"use client";

import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { Menu } from "lucide-react";

import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "../mode-toggle";
import Link from "next/link";

export function SiteHeader() {
	const { theme, setTheme } = useTheme();

	return (
		<motion.header
			initial={{ y: -12, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.3, ease: "easeOut" }}
			className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur"
		>
			<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
				<a
					href="/"
					className="flex items-center gap-2 font-semibold"
				>
					<div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
						P
					</div>
					<span className="text-base">Pathwise</span>
				</a>

				<nav className="hidden items-center gap-6 md:flex">
					<a
						href="#how-it-works"
						className="text-sm text-muted-foreground hover:text-foreground"
					>
						How it works
					</a>
					<a
						href="#roadmaps"
						className="text-sm text-muted-foreground hover:text-foreground"
					>
						Roadmaps
					</a>
					<a
						href="#students"
						className="text-sm text-muted-foreground hover:text-foreground"
					>
						For students
					</a>
				</nav>

				<div className="flex items-center gap-2">
					<ModeToggle />
					<div className="hidden md:flex gap-2">
						<Link href={"/auth/login"}>
							<Button variant="ghost" className="cursor-pointer">
								Login
							</Button>
						</Link>
						<Link href="/auth/signup">
							<Button className="cursor-pointer">
								Get started
							</Button>
						</Link>
					</div>

					<Sheet>
						<SheetTrigger asChild>
							<Button
								size="icon"
								variant="ghost"
								className="md:hidden"
							>
								<Menu className="h-5 w-5" />
							</Button>
						</SheetTrigger>

						<SheetContent side="right" className="w-72">
							<SheetHeader>
								<SheetTitle>Actions</SheetTitle>
							</SheetHeader>

							<nav className="flex flex-col gap-4 px-4">
								<a
									href="#how-it-works"
									className="text-sm font-medium"
								>
									How it works
								</a>
								<a
									href="#roadmaps"
									className="text-sm font-medium"
								>
									Roadmaps
								</a>
								<a
									href="#students"
									className="text-sm font-medium"
								>
									For students
								</a>

								<div className="mt-6 flex flex-col gap-2">
									<Link href={"/auth/login"}>
										<Button variant="ghost">Login</Button>
									</Link>
									<Link href="/auth/signup">
										<Button className="cursor-pointer">
											Get started
										</Button>
									</Link>
								</div>
							</nav>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</motion.header>
	);
}
