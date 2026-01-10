import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const jetBrainsMono = JetBrains_Mono({
	weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
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
				className={`${jetBrainsMono.className} antialiased`}
			>
				<ThemeProvider
					attribute={"class"}
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
