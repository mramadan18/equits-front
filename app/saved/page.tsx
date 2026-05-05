"use client";

import { useWishlist } from "@/hooks/api/useWishlist";
import { useTranslations } from "next-intl";
import { Spinner } from "@heroui/spinner";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Badge } from "@heroui/badge";
import Link from "next/link";
import { MainRoutes } from "@/types";
import {
  IoBookmarkOutline,
  IoSearchOutline,
  IoFilterOutline,
} from "react-icons/io5";
import { SavedProjectsGrid } from "@/components/saved/SavedProjectsGrid";
import { Pagination } from "@heroui/pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SavedPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const { data, isLoading } = useWishlist();
  const t = useTranslations("Saved");
  const [searchQuery, setSearchQuery] = useState("");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Spinner className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const projects = data?.data || [];
  const pagination = data?.pagination || {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const filteredProjects = projects.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
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
            <div className="flex flex-col sm:flex-row gap-4 mb-8 pb-6 border-b border-gray-100">
              <Input
                classNames={{
                  base: "max-w-md",
                  inputWrapper:
                    "bg-gray-50 border border-gray-200 hover:border-primary transition-colors",
                }}
                placeholder="Search in saved projects..."
                value={searchQuery}
                onValueChange={setSearchQuery}
                startContent={<IoSearchOutline className="text-gray-400" />}
              />
              <div className="flex gap-2">
                <Button variant="flat" startContent={<IoFilterOutline />}>
                  Filter
                </Button>
              </div>
            </div>

            {filteredProjects.length > 0 ? (
              <SavedProjectsGrid projects={filteredProjects} />
            ) : (
              <div className="text-center py-10 text-gray-500">
                No saved projects match your search
              </div>
            )}
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

        {pagination && pagination.totalPages > 1 && projects.length > 0 && (
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
  );
}
