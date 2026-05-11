"use client";
import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { FeedGrid } from "@/components/home/FeedGrid";
import { FeedProfileCard } from "@/components/home/FeedProfileCard";
import { useInfiniteProjectsFeed } from "@/hooks/api/useProject";
import { useDebounce } from "@/hooks/ui/useDebounce";
import { useInfiniteScroll } from "@/hooks/ui/useInfiniteScroll";
import { HomeSearchBar } from "@/components/home/HomeSearchBar";
import { PeopleYouMayNeedSidebar } from "@/components/talent-details";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRelatedProfiles } from "@/hooks/api/useProfile";
import ExploreFilters from "@/components/explore/ExploreFilters";
import { useMediaQuery } from "@/hooks/ui/useMediaQuery";
import { Spinner } from "@heroui/react";

export default function HomePage() {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || "",
  );
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const router = useRouter();
  const pathname = usePathname();

  const filters = useMemo(() => {
    const params: Record<string, string | undefined> = {};
    const keys = [
      "search",
      "industryId",
      "stage",
      "fundingAsk",
      "isAcademic",
      "rating",
      "projectType",
      "revenueModel",
      "marketFocus",
      "currentTraction",
      "fundingStage",
      "serviceArea",
      "equityStake",
      "universityId",
      "facultyId",
      "sortBy",
      "sortOrder",
    ];

    keys.forEach((key) => {
      const val = searchParams.get(key);
      if (val) params[key] = val;
    });

    return { ...params, limit: 16 };
  }, [searchParams]);

  const { user, isHydrated } = useAuthStore();
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");

  const {
    data: projectsData,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteProjectsFeed(filters);

  const projects = useMemo(
    () => projectsData?.pages.flatMap((page) => page.data) || [],
    [projectsData],
  );

  const { data: relatedProfiles, isLoading: isRelatedLoading } =
    useRelatedProfiles(
      {
        id: user?.id?.toString() || "",
        limit: 3,
      },
      isLargeScreen,
    );

  const sentinelRef = useInfiniteScroll({
    hasNextPage: !!hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

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
      params.delete("page");
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [debouncedSearchTerm]);

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Feed */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <HomeSearchBar value={searchTerm} onValueChange={setSearchTerm} />
          <ExploreFilters
            loading={isLoading || isRelatedLoading || !isHydrated}
          />
          <FeedGrid projects={projects} isLoading={isLoading} />

          {/* Infinite scroll sentinel */}
          {!isLoading && (
            <div ref={sentinelRef} className="w-full flex justify-center py-4">
              {isFetchingNextPage && <Spinner size="lg" color="primary" />}
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
