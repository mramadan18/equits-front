import {
  FundingStage,
  MarketFocus,
  ProjectStage,
  ProjectType,
  RevenueModel,
  TractionType,
} from "./project";
import { ExperienceLevel, ServiceArea } from "./api";

export interface PaginationData {
  page: number;
  limit: number;
  totalElements?: number;
  totalPages?: number;
  total?: number;
}

export interface BaseFilters {
  search?: string;
  page?: number;
  limit?: number;
}

export interface ProjectFilters extends BaseFilters {
  industryId?: number | string;
  stage?: ProjectStage | string;
  fundingAsk?: string;
  isAcademic?: boolean | string;
  projectType?: ProjectType | string;
  revenueModel?: RevenueModel | string;
  marketFocus?: MarketFocus | string;
  currentTraction?: TractionType | string;
  fundingStage?: FundingStage | string;
  rating?: string;
  serviceArea?: string;
  equityStake?: string;
  universityId?: number | string;
  facultyId?: number | string;
  sortBy?: string;
}

export interface ProfileFilters extends BaseFilters {
  id?: string;
}

export interface TalentFilters extends BaseFilters {
  role?: string;
  level?: ExperienceLevel | string;
  verified?: boolean | string;
  serviceArea?: ServiceArea | string;
  industryId?: number | string;
  universityId?: number | string;
}
