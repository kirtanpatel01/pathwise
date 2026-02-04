import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import Link from "next/link";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider
			style={
				{
					"--sidebar-width": "calc(var(--spacing) * 44)",
				} as React.CSSProperties
			}
		>
			<AppSidebar />
			<SidebarInset>
				<SiteHeader />
				<main>{children}</main>
			</SidebarInset>
		</SidebarProvider>
	);
}

export default layout;
