"use client";

import { CreativeIdeaCard } from "@/components/shared/creative-idea-card";
import { PaginationData, Project } from "@/types/api";
import { Pagination } from "@heroui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { NoResults } from "@/components/shared";

export const ExploreGrid = ({
  projects,
  pagination,
}: {
  projects: Project[];
  pagination: PaginationData;
}) => {
  const t = useTranslations("Explore");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`, { scroll: true });
  };

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

      {pagination.totalPages > 1 && (
        <div className="flex justify-center pt-8 border-t border-gray-100">
          <Pagination
            total={pagination.totalPages}
            page={pagination.page}
            onChange={handlePageChange}
            showControls
            color="primary"
            variant="flat"
            radius="full"
          />
        </div>
      )}
    </div>
  );
};
