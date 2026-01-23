import { MarketRole } from "@/types/market";

export const marketTrendsMock: MarketRole[] = [
	// Core Engineering & Development
	{
		id: "backend-developer",
		title: "Back-end Developer",
		demandPercentage: 41.74,
		skills: ["Java", "Python", "Node.js", "SQL", "APIs", "Microservices"],
		certifications: [],
	},
	{
		id: "fullstack-developer",
		title: "Full-stack Developer",
		demandPercentage: 40.34,
		skills: ["JavaScript", "React", "Angular", "Node.js", "TypeScript", "PostgreSQL"],
		certifications: [],
	},
	{
		id: "frontend-developer",
		title: "Front-end Developer",
		demandPercentage: 27.26,
		skills: ["HTML5", "CSS3", "JavaScript", "React", "Vue", "UI/UX"],
		certifications: [],
	},
	{
		id: "applications-developer",
		title: "Applications Developer",
		demandPercentage: 23.99,
		skills: ["C#", ".NET", "Java", "Agile", "Cloud Integration"],
		certifications: [],
	},
	{
		id: "software-architect",
		title: "Software Architect",
		demandPercentage: 19.16,
		skills: [
			"System Design",
			"Cloud Architecture",
			"Kubernetes",
			"Terraform",
			"Security",
		],
		certifications: [],
	},

	// AI & Data Roles
	{
		id: "ai-ml-specialist",
		title: "AI / ML Specialist",
		demandPercentage: 27.41,
		skills: ["Deep Learning", "NLP", "PyTorch", "LLMs", "RAG Systems"],
		certifications: ["Google AI Engineering", "IBM AI Engineering"],
	},
	{
		id: "data-scientist",
		title: "Data Scientist",
		demandPercentage: 17.45,
		skills: ["Statistics", "Python", "R", "ML Modeling", "Data Storytelling"],
		certifications: [],
	},
	{
		id: "data-analyst",
		title: "Data / Business Analyst",
		demandPercentage: 11.06,
		skills: ["SQL", "Tableau", "Power BI", "Data Visualization", "AI Ethics"],
		certifications: [],
	},
	{
		id: "data-architect",
		title: "Data Architect",
		demandPercentage: 6.54,
		skills: ["Data Modeling", "NoSQL", "Cloud Warehousing"],
		certifications: [],
	},
	{
		id: "prompt-engineer",
		title: "Prompt Engineer",
		demandPercentage: 3.43,
		skills: ["LLM Interaction", "NLP", "AI Validation", "AI Security"],
		certifications: [],
	},

	// Infrastructure, Cloud & Security
	{
		id: "devops-engineer",
		title: "DevOps Engineer",
		demandPercentage: 24.92,
		skills: ["CI/CD", "Kubernetes", "IaC", "Terraform", "Observability"],
		certifications: ["AWS DevOps Engineer", "Azure DevOps Expert"],
	},
	{
		id: "cybersecurity-engineer",
		title: "Cybersecurity Engineer",
		demandPercentage: 15.42,
		skills: ["Cloud Security", "Ethical Hacking", "IAM", "Incident Response"],
		certifications: ["CISSP", "Security+", "CISM"],
	},
	{
		id: "cloud-engineer",
		title: "Cloud Engineer",
		demandPercentage: 14.64,
		skills: ["AWS", "Azure", "GCP", "Linux", "Networking"],
		certifications: ["AWS Solutions Architect"],
	},
	{
		id: "information-security-analyst",
		title: "Information Security Analyst",
		demandPercentage: 9.81,
		skills: ["Risk Assessment", "Compliance", "Threat Analysis"],
		certifications: ["Security+", "CySA+"],
	},
	{
		id: "systems-engineer",
		title: "Systems Engineer",
		demandPercentage: 9.5,
		skills: ["Network Control", "Linux", "Unix", "System Administration"],
		certifications: ["RHCSA", "CCNA"],
	},

	// Specialized & Niche Roles
	{
		id: "mobile-developer",
		title: "Mobile Developer",
		demandPercentage: 10.75,
		skills: ["React Native", "Flutter", "Swift", "iOS", "Android"],
		certifications: [],
	},
	{
		id: "game-developer",
		title: "Game Developer",
		demandPercentage: 10.28,
		skills: ["C++", "Unity", "Unreal Engine", "Performance Optimization"],
		certifications: [],
	},
	{
		id: "sysadmin",
		title: "System Administrator",
		demandPercentage: 6.7,
		skills: ["OS Management", "Patching", "Windows", "Linux", "macOS"],
		certifications: ["RHCE", "Linux+"],
	},
	{
		id: "web3-developer",
		title: "Web3 Developer",
		demandPercentage: 5.92,
		skills: ["Blockchain", "Cryptography", "Smart Contracts", "dApps"],
		certifications: [],
	},
	{
		id: "blockchain-engineer",
		title: "Blockchain Engineer",
		demandPercentage: 4.83,
		skills: ["Decentralized Systems", "Solidity", "Security"],
		certifications: [],
	},
];
