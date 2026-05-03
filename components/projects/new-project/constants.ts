import { Step1Form, Step2Form, Step3Form, Step4Form } from "@/types/project";

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
  universityId: null,
  facultyId: null,
};

export const initialStep2Form: Step2Form = {
  industryId: null,
  subIndustryIds: [],
  projectTypes: [],
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
  totalUsers: 0,
  dailyActiveUsers: 0,
  monthlyRevenue: 0,
  growthRatePct: 0,
  retentionRate: 0,
  conversionRate: 0,
};

export const initialStep4Form: Step4Form = {
  fundingStage: "",
  serviceArea: "",
  fundingAsk: 0,
  equityStake: 0,
  useOfFunds: "",
  businessPlanUrl: "",
};
