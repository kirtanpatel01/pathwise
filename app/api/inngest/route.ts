import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest/client";
import { generateProfileInsights } from "@/lib/inngest/functions/generate-profile-insights";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    generateProfileInsights
  ],
});
