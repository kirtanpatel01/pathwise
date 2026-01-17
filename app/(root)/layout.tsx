import { AppSidebar } from "@/components/app-sidebar";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import Link from "next/link";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex items-center justify-between sm:justify-start p-2 border-b">
					<Link href="/dashboard" className="flex sm:hidden items-center gap-2 ">
						<div className="flex h-6 min-w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
							P
						</div>
						<span className="font-semibold">Pathwise</span>
					</Link>
					<SidebarTrigger />
				</header>
				<main className="mt-12 fixed sm:mt-0 sm:relative">{children}</main>
			</SidebarInset>
		</SidebarProvider>
	);
}

export default layout;
