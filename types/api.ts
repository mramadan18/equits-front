import {
  ChangePasswordInput,
  LoginInput,
  RegisterInput,
} from "../validations/auth.validation";

export enum ExperienceLevel {
  STUDENT = "STUDENT",
  JUNIOR = "JUNIOR",
  MID_LEVEL = "MID_LEVEL",
  SENIOR = "SENIOR",
  EXPERT = "EXPERT",
}

export enum EducationDegree {
  DIPLOMA = "DIPLOMA",
  HIGHER_DIPLOMA = "HIGHER_DIPLOMA",
  BACHELOR = "BACHELOR",
  MASTER = "MASTER",
  MBA = "MBA",
  PHD = "PHD",
}

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
  contactEmail?: string | null;
  googleId?: string | null;
  isEmailVerified: boolean;
  isTrusted: boolean;
  userType?: UserType;
  avatar?: string | null;
  cover?: string | null;
  phone?: string | null;
  jobTitle?: string | null;
  company?: string | null;
  about?: string | null;
  overview?: string | null;
  address?: string | null;
  experienceLevel?: ExperienceLevel | null;
  companyLink?: string | null;
  videoLink?: string | null;
  universityId?: number | null;
  university?: University | null;
  facebookUrl?: string | null;
  instagramUrl?: string | null;
  linkedinUrl?: string | null;
  youtubeUrl?: string | null;
  createdAt: string;
  updatedAt: string;
  role: "USER" | "ADMIN";
  hasDraftProjects: boolean;
  draftProjectsCount: number;
  educationCertificates?: EducationCertificate[];
}

export enum UserType {
  TALENT = "TALENT",
  INVESTOR = "INVESTOR",
}

export interface PaginationData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  status: "success" | "error";
  message?: string | MessageKey;
  data: T;
  pagination?: PaginationData;
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

export interface ProfileStatus {
  progress: number;
  checklist: {
    profilePictures: boolean;
    jobTitle: boolean;
    overview: boolean;
    education: boolean;
    contactInfo: boolean;
  };
}

export interface UpdateJobTitleRequest {
  jobTitle: string;
  experienceLevel: ExperienceLevel;
  company?: string;
  companyLink?: string;
}

export interface UpdateOverviewRequest {
  firstName?: string;
  lastName?: string;
  userType: UserType;
  overview: string;
  videoLink?: string;
}

export interface EducationCertificate {
  id?: number;
  university: string;
  degree: EducationDegree;
  faculty: string;
  programLink?: string;
  startDate: string;
  endDate?: string | null;
  present: boolean;
}

export interface UpdateEducationRequest {
  certificates: EducationCertificate[];
}

export interface UpdateContactRequest {
  email?: string;
  contactEmail?: string;
  phone?: string;
  address?: string;
  facebook?: string;
  linkedin?: string;
  instagram?: string;
  youtube?: string;
  website?: string;
}

export interface UpdatePicturesRequest {
  avatar?: string;
  cover?: string;
}

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
  title: string | null;
  currentStep: number;
}

export type ProjectStage =
  | "IDEA"
  | "VALIDATION"
  | "PROTOTYPE"
  | "MVP"
  | "BUSINESS";

export interface ProjectFilters {
  industryId?: number;
  stage?: ProjectStage | string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface Project {
  id: number;
  title: string;
  tagline: string;
  logo: string | null;
  cover: string;
  elevatorPitch: string;
  videoUrl: string | null;
  projectUrl: string | null;
  isAcademic: boolean;
  universityId: number | null;
  facultyId: number | null;
  projectTypes: string[];
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
  status: "DRAFT" | "PENDING_APPROVAL" | "PUBLISHED" | "REJECTED";
  currentStep: number;
  owner?: User;
  teamMembers?: User[];
  university?: University | null;
  faculty?: Faculty | null;
  industry?: Industry | null;
  subIndustries: SubIndustry[];
  likesCount?: number;
  commentsCount?: number;
  reviewsCount?: number;
  rating?: number;
  isLiked?: boolean;
  likes: ProjectLike[];
  comments: ProjectComment[];
}

export interface ProjectLike {
  id: number;
  userId: number;
  projectId: number;
  createdAt: string;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    avatar: string | null;
  };
}

export interface ProjectComment {
  id: number;
  content: string;
  userId: number;
  projectId: number;
  createdAt: string;
  user: {
    firstName: string;
    lastName: string;
    avatar: string | null;
  };
}

export interface ProjectRating {
  average: number;
  total: number;
}

export interface ProjectRatingResponse {
  average: number;
  total: number;
}
