import React from "react";

function Footer() {
	return (
		<footer className="border-t bg-muted/30">
			<div className="mx-auto max-w-7xl px-6 py-12">
				<div className="flex flex-col items-center justify-between gap-6 md:flex-row">
					<p className="text-sm text-muted-foreground">
						© {new Date().getFullYear()} Pathwise. All rights
						reserved.
					</p>

					<div className="flex items-center gap-6 text-sm text-muted-foreground">
						<a
							href="#"
							className="hover:text-foreground transition-colors"
						>
							Privacy
						</a>
						<a
							href="#"
							className="hover:text-foreground transition-colors"
						>
							Terms
						</a>
						<a
							href="#"
							className="hover:text-foreground transition-colors"
						>
							Contact
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
