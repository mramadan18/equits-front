import {
  ChangePasswordInput,
  LoginInput,
  RegisterInput,
} from "../validations/auth.validation";

export type MessageKey =
  | "welcome"
  | "registerSuccess"
  | "loginSuccess"
  | "userNotFound"
  | "invalidCredentials"
  | "unauthorized"
  | "internalServerError"
  | "validationError"
  | "googleLoginSuccess"
  | "emailVerified"
  | "operationSuccess"
  | "passwordResetSuccess"
  | "verificationEmailSent"
  | "forgotPasswordOtpSent"
  | "profileRetrieved"
  | "profileUpdated"
  | "passwordUpdated"
  | "logoutSuccess"
  | "invalidGoogleToken"
  | "userAlreadyExists"
  | "invalidOtp"
  | "emptyCredentials"
  | "incorrectCredentials"
  | "noUserWithEmail"
  | "emailError"
  | "emailAlreadyVerified"
  | "passwordUpdateRouteError"
  | "currentPasswordIncorrect"
  | "recordNotFound"
  | "invalidReference"
  | "databaseError"
  | "somethingWentWrong";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  googleId?: string | null;
  isEmailVerified: boolean;
  isTrusted: boolean;
  avatar?: string | null;
  cover?: string | null;
  phone?: string | null;
  jobTitle?: string | null;
  company?: string | null;
  isTalent: boolean;
  isInvestor: boolean;
  about?: string | null;
  address?: string | null;
  universityId?: number | null;
  createdAt: string;
  updatedAt: string;
  role: "USER" | "ADMIN";
  hasDraftProjects: boolean;
  draftProjectsCount: number;
}

export interface ApiResponse<T> {
  status: "success" | "error";
  message?: string | MessageKey;
  data: T;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface SuccessResponse {
  message: string | MessageKey;
}

export type LoginRequest = LoginInput;
export type RegisterRequest = RegisterInput;
export type ResetPasswordRequest = {
  otp: string;
  password: string;
  confirmPassword: string;
};
export type ChangePasswordRequest = ChangePasswordInput;
export type UpdateMeRequest = Partial<
  Omit<User, "id" | "createdAt" | "updatedAt" | "role" | "email">
>;

export interface University {
  id: number;
  name: string;
}

export interface Faculty {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface SubIndustry {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Industry {
  id: number;
  name: string;
  subIndustries: SubIndustry[];
  createdAt: string;
  updatedAt: string;
}

export interface UploadResponse {
  url: string;
  filename: string;
  folder: string;
}

export interface ProjectDraft {
  id: number;
  currentStep: number;
}

export interface Project {
  id: number;
  title: string | null;
  tagline: string | null;
  logo: string | null;
  cover: string | null;
  elevatorPitch: string | null;
  videoUrl: string | null;
  projectUrl: string | null;
  isAcademic: boolean;
  universityId: number | null;
  facultyId: number | null;
  projectTypes: any[]; // Adjust if you have a specific type for project types
  stage: string | null;
  revenueModel: string | null;
  marketFocus: string | null;
  problem: string | null;
  solution: string | null;
  valueProp: string | null;
  currentTraction: string | null;
  growthRate: string | null;
  totalUsers: string | null;
  dailyActiveUsers: string | null;
  monthlyRevenue: string | null;
  growthRatePct: string | null;
  retentionRate: string | null;
  conversionRate: string | null;
  fundingStage: string | null;
  fundingAsk: string | null;
  equityStake: string | null;
  useOfFunds: string | null;
  businessPlanUrl: string | null;
  facebookUrl: string | null;
  instagramUrl: string | null;
  linkedinUrl: string | null;
  youtubeUrl: string | null;
  industryId: number | null;
  ownerId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  serviceArea: string | null;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED"; // Adjust based on your enum
  currentStep: number;
  owner?: {
    firstName: string;
    lastName: string;
    email: string;
  };
  university?: University | null;
  faculty?: Faculty | null;
  industry?: Industry | null;
  subIndustries?: SubIndustry[];
}
