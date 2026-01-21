import { type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    redirect("/auth/login");
  }

  const supabase = await createClient();

  const { data, error } =
    await supabase.auth.exchangeCodeForSession(code);

  if (error || !data?.user) {
    console.error("OAuth exchange error:", error);
    redirect("/auth/login");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("onboarding_step")
    .eq("user_id", data.user.id)
    .maybeSingle();

  if (profileError) {
    console.error("Profile fetch error:", profileError);
    redirect("/onboarding/profile");
  }

  const redirectTo =
    !profile || profile.onboarding_step < 4
      ? "/onboarding/profile"
      : "/dashboard";

  redirect(redirectTo);
}
