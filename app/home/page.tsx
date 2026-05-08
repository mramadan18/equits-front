"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { FeedGrid } from "@/components/home/FeedGrid";
import { FeedProfileCard } from "@/components/home/FeedProfileCard";
import { useProjectsFeed } from "@/hooks/api/useProject";
import { ProjectFilters } from "@/types/api";
import { Pagination } from "@heroui/react";
import { useDebounce } from "@/hooks/ui/useDebounce";
import { HomeSearchBar } from "@/components/home/HomeSearchBar";
import { PeopleYouMayNeedSidebar } from "@/components/talent-details";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRelatedProfiles } from "@/hooks/api/useProfile";
import ExploreFilters from "@/components/explore/ExploreFilters";
import { useMediaQuery } from "@/hooks/ui/useMediaQuery";

export default function HomePage() {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || "",
  );
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const router = useRouter();
  const pathname = usePathname();

  const filters: ProjectFilters = {
    page: Number(searchParams.get("page")) || 1,
    limit: 10,
    search: searchParams.get("search") || undefined,
    industryId: searchParams.get("industryId") || undefined,
    stage: searchParams.get("stage") || undefined,
    fundingAsk: searchParams.get("fundingAsk") || undefined,
    isAcademic: searchParams.get("isAcademic") || undefined,
    rating: searchParams.get("rating") || undefined,
    projectType: searchParams.get("projectType") || undefined,
    revenueModel: searchParams.get("revenueModel") || undefined,
    marketFocus: searchParams.get("marketFocus") || undefined,
    currentTraction: searchParams.get("currentTraction") || undefined,
    fundingStage: searchParams.get("fundingStage") || undefined,
    serviceArea: searchParams.get("serviceArea") || undefined,
    equityStake: searchParams.get("equityStake") || undefined,
    universityId: searchParams.get("universityId") || undefined,
    facultyId: searchParams.get("facultyId") || undefined,
  };

  const { user, isHydrated } = useAuthStore();
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const { data: projects, isLoading } = useProjectsFeed(filters);
  const { data: relatedProfiles, isLoading: isRelatedLoading } =
    useRelatedProfiles(
      {
        id: user?.id?.toString() || "",
        limit: 3,
      },
      isLargeScreen,
    );

  // Sync searchTerm state with URL param
  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    if (urlSearch !== searchTerm) {
      setSearchTerm(urlSearch);
    }
  }, [searchParams]);

  // Update search filter when debounced term changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const currentSearch = params.get("search") || "";

    if (debouncedSearchTerm !== currentSearch) {
      if (debouncedSearchTerm) {
        params.set("search", debouncedSearchTerm);
      } else {
        params.delete("search");
      }
      params.set("page", "1");
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [debouncedSearchTerm]);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Feed */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <HomeSearchBar value={searchTerm} onValueChange={setSearchTerm} />
          <ExploreFilters
            loading={isLoading || isRelatedLoading || !isHydrated}
          />
          <FeedGrid projects={projects?.data || []} isLoading={isLoading} />

          {projects?.pagination && projects.pagination.totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <Pagination
                total={projects.pagination.totalPages}
                page={filters.page || 1}
                onChange={handlePageChange}
                color="primary"
                variant="flat"
              />
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        {isLargeScreen && (
          <div className="lg:col-span-4 flex flex-col gap-6">
            <FeedProfileCard />
            <PeopleYouMayNeedSidebar
              talents={relatedProfiles?.data || []}
              isLoading={isRelatedLoading || isLoading || !isHydrated}
            />
          </div>
        )}
      </div>
    </div>
  );
}
