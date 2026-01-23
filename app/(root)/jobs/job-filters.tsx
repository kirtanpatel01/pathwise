"use client";

import { JobRole } from "@/types/job";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export function JobFilters({
	role,
	onChange,
}: {
	role: JobRole;
	onChange: (role: JobRole) => void;
}) {
	return (
		<div className="flex gap-4">
			<Select value={role} onValueChange={onChange}>
				<SelectTrigger className="w-55">
					<SelectValue placeholder="Select role" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="frontend">Frontend Developer</SelectItem>
					<SelectItem value="backend">Backend Developer</SelectItem>
					<SelectItem value="fullstack">Full Stack Developer</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);
}
