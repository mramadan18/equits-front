import { z } from "zod";
import {
  ProjectType,
  ProjectStage,
  RevenueModel,
  MarketFocus,
  TractionType,
  GrowthRate,
  FundingStage,
  ServiceArea,
} from "@/types/project";

export const step1Schema = z
  .object({
    title: z.preprocess(
      (val) => val ?? "",
      z
        .string()
        .min(3, "Validation.projectNameMin")
        .max(32, "Validation.projectNameMax"),
    ),
    tagline: z.preprocess(
      (val) => val ?? "",
      z
        .string()
        .min(10, "Validation.taglineMin")
        .max(100, "Validation.taglineMax"),
    ),
    logo: z.string().url().optional().or(z.literal("")),
    cover: z.preprocess(
      (val) => val ?? "",
      z
        .string()
        .url("Validation.invalidUrl")
        .min(1, "Validation.coverRequired"),
    ),
    elevatorPitch: z.preprocess(
      (val) => val ?? "",
      z
        .string()
        .min(50, "Validation.elevatorPitchMin")
        .max(1000, "Validation.elevatorPitchMax"),
    ),
    videoUrl: z.string().url().optional().or(z.literal("")),
    projectUrl: z.string().url().optional().or(z.literal("")),
    linkedinUrl: z.string().url().optional().or(z.literal("")),
    facebookUrl: z.string().url().optional().or(z.literal("")),
    instagramUrl: z.string().url().optional().or(z.literal("")),
    youtubeUrl: z.string().url().optional().or(z.literal("")),
    isAcademic: z.boolean(),
    universityId: z.preprocess((val) => val ?? "", z.string()),
    facultyId: z.preprocess((val) => val ?? "", z.string()),
  })
  .refine(
    (data) => {
      if (data.isAcademic) {
        return !!data.universityId && !!data.facultyId;
      }
      return true;
    },
    {
      message: "Validation.academicRequired",
      path: ["universityId"],
    },
  );

export const step2Schema = z.object({
  industryId: z.preprocess(
    (val) => val ?? "",
    z.string().min(1, "Validation.industryRequired"),
  ),
  subIndustryIds: z.array(z.string()).min(1, "Validation.subIndustryRequired"),
  projectTypes: z
    .array(
      z.nativeEnum(ProjectType, { message: "Validation.projectTypeRequired" }),
    )
    .min(1, "Validation.projectTypeRequired"),
  stage: z.nativeEnum(ProjectStage, {
    message: "Validation.stageRequired",
  }),
  revenueModel: z.nativeEnum(RevenueModel, {
    message: "Validation.revenueModelRequired",
  }),
  marketFocus: z.nativeEnum(MarketFocus, {
    message: "Validation.marketFocusRequired",
  }),
  problem: z.preprocess(
    (val) => val ?? "",
    z
      .string()
      .min(50, "Validation.problemMin")
      .max(2000, "Validation.problemMax"),
  ),
  solution: z.preprocess(
    (val) => val ?? "",
    z
      .string()
      .min(50, "Validation.solutionMin")
      .max(2000, "Validation.solutionMax"),
  ),
  valueProp: z.preprocess(
    (val) => val ?? "",
    z
      .string()
      .min(50, "Validation.valuePropMin")
      .max(2000, "Validation.valuePropMax"),
  ),
});

export const step3Schema = z.object({
  currentTraction: z.nativeEnum(TractionType, {
    message: "Validation.tractionRequired",
  }),
  growthRate: z
    .nativeEnum(GrowthRate, { message: "Validation.invalidOption" })
    .optional()
    .or(z.literal("")),
  totalUsers: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number().int().nonnegative().optional(),
  ),
  dailyActiveUsers: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number().int().nonnegative().optional(),
  ),
  monthlyRevenue: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number().nonnegative().optional(),
  ),
  growthRatePct: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number().nonnegative().optional(),
  ),
  retentionRate: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number().min(0).max(100).optional(),
  ),
  conversionRate: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number().min(0).max(100).optional(),
  ),
});

export const step4Schema = z.object({
  fundingStage: z.nativeEnum(FundingStage, {
    message: "Validation.fundingStageRequired",
  }),
  serviceArea: z.nativeEnum(ServiceArea, {
    message: "Validation.serviceAreaRequired",
  }),
  fundingAsk: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number().positive("Validation.fundingAskRequired"),
  ),
  equityStake: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number().min(0).max(100, "Validation.equityStakeMax"),
  ),
  useOfFunds: z.preprocess(
    (val) => val ?? "",
    z
      .string()
      .min(20, "Validation.useOfFundsMin")
      .max(1000, "Validation.useOfFundsMax"),
  ),
  businessPlanUrl: z.string().url().optional().or(z.literal("")),
});
