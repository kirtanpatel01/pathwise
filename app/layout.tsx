import type { Metadata } from "next";
import { Karla } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";

const karla = Karla({
	weight: ["200", "300", "400", "500", "600", "700", "800"],
	subsets: ["latin"]
})

export const metadata: Metadata = {
	title: "Pathwise",
	description: "Your goal partner",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${karla.className} antialiased`}
			>
				<ThemeProvider
					attribute={"class"}
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<Toaster richColors />
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
