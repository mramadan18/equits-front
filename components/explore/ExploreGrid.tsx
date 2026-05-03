"use client";

import { CreativeIdeaCard } from "@/components/shared/creative-idea-card";
import { PaginationData, Project } from "@/types/api";
import { Button } from "@heroui/button";
import { Pagination } from "@heroui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

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

  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="bg-gray-50 rounded-full p-6 mb-4">
          <svg
            className="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {t("noResultsTitle")}
        </h3>
        <p className="text-gray-500 max-w-md">{t("noResultsDescription")}</p>
        <Button
          variant="light"
          color="primary"
          className="mt-4 font-semibold"
          onPress={() => router.push(pathname)}
        >
          {t("clearAllFilters")}
        </Button>
      </div>
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
