import { ExploreSearchBar } from "@/components/explore/ExploreSearchBar";
import { ExploreFilters } from "@/components/explore/ExploreFilters";
import { ExploreGrid } from "@/components/explore/ExploreGrid";
import { ApiResponse, PaginationData, Project } from "@/types/api";

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const params = await searchParams;
  const search = params.search || "";
  const page = params.page || "1";
  const industryId = params.industryId || "";
  const stage = params.stage || "";

  let projects: Project[] = [];
  let pagination: PaginationData = {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  };

  try {
    const queryParams = new URLSearchParams();
    if (search) queryParams.append("search", search);
    if (page) queryParams.append("page", page);
    if (industryId) queryParams.append("industryId", industryId);
    if (stage) queryParams.append("stage", stage);

    const projectsResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects?${queryParams.toString()}`,
      { cache: "no-store" },
    );
    const data: ApiResponse<Project[]> = await projectsResponse.json();
    projects = data.data || [];
    pagination = data.pagination || pagination;
  } catch {}

  return (
    <div className="w-full bg-white pb-16 md:pb-24 pt-8 md:pt-12 min-h-screen">
      <div className="container">
        <ExploreSearchBar />
        <ExploreFilters />
        <ExploreGrid projects={projects} pagination={pagination} />
      </div>
    </div>
  );
}
