// roadmap/RoadmapHeader.tsx
import { Badge } from "@/components/ui/badge"

type RoadmapHeaderProps = {
  roleName: string
}

export default function RoadmapHeader({ roleName }: RoadmapHeaderProps) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-semibold">
          Your Learning Roadmap
        </h1>
        <Badge variant="secondary">{roleName}</Badge>
      </div>

      <p className="text-sm text-muted-foreground">
        This roadmap is generated based on your current skills and
        industry expectations for this role.
      </p>
    </div>
  )
}
