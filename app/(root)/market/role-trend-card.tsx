import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MarketRole } from "@/types/market";
import { Award, Code } from "lucide-react";

export function RoleTrendCard({ role }: { role: MarketRole }) {
  return (
    <Card className="group transition-all hover:shadow-md hover:border-primary/50">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start mb-2">
           <CardTitle className="text-lg font-bold leading-tight group-hover:text-primary transition-colors">
            {role.title}
          </CardTitle>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold uppercase tracking-wider">
            <span className="text-muted-foreground">Market Demand</span>
            <span className="text-primary">{role.demandPercentage}%</span>
          </div>
          <Progress 
            value={role.demandPercentage} 
            className="h-1.5 transition-all" 
          />
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <h4 className="text-xs font-bold uppercase text-muted-foreground mb-3 flex items-center gap-2">
            <Code className="h-3 w-3" /> Essential Tech Stack
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {role.skills.map((skill) => (
              <Badge key={skill} variant="outline" className="bg-background font-normal">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-dashed">
          <h4 className="text-xs font-bold uppercase text-muted-foreground mb-3 flex items-center gap-2">
            <Award className="h-3 w-3" /> Recommended Certs
          </h4>
          <ul className="grid grid-cols-1 gap-2">
            {role.certifications.map((cert) => (
              <li key={cert} className="text-sm flex items-start gap-2 text-muted-foreground">
                <span className="mt-1.5 h-1 w-1 rounded-full bg-primary shrink-0" />
                {cert}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}