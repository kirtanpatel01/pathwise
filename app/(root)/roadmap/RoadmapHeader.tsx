import { Badge } from "@/components/ui/badge"

type RoadmapHeaderProps = {
  roleName: string
  isRoleReady: boolean
}

export default function RoadmapHeader({
  roleName,
  isRoleReady,
}: RoadmapHeaderProps) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-semibold">
          {isRoleReady
            ? "You're Role Ready 🎉"
            : "Your Learning Roadmap"}
        </h1>

        <Badge
          variant={isRoleReady ? "default" : "secondary"}
        >
          {roleName}
        </Badge>
      </div>

      <p className="text-sm text-muted-foreground">
        {isRoleReady ? (
          <>
            You meet all skill requirements for this role.
            Focus on maintaining proficiency and applying
            your skills in real-world projects.
          </>
        ) : (
          <>
            This roadmap is generated based on your current
            skills and industry expectations for this role.
          </>
        )}
      </p>
    </div>
  )
}
