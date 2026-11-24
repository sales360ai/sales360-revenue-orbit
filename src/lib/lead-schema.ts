import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9\s-]{8,15}$/, "Please enter a valid number"),
  company: z.string().trim().max(200).optional().or(z.literal("")),
  interest: z.enum([
    "Sales 360",
    "Growth Marketing",
    "AI Automation",
    "Tech & Cloud",
    "Full Ecosystem",
  ]),
  goal: z.string().trim().max(500).optional().or(z.literal("")),
  website: z.string().max(0).optional(), // honeypot
});
export type LeadValues = z.infer<typeof leadSchema>;
