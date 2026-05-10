"use client";

import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  useIndustries,
  useFaculties,
  useUniversities,
} from "@/hooks/api/useLookup";
import {
  FundingStage,
  MarketFocus,
  ProjectStage,
  ProjectType,
  RevenueModel,
  ServiceArea,
  TractionType,
} from "@/types/project";

export const useExploreFiltersController = () => {
  const t = useTranslations("Explore");
  const tPitchEnums = useTranslations("Pitch.Enums");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { data: industriesData } = useIndustries();
  const { data: universitiesData } = useUniversities();
  const { data: facultiesData } = useFaculties();
  const industries = industriesData?.data || [];

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set("page", "1"); // Reset to page 1 on filter change
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const bulkUpdateParams = (newParams: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, value]) => {
      if (value && value !== "all") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const currentStage = searchParams.get("stage") || "all";
  const currentIndustry = searchParams.get("industryId") || "all";
  const currentFundingAsk = searchParams.get("fundingAsk") || "all";
  const isAcademic = searchParams.get("isAcademic") || "all";
  const currentRating = searchParams.get("rating") || "all";
  const currentProjectType = searchParams.get("projectType") || "all";
  const currentRevenueModel = searchParams.get("revenueModel") || "all";
  const currentMarketFocus = searchParams.get("marketFocus") || "all";
  const currentTraction = searchParams.get("currentTraction") || "all";
  const currentFundingStage = searchParams.get("fundingStage") || "all";
  const currentServiceArea = searchParams.get("serviceArea") || "all";
  const currentEquityStake = searchParams.get("equityStake") || "all";
  const universityId = searchParams.get("universityId") || "all";
  const facultyId = searchParams.get("facultyId") || "all";
  const currentSortBy = searchParams.get("sortBy") || "createdAt";
  const currentSortOrder = searchParams.get("sortOrder") || "desc";

  const sortByItems = [
    { key: "createdAt-desc", label: t("mostRecent") || "الأحدث" },
    { key: "createdAt-asc", label: t("oldest") || "الأقدم" },
    { key: "fundingAsk-desc", label: t("highestFunding") || "الأعلى تمويلاً" },
    { key: "fundingAsk-asc", label: t("lowestFunding") || "الأقل تمويلاً" },
  ];

  const stageItems = [
    { key: "all", label: t("allStages") },
    ...Object.values(ProjectStage).map((val) => ({
      key: val,
      label: tPitchEnums(`ProjectStage.${val}`),
    })),
  ];

  // Helper for enum items
  const getEnumItems = (
    enumObj: any,
    translationPath: string,
    allLabel: string,
  ) => [
    { key: "all", label: allLabel },
    ...Object.values(enumObj).map((val: any) => ({
      key: val,
      label: tPitchEnums(`${translationPath}.${val}`),
    })),
  ];

  const projectTypeItems = getEnumItems(
    ProjectType,
    "ProjectType",
    t("allTypes"),
  );
  const revenueModelItems = getEnumItems(
    RevenueModel,
    "RevenueModel",
    t("allRevenueModels"),
  );
  const marketFocusItems = getEnumItems(
    MarketFocus,
    "MarketFocus",
    t("allMarketFocus"),
  );
  const tractionItems = getEnumItems(
    TractionType,
    "TractionType",
    t("allTraction"),
  );
  const fundingStageItems = getEnumItems(
    FundingStage,
    "FundingStage",
    t("allFundingStages"),
  );
  const serviceAreaItems = getEnumItems(
    ServiceArea,
    "ServiceArea",
    t("allServiceAreas"),
  );

  const ratingItems = [
    { key: "all", label: t("allRatings") },
    { key: "4", label: "4+ Stars" },
    { key: "3", label: "3+ Stars" },
    { key: "2", label: "2+ Stars" },
    { key: "1", label: "1+ Star" },
  ];

  const equityStakeItems = [
    { key: "all", label: t("allEquity") },
    { key: "0-5", label: "0% - 5%" },
    { key: "5-10", label: "5% - 10%" },
    { key: "10-20", label: "10% - 20%" },
    { key: "20+", label: "20%+" },
  ];

  const industryItems = [
    { key: "all", label: t("allIndustries") },
    ...industries.map((ind) => ({
      key: ind.id.toString(),
      label: ind.name,
    })),
  ];

  const fundingAskItems = [
    { key: "all", label: t("allFunding") },
    { key: "0-10000", label: t("funding0_10k") },
    { key: "10000-50000", label: t("funding10k_50k") },
    { key: "50000-100000", label: t("funding50k_100k") },
    { key: "100000-500000", label: t("funding100k_500k") },
    { key: "500000+", label: t("funding500kPlus") },
  ];

  const universityItems = [
    { key: "all", label: t("allUniversities") || "All Universities" },
    ...(universitiesData?.data.map((u) => ({
      key: String(u.id),
      label: u.name,
    })) || []),
  ];

  const facultyItems = [
    { key: "all", label: t("allFaculties") || "All Faculties" },
    ...(facultiesData?.data.map((f) => ({
      key: String(f.id),
      label: f.name,
    })) || []),
  ];

  const academicItems = [
    { key: "all", label: t("all") },
    { key: "true", label: t("onlyAcademic") },
    { key: "false", label: t("notAcademic") },
  ];

  return {
    t,
    currentStage,
    currentIndustry,
    currentFundingAsk,
    isAcademic,
    currentRating,
    currentProjectType,
    currentRevenueModel,
    currentMarketFocus,
    currentTraction,
    currentFundingStage,
    currentServiceArea,
    currentEquityStake,
    currentSortBy,
    currentSortOrder,
    stageItems,
    industryItems,
    fundingAskItems,
    projectTypeItems,
    revenueModelItems,
    marketFocusItems,
    tractionItems,
    fundingStageItems,
    serviceAreaItems,
    ratingItems,
    equityStakeItems,
    academicItems,
    universityItems,
    facultyItems,
    universityId,
    facultyId,
    sortByItems,
    updateParam,
    bulkUpdateParams,
    clearFilters: () => {
      router.push(pathname);
    },
  };
};
