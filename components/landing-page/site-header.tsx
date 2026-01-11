"use client";

import { motion } from "motion/react";
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
import { JwtHeader, JwtPayload } from "@supabase/supabase-js";

export interface UserClaims {
	claims: JwtPayload;
	header: JwtHeader;
	signature: Uint8Array;
}

export function SiteHeader({ user }: { user?: UserClaims | null }) {
	return (
		<motion.header
			initial={{ y: -12, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.3, ease: "easeOut" }}
			className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur"
		>
			<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
				<a href="/" className="flex items-center gap-2 font-semibold">
					<div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
						P
					</div>
					<span className="text-base">Pathwise</span>
				</a>

				<nav className="hidden items-center gap-6 md:flex">
					<a
						href="/#how-it-works"
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
					{user ? (
						<Link href="/dashboard" className="hidden md:block">
							<Button className="cursor-pointer">
								Dashboard
							</Button>
						</Link>
					) : (
						<div className="hidden md:flex gap-2">
							<Link href={"/auth/login"}>
								<Button
									variant="ghost"
									className="cursor-pointer"
								>
									Login
								</Button>
							</Link>
							<Link href="/auth/signup">
								<Button className="cursor-pointer">
									Get started
								</Button>
							</Link>
						</div>
					)}

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

						<SheetContent side="right" className="w-72 lg:hidden">
							<SheetHeader>
								<SheetTitle>Actions</SheetTitle>
							</SheetHeader>

							<nav className="flex flex-col gap-4 items-center">
								<a
									href="#how-it-works"
									className="text-sm font-medium"
								>
									<Button variant={"link"}>
										How it works
									</Button>
								</a>
								<a
									href="#roadmaps"
									className="text-sm font-medium"
								>
									<Button variant={"link"}>Roadmaps</Button>
								</a>
								<a
									href="#students"
									className="text-sm font-medium"
								>
									<Button variant={"link"}>
										For students
									</Button>
								</a>

								{user ? (
									<Link href="/dashboard">
										<Button>Dashboard</Button>
									</Link>
								) : (
									<div className="flex flex-col items-center gap-8 mt-3">
										<Link href={"/auth/login"}>
											<Button variant="outline">
												Login
											</Button>
										</Link>
										<Link href="/auth/signup">
											<Button className="cursor-pointer">
												Get started
											</Button>
										</Link>
									</div>
								)}
							</nav>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</motion.header>
	);
}
