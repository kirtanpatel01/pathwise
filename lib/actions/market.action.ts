"use server";

import { createClient } from "@/lib/supabase/server";
import { MarketRole } from "@/types/market";

export async function getMarketRoles(): Promise<MarketRole[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("market_roles")
    .select("*")
    .order("demand_percentage", { ascending: false });

  if (error) {
    console.error("Error fetching market roles:", error);
    return [];
  }

  return data as MarketRole[];
}
