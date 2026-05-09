"use client";

import { ExploreSearchBar } from "@/components/explore/ExploreSearchBar";
import ExploreFilters from "@/components/explore/ExploreFilters";
import { ExploreGrid } from "@/components/explore/ExploreGrid";
import { useInfiniteProjects } from "@/hooks/api/useProject";
import { useInfiniteScroll } from "@/hooks/ui/useInfiniteScroll";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { ApiResponse, Project } from "@/types/api";

interface ExploreClientProps {
  initialData: ApiResponse<Project[]>;
}

export default function ExploreClient({ initialData }: ExploreClientProps) {
  const searchParams = useSearchParams();

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
    ];

    keys.forEach((key) => {
      const val = searchParams.get(key);
      if (val) params[key] = val;
    });

    return { ...params, limit: 15 };
  }, [searchParams]);

  // Pass initialData to useInfiniteProjects
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteProjects(filters, initialData);

  const projects = useMemo(
    () => data?.pages.flatMap((page) => page.data) || initialData.data,
    [data, initialData.data],
  );

  const sentinelRef = useInfiniteScroll({
    hasNextPage: !!hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  return (
    <div className="w-full bg-white pb-16 md:pb-24 pt-8 md:pt-12 min-h-screen">
      <div className="container">
        <ExploreSearchBar />
        <ExploreFilters loading={false} />
        <ExploreGrid
          projects={projects}
          isFetchingNextPage={isFetchingNextPage}
          sentinelRef={sentinelRef}
        />
      </div>
    </div>
  );
}
