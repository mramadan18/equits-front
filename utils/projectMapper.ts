import { Project, SubIndustry } from "@/types/api";
import { ProjectFormData } from "@/types/project";

export const mapProjectToFormData = (
  project: Project,
): Partial<ProjectFormData> => {
  return {
    title: project.title || "",
    tagline: project.tagline || "",
    logo: project.logo || "",
    cover: project.cover || "",
    elevatorPitch: project.elevatorPitch || "",
    videoUrl: project.videoUrl || "",
    projectUrl: project.projectUrl || "",
    linkedinUrl: project.linkedinUrl || "",
    facebookUrl: project.facebookUrl || "",
    instagramUrl: project.instagramUrl || "",
    youtubeUrl: project.youtubeUrl || "",
    universityId: project.universityId,
    facultyId: project.facultyId,
    isAcademic: project.isAcademic,

    industryId: project.industryId,
    subIndustryIds: project.subIndustries?.map((s: SubIndustry) => s.id) || [],
    projectTypes: (project.projectTypes as any) || [],
    stage: (project.stage as any) || "",
    revenueModel: (project.revenueModel as any) || "",
    marketFocus: (project.marketFocus as any) || "",
    problem: project.problem || "",
    solution: project.solution || "",
    valueProp: project.valueProp || "",

    currentTraction: (project.currentTraction as any) || "",
    growthRate: (project.growthRate as any) || "",
    totalUsers: project.totalUsers ? Number(project.totalUsers) : null,
    dailyActiveUsers: project.dailyActiveUsers
      ? Number(project.dailyActiveUsers)
      : null,
    monthlyRevenue: project.monthlyRevenue
      ? Number(project.monthlyRevenue)
      : null,
    growthRatePct: project.growthRatePct ? Number(project.growthRatePct) : null,
    retentionRate: project.retentionRate ? Number(project.retentionRate) : null,
    conversionRate: project.conversionRate
      ? Number(project.conversionRate)
      : null,

    fundingStage: (project.fundingStage as any) || "",
    serviceArea: (project.serviceArea as any) || "",
    fundingAsk: project.fundingAsk ? Number(project.fundingAsk) : null,
    equityStake: project.equityStake ? Number(project.equityStake) : null,
    useOfFunds: project.useOfFunds || "",
    businessPlanUrl: project.businessPlanUrl || "",
  };
};

export const prepareProjectDataForSubmit = (values: ProjectFormData) => {
  // Filter out null, empty strings, and empty arrays
  const filteredValues = Object.fromEntries(
    Object.entries(values).filter(([_, value]) => {
      if (value === null || value === "") return false;
      if (Array.isArray(value) && value.length === 0) return false;
      return true;
    }),
  );

  // Trim strings
  return Object.fromEntries(
    Object.entries(filteredValues).map(([key, value]) => [
      key,
      typeof value === "string" ? value.trim() : value,
    ]),
  );
};
