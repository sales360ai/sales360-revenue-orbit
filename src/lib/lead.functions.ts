import { createServerFn } from "@tanstack/react-start";
import { leadSchema } from "./lead-schema";

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => leadSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: submission, error } = await supabaseAdmin
      .from("lead_submissions")
      .insert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company || null,
        interest: data.interest,
        goal: data.goal || null,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Lead submission failed", error.message);
      throw new Error("Unable to store lead submission");
    }

    return { id: submission.id };
  });
