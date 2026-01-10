export function SkillDNAIllustration() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="mx-auto h-64 w-64"
      aria-hidden
    >
      {/* Background grid */}
      <circle cx="100" cy="100" r="80" fill="none" stroke="hsl(var(--border))" />
      <circle cx="100" cy="100" r="60" fill="none" stroke="hsl(var(--border))" />
      <circle cx="100" cy="100" r="40" fill="none" stroke="hsl(var(--border))" />

      {/* Axes */}
      <line x1="100" y1="20" x2="100" y2="180" stroke="hsl(var(--border))" />
      <line x1="20" y1="100" x2="180" y2="100" stroke="hsl(var(--border))" />
      <line x1="40" y1="40" x2="160" y2="160" stroke="hsl(var(--border))" />
      <line x1="160" y1="40" x2="40" y2="160" stroke="hsl(var(--border))" />

      {/* Skill shape */}
      <polygon
        points="100,30 145,70 130,130 70,145 55,85"
        fill="hsl(var(--primary) / 0.15)"
        stroke="hsl(var(--primary))"
        strokeWidth="2"
      />

      {/* Center */}
      <circle cx="100" cy="100" r="3" fill="hsl(var(--primary))" />
    </svg>
  )
}
