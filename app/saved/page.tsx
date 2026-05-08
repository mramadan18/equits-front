"use client";

import { useWishlist } from "@/hooks/api/useWishlist";
import { useTranslations } from "next-intl";
import { Button, Badge, Pagination } from "@heroui/react";
import { Skeleton } from "@heroui/skeleton";
import { useRouter, useSearchParams } from "next/navigation";
import { StatusState } from "@/components/shared/StatusState";
import { IoBookmarkOutline, IoSearchOutline } from "react-icons/io5";
import { SavedProjectsGrid } from "@/components/saved/SavedProjectsGrid";
import { MainRoutes } from "@/types";
import Link from "next/link";

export default function SavedPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const { data, isLoading } = useWishlist();
  const t = useTranslations("Saved");

  const projects = data?.data || [];
  const pagination = data?.pagination || {
    total: 0,
    page: 1,
    limit: 16,
    totalPages: 0,
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const SavedSkeleton = (
    <div className="w-full bg-white pb-16 md:pb-24 pt-8 md:pt-12 min-h-screen">
      <div className="container">
        <div className="flex justify-between items-end mb-8">
          <div className="flex items-center gap-3">
            <Skeleton className="h-9 w-48 rounded-lg" />
            <Skeleton className="h-7 w-12 rounded-lg" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-[300px] w-full rounded-[20px]" />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <StatusState isLoading={isLoading} loadingComponent={SavedSkeleton}>
      <div className="w-full bg-white pb-16 md:pb-24 pt-8 md:pt-12 min-h-screen">
        <div className="container">
          <div className="flex justify-between items-end mb-8">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-dark">{t("title")}</h1>
              <Badge
                color="primary"
                variant="flat"
                size="lg"
                className="font-bold"
              >
                {projects.length}
              </Badge>
            </div>
          </div>

          {projects.length > 0 ? (
            <>
              <SavedProjectsGrid projects={projects} />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center rounded-2xl bg-gray-50/50 border border-gray-100 shadow-sm mt-8">
              <div className="bg-primary/10 p-6 rounded-full mb-6 relative">
                <IoBookmarkOutline className="text-primary w-12 h-12" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                {t("emptyTitle")}
              </h2>
              <p className="text-gray-500 max-w-md mb-8">{t("emptyDesc")}</p>
              <Button
                as={Link}
                href={MainRoutes.EXPLORE}
                color="primary"
                size="lg"
                className="font-medium px-8 shadow-md"
                startContent={<IoSearchOutline className="w-5 h-5" />}
              >
                {t("exploreBtn")}
              </Button>
            </div>
          )}

          {pagination &&
            pagination.totalPages &&
            pagination.totalPages > 1 &&
            projects.length > 0 && (
              <div className="flex justify-center mt-12 pt-8 border-t border-gray-100">
                <Pagination
                  total={pagination.totalPages}
                  page={page || 1}
                  onChange={handlePageChange}
                  color="primary"
                  variant="flat"
                />
              </div>
            )}
        </div>
      </div>
    </StatusState>
  );
}
