"use client";

import { TalentsSearchBar } from "@/components/talents/TalentsSearchBar";
import { TalentsGrid } from "@/components/talents/TalentsGrid";
import { TalentsFilters } from "@/components/talents/TalentsFilters";
import { useInfiniteProfiles } from "@/hooks/api/useProfile";
import { useInfiniteScroll } from "@/hooks/ui/useInfiniteScroll";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "@heroui/skeleton";
import { useMemo } from "react";

export default function TalentsPage() {
  const searchParams = useSearchParams();

  const filters = useMemo(() => {
    const params: Record<string, string | undefined> = {};

    const search = searchParams.get("search");
    const userType = searchParams.get("userType") || "TALENT";
    const experienceLevel = searchParams.get("experienceLevel");
    const cityId = searchParams.get("cityId");
    const universityId = searchParams.get("universityId");
    const facultyId = searchParams.get("facultyId");

    if (search) params.search = search;
    if (userType && userType !== "all") params.userType = userType;
    if (experienceLevel) params.experienceLevel = experienceLevel;
    if (cityId) params.cityId = cityId;
    if (universityId) params.universityId = universityId;
    if (facultyId) params.facultyId = facultyId;

    return { ...params, limit: 16 };
  }, [searchParams]);

  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteProfiles(filters);

  const allProfiles = useMemo(
    () => data?.pages.flatMap((page) => page.data) || [],
    [data],
  );

  const sentinelRef = useInfiniteScroll({
    hasNextPage: !!hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  if (isLoading) {
    return (
      <div className="w-full bg-white pb-16 md:pb-24 pt-8 md:pt-12 min-h-screen">
        <div className="container">
          <TalentsSearchBar />
          <TalentsFilters />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Skeleton key={i} className="h-[280px] w-full rounded-[20px]" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white pb-16 md:pb-24 pt-8 md:pt-12 min-h-screen">
      <div className="container">
        <TalentsSearchBar />
        <TalentsFilters />
        <TalentsGrid
          profiles={allProfiles}
          isFetchingNextPage={isFetchingNextPage}
          sentinelRef={sentinelRef}
        />
      </div>
    </div>
  );
}
