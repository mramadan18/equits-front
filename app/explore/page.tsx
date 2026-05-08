import { ExploreSearchBar } from "@/components/explore/ExploreSearchBar";
import ExploreFilters from "@/components/explore/ExploreFilters";
import { ExploreGrid } from "@/components/explore/ExploreGrid";
import { fetchServer } from "@/utils/api-utils";
import { Project } from "@/types/api";
import { PaginationData } from "@/types/filters";

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const params = await searchParams;
  const {
    search,
    page = "1",
    industryId,
    stage,
    fundingAsk,
    isAcademic,
    rating,
    projectType,
    revenueModel,
    marketFocus,
    currentTraction,
    fundingStage,
    serviceArea,
    equityStake,
    universityId,
    facultyId,
  } = params;

  let projects: Project[] = [];
  let pagination: PaginationData = {
    total: 0,
    page: 1,
    limit: 16,
    totalPages: 0,
  };

  try {
    const data = await fetchServer<Project[]>("/projects", {
      params: {
        search,
        page,
        industryId,
        stage,
        fundingAsk,
        isAcademic,
        rating,
        projectType,
        revenueModel,
        marketFocus,
        currentTraction,
        fundingStage,
        serviceArea,
        equityStake,
        universityId,
        facultyId,
      },
      cache: "no-store",
    });
    projects = data.data || [];
    pagination = data.pagination || pagination;
  } catch (error) {
    console.error("Failed to fetch projects for explore page:", error);
  }

  return (
    <div className="w-full bg-white pb-16 md:pb-24 pt-8 md:pt-12 min-h-screen">
      <div className="container">
        <ExploreSearchBar />
        <ExploreFilters loading={false} />
        <ExploreGrid projects={projects} pagination={pagination} />
      </div>
    </div>
  );
}
