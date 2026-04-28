import { Step1Form, Step2Form, Step3Form, Step4Form } from "./types";

export const initialStep1Form: Step1Form = {
  title: "",
  tagline: "",
  logo: "",
  cover: "",
  elevatorPitch: "",
  videoUrl: "",
  projectUrl: "",
  linkedinUrl: "",
  facebookUrl: "",
  instagramUrl: "",
  youtubeUrl: "",
  universityId: "",
  facultyId: "",
};

export const initialStep2Form: Step2Form = {
  industryId: "",
  subIndustryId: "",
  projectType: "",
  stage: "",
  revenueModel: "",
  marketFocus: "",
  problem: "",
  solution: "",
  valueProp: "",
};

export const initialStep3Form: Step3Form = {
  currentTraction: "",
  growthRate: "",
  totalUsers: "",
  dailyActiveUsers: "",
  monthlyRevenue: "",
  growthRatePct: "",
  retentionRate: "",
  conversionRate: "",
};

export const initialStep4Form: Step4Form = {
  fundingStage: "",
  serviceArea: "",
  fundingAsk: "",
  equityStake: "",
  useOfFunds: "",
  businessPlanUrl: "",
};
