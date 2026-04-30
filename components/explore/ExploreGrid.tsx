"use client";

import { CreativeIdeaCard } from "@/components/shared/creative-idea-card";
import { PaginationData, Project } from "@/types/api";
import { Button } from "@heroui/button";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
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
        <div className="flex items-center justify-center gap-4 pt-8 border-t border-gray-100">
          <Button
            variant="flat"
            isIconOnly
            radius="full"
            isDisabled={pagination.page <= 1}
            onPress={() => handlePageChange(pagination.page - 1)}
            className="bg-white border-1 border-gray-200 hover:border-primary transition-colors"
          >
            <IoChevronBack className="text-xl" />
          </Button>

          <div className="flex items-center gap-2">
            {Array.from({ length: pagination.totalPages }).map((_, i) => {
              const pageNum = i + 1;
              // Show limited page numbers if there are too many
              if (
                pagination.totalPages > 7 &&
                pageNum !== 1 &&
                pageNum !== pagination.totalPages &&
                Math.abs(pageNum - pagination.page) > 1
              ) {
                if (Math.abs(pageNum - pagination.page) === 2) {
                  return (
                    <span key={pageNum} className="text-gray-400">
                      ...
                    </span>
                  );
                }
                return null;
              }

              return (
                <Button
                  key={pageNum}
                  variant={pagination.page === pageNum ? "solid" : "light"}
                  color={pagination.page === pageNum ? "primary" : "default"}
                  radius="full"
                  size="sm"
                  className={`min-w-[40px] h-10 font-bold ${
                    pagination.page === pageNum ? "shadow-md" : "text-gray-600"
                  }`}
                  onPress={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </Button>
              );
            })}
          </div>

          <Button
            variant="flat"
            isIconOnly
            radius="full"
            isDisabled={pagination.page >= pagination.totalPages}
            onPress={() => handlePageChange(pagination.page + 1)}
            className="bg-white border-1 border-gray-200 hover:border-primary transition-colors"
          >
            <IoChevronForward className="text-xl" />
          </Button>
        </div>
      )}
    </div>
  );
};
