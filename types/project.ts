export type ProjectStep = 1 | 2 | 3 | 4;

export enum ProjectType {
  SOFTWARE = "SOFTWARE",
  HARDWARE = "HARDWARE",
  SERVICE = "SERVICE",
  MARKETPLACE = "MARKETPLACE",
  HYBRID = "HYBRID",
}

export enum ProjectStage {
  IDEA = "IDEA",
  VALIDATION = "VALIDATION",
  PROTOTYPE = "PROTOTYPE",
  MVP = "MVP",
  BETA = "BETA",
  GO_TO_MARKET = "GO_TO_MARKET",
  PMF = "PMF",
  SCALING = "SCALING",
  OPTIMIZATION = "OPTIMIZATION",
  PIVOT = "PIVOT",
  SUNSETTING = "SUNSETTING",
}

export enum RevenueModel {
  SUBSCRIPTION = "SUBSCRIPTION",
  MARKETPLACE = "MARKETPLACE",
  FREEMIUM = "FREEMIUM",
  DIRECT_SALES = "DIRECT_SALES",
  ADVERTISING = "ADVERTISING",
  LICENSING = "LICENSING",
}

export enum MarketFocus {
  B2B = "B2B",
  B2C = "B2C",
  B2B2C = "B2B2C",
  C2C = "C2C",
  C2B = "C2B",
  B2G = "B2G",
  G2B = "G2B",
  G2C = "G2C",
  D2C = "D2C",
}

export enum TractionType {
  IDEA = "IDEA",
  EARLY_USERS = "EARLY_USERS",
  ACTIVE_USERS = "ACTIVE_USERS",
  GENERATING_REVENUE = "GENERATING_REVENUE",
  PROFITABLE = "PROFITABLE",
}

export enum GrowthRate {
  NO_GROWTH = "NO_GROWTH",
  SLOW = "SLOW",
  STEADY = "STEADY",
  FAST = "FAST",
  RAPID = "RAPID",
}

export enum FundingStage {
  ANGEL = "ANGEL",
  SEED = "SEED",
  BRIDGE = "BRIDGE",
  SERIES_A = "SERIES_A",
  SERIES_B = "SERIES_B",
  SERIES_C_PLUS = "SERIES_C_PLUS",
  PRE_IPO = "PRE_IPO",
}

export enum ServiceArea {
  CITY = "CITY",
  GOVERNORATE = "GOVERNORATE",
  EGYPT = "EGYPT",
  MENA = "MENA",
  GCC = "GCC",
  AFRICA = "AFRICA",
  EUROPE = "EUROPE",
  NORTH_AMERICA = "NORTH_AMERICA",
  LATIN_AMERICA = "LATIN_AMERICA",
  ASIA = "ASIA",
  GLOBAL = "GLOBAL",
}

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
  universityId: number | null;
  facultyId: number | null;
}

export interface Step2Form {
  industryId: number | null;
  subIndustryIds: number[]; // Backend wants array of numbers
  projectTypes: ProjectType[];
  stage: ProjectStage | "";
  revenueModel: RevenueModel | "";
  marketFocus: MarketFocus | "";
  problem: string;
  solution: string;
  valueProp: string;
}

export interface Step3Form {
  currentTraction: TractionType | "";
  growthRate: GrowthRate | "";
  totalUsers: number | null;
  dailyActiveUsers: number | null;
  monthlyRevenue: number | null;
  growthRatePct: number | null;
  retentionRate: number | null;
  conversionRate: number | null;
}

export interface Step4Form {
  fundingStage: FundingStage | "";
  serviceArea: ServiceArea | "";
  fundingAsk: number | null;
  equityStake: number | null;
  useOfFunds: string;
  businessPlanUrl: string;
}

export interface ProjectFormData
  extends Step1Form,
    Step2Form,
    Step3Form,
    Step4Form {
  isAcademic: boolean;
}
