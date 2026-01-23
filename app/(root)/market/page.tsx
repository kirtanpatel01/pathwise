import { MarketHeader } from "./market-header";
import { MarketStats } from "./market-stats";
import { RoleTrendCard } from "./role-trend-card";
import { marketTrendsMock } from "@/lib/data/market";

export default function MarketPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6 lg:p-10">
      <MarketHeader />
      
      <section>
        <MarketStats roles={marketTrendsMock} />
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">In-Demand Roles</h2>
          <span className="text-sm text-muted-foreground">Showing {marketTrendsMock.length} roles</span>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {marketTrendsMock.map((role) => (
            <RoleTrendCard key={role.id} role={role} />
          ))}
        </div>
      </section>

      <footer className="rounded-lg border bg-muted/30 p-4 text-center">
        <p className="text-xs text-muted-foreground uppercase tracking-widest">
          Experimental Feature: Real-time data integration pending (V2.0)
        </p>
      </footer>
    </div>
  );
}