"use client";

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
} from "@/components/ui/sidebar";

import { LayoutDashboard, Map, Briefcase, User, LogOut } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { signOut } from "@/app/auth/actions";

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
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton asChild>
							<Link href="/dashboard">
								<div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
									P
								</div>
								<span className="font-semibold">Pathwise</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>

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
				<SidebarGroupLabel>Actions</SidebarGroupLabel>
				<SidebarGroupContent>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton>
								<ModeToggle asChild />
							</SidebarMenuButton>
						</SidebarMenuItem>

						<SidebarMenuItem>
							<SidebarMenuButton
								onClick={async () => await signOut()}
								className="text-destructive hover:text-destructive hover:bg-destructive/20 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/10"
							>
								<LogOut />
								<span>Logout</span>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarGroupContent>
			</SidebarFooter>
		</Sidebar>
	);
}
