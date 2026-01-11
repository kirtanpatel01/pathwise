"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
	Sidebar,
	SidebarHeader,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
	SidebarRail,
} from "@/components/ui/sidebar";

import {
	LayoutDashboard,
	Map,
	Briefcase,
	User,
	LogOut,
	Sun,
	Moon,
} from "lucide-react";
import { ModeToggle } from "./mode-toggle";

const navItems = [
	{ title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
	{ title: "Roadmap", href: "/roadmap", icon: Map },
	{ title: "Jobs", href: "/jobs", icon: Briefcase },
	{ title: "Profile", href: "/profile", icon: User },
];

export function AppSidebar() {
	const pathname = usePathname();

	return (
		<Sidebar collapsible="icon">
			{/* ================= Header ================= */}
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton asChild>
							<Link href="/overview">
								<div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
									P
								</div>
								<span className="font-semibold">Pathwise</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>

			{/* ================= Content ================= */}
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Modules</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{navItems.map((item) => {
								const isActive = pathname === item.href;
								const Icon = item.icon;

								return (
									<SidebarMenuItem key={item.href}>
										<SidebarMenuButton
											asChild
											isActive={isActive}
										>
											<Link href={item.href}>
												<Icon />
												<span>{item.title}</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								);
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			{/* ================= Footer ================= */}
			<SidebarFooter>
				<SidebarGroup>
					<SidebarGroupLabel>Actions</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton>
									<ModeToggle asChild />
								</SidebarMenuButton>
							</SidebarMenuItem>

							<SidebarMenuItem>
								<SidebarMenuButton className="text-destructive">
									<LogOut />
									<span>Logout</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarFooter>

			<SidebarRail />
		</Sidebar>
	);
}
