import { Inngest, EventSchemas } from "inngest";

type Events = {
  "user.onboarding.started": {
    data: {
      userId: string;
      githubUsername?: string;
    };
    name: "user.onboarding.started";
  };
};

// Create a client to send and receive events
export const inngest = new Inngest({ id: "pathwise-app", schemas: new EventSchemas<Events>() });
