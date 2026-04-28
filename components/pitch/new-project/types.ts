export type PitchStep = 1 | 2 | 3 | 4;

export interface Step1Form {
  title: string;
  tagline: string;
  logo: string;
  cover: string;
  elevatorPitch: string;
  videoUrl: string;
  projectUrl: string;
  linkedinUrl: string;
  facebookUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  universityId: string;
  facultyId: string;
}

export interface Step2Form {
  industryId: string;
  subIndustryId: string;
  projectType: string;
  stage: string;
  revenueModel: string;
  marketFocus: string;
  problem: string;
  solution: string;
  valueProp: string;
}

export interface Step3Form {
  currentTraction: string;
  growthRate: string;
  totalUsers: string;
  dailyActiveUsers: string;
  monthlyRevenue: string;
  growthRatePct: string;
  retentionRate: string;
  conversionRate: string;
}

export interface Step4Form {
  fundingStage: string;
  serviceArea: string;
  fundingAsk: string;
  equityStake: string;
  useOfFunds: string;
  businessPlanUrl: string;
}
