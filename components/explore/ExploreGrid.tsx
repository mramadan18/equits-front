"use client";

import { CreativeIdeaCard } from "@/components/ui/creative-idea-card";
import { Project } from "@/types/api";
import { useTranslations } from "next-intl";
import { NoResults } from "@/components/ui";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Spinner } from "@heroui/react";

interface ExploreGridProps {
  projects: Project[];
  /** Whether the next page is currently being fetched */
  isFetchingNextPage?: boolean;
  /** Sentinel ref for infinite scroll trigger */
  sentinelRef?: React.Ref<HTMLDivElement>;
}

export const ExploreGrid = ({
  projects,
  isFetchingNextPage,
  sentinelRef,
}: ExploreGridProps) => {
  const t = useTranslations("Explore");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const hasActiveFilters = Array.from(searchParams.keys()).some(
    (key) => key !== "page",
  );

  if (projects.length === 0) {
    return (
      <NoResults
        title={t("noResultsTitle")}
        description={t("noResultsDescription")}
        clearFiltersLabel={hasActiveFilters ? t("clearAllFilters") : undefined}
        onClearFilters={
          hasActiveFilters ? () => router.push(pathname) : undefined
        }
      />
    );
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((item: Project) => (
          <CreativeIdeaCard key={item.id} item={item} />
        ))}
      </div>

      {/* Infinite scroll sentinel */}
      <div ref={sentinelRef} className="w-full flex justify-center py-4">
        {isFetchingNextPage && <Spinner size="lg" color="primary" />}
      </div>
    </div>
  );
};
