import { z } from "zod";

// Step 1: basic project info
export const step1Schema = z.object({
  title: z.string().min(1, "Title is required"),
  tagline: z.string().optional(),
  logo: z.string().optional(),
  cover: z.string().optional(),
  elevatorPitch: z.string().min(1, "Elevator pitch is required"),
  videoUrl: z.string().optional(),
  projectUrl: z.string().optional(),
  linkedinUrl: z.string().optional(),
  facebookUrl: z.string().optional(),
  instagramUrl: z.string().optional(),
  youtubeUrl: z.string().optional(),
  universityId: z.string().optional(),
  facultyId: z.string().optional(),
});

// Step 2: market & classification
export const step2Schema = z.object({
  industryId: z.string().optional(),
  subIndustryId: z.string().optional(),
  projectType: z.string().optional(),
  stage: z.string().optional(),
  revenueModel: z.string().optional(),
  marketFocus: z.string().optional(),
  problem: z.string().optional(),
  solution: z.string().optional(),
  valueProp: z.string().optional(),
});

// Step 3: traction / metrics (values are strings in the form)
export const step3Schema = z.object({
  currentTraction: z.string().optional(),
  growthRate: z.string().optional(),
  totalUsers: z.string().optional(),
  dailyActiveUsers: z.string().optional(),
  monthlyRevenue: z.string().optional(),
  growthRatePct: z.string().optional(),
  retentionRate: z.string().optional(),
  conversionRate: z.string().optional(),
});

// Step 4: funding
export const step4Schema = z.object({
  fundingStage: z.string().optional(),
  serviceArea: z.string().optional(),
  fundingAsk: z.string().optional(),
  equityStake: z.string().optional(),
  useOfFunds: z.string().optional(),
  businessPlanUrl: z.string().optional(),
});

// Helpers: safe-parse wrappers
export const validateStep1 = (data: unknown) => step1Schema.safeParse(data);
export const validateStep2 = (data: unknown) => step2Schema.safeParse(data);
export const validateStep3 = (data: unknown) => step3Schema.safeParse(data);
export const validateStep4 = (data: unknown) => step4Schema.safeParse(data);

export type Step1Schema = z.infer<typeof step1Schema>;
export type Step2Schema = z.infer<typeof step2Schema>;
export type Step3Schema = z.infer<typeof step3Schema>;
export type Step4Schema = z.infer<typeof step4Schema>;
