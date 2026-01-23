"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { JobFilters } from "./job-filters";
import { JobRole } from "@/types/job";

export function JobsClient({ role }: { role: JobRole }) {
	const router = useRouter();
	const searchParams = useSearchParams();

	function handleRoleChange(newRole: JobRole) {
		const params = new URLSearchParams(searchParams.toString());
		params.set("role", newRole);
		router.push(`/jobs?${params.toString()}`);
	}

	return <JobFilters role={role} onChange={handleRoleChange} />;
}
