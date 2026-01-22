"use client"

import { TrendingUp } from "lucide-react"
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

type RadarData = {
  skill: string
  required: number
  current: number
}

const chartConfig = {
  required: {
    label: "Role Requirement",
    color: "var(--chart-1)",
  },
  current: {
    label: "You",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function SkillRadar({ data }: { data: RadarData[] }) {
  if (!data || data.length === 0) return null

  return (
    <Card className="max-w-xl mx-auto">
      <CardHeader className="items-center">
        <CardTitle>Skill Gap Overview</CardTitle>
        <CardDescription>
          Comparison between role expectations and your current level
        </CardDescription>
      </CardHeader>

      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-75"
        >
          <RadarChart data={data}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />

            <PolarAngleAxis
              dataKey="skill"
              tick={{ fontSize: 12 }}
            />
            <PolarGrid />

            {/* Required skill level */}
            <Radar
              dataKey="required"
              fill="var(--color-required)"
              fillOpacity={0.25}
              stroke="var(--color-required)"
            />

            {/* User skill level */}
            <Radar
              dataKey="current"
              fill="var(--color-current)"
              fillOpacity={0.45}
              stroke="var(--color-current)"
              dot={{ r: 3 }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium">
          Visualizing your strongest and weakest areas
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground">
          Scale: 0 (none) → 5 (expert)
        </div>
      </CardFooter>
    </Card>
  )
}
