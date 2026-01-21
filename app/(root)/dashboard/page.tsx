import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function page() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("onboarding_step")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    console.error("Dashboard profile error:", error);
    redirect("/onboarding/profile");
  }

  if (!profile || profile.onboarding_step < 4) {
    redirect("/onboarding/profile");
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <p className="text-muted-foreground">
        Welcome back 👋
      </p>
    </div>
  );
}
