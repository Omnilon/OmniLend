import { z } from "zod";

export const LeadSchema = z.object({
  division: z.enum(["interiors", "asset-fortification", "finance"]),
  name: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().max(40).optional().or(z.literal("")),
  budget: z.string().max(80).optional().or(z.literal("")),
  serviceInterest: z.string().max(160).optional().or(z.literal("")),
  message: z.string().min(10).max(2000),
  sourcePath: z.string().max(200).optional()
});

export type LeadInput = z.infer<typeof LeadSchema>;

export const LeadSubmissionSchema = LeadSchema.extend({
  captchaToken: z.string().min(20).max(1200),
  captchaAnswer: z.string().min(1).max(20),
  companyWebsite: z.string().max(200).optional().or(z.literal(""))
});

export type LeadSubmissionInput = z.infer<typeof LeadSubmissionSchema>;

export type LeadRecord = LeadInput & {
  leadId: string;
  status: "new";
  createdAt: string;
  ipHash?: string;
  userAgent?: string;
};
