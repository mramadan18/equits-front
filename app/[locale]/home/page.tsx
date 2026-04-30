"use client";
import { useState, useEffect } from "react";
import { ExploreFilters } from "@/components/explore/ExploreFilters";
import { FeedGrid } from "@/components/home/FeedGrid";
import { FeedProfileCard } from "@/components/home/FeedProfileCard";
import { PeopleYouMayNeedSidebar } from "@/components/talent-details";
import { MOCK_TALENT_DETAILS } from "@/components/talent-details/mockData";
import { useProjectsFeed } from "@/hooks/api/useProject";
import { ProjectFilters } from "@/types/api";
import { Pagination } from "@heroui/pagination";
import { useDebounce } from "@/hooks/ui/useDebounce";
import { HomeSearchBar } from "@/components/home/HomeSearchBar";

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [filters, setFilters] = useState<ProjectFilters>({
    page: 1,
    limit: 10,
  });

  const { data: projects } = useProjectsFeed(filters);

  // Update search filter when debounced term changes
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      search: debouncedSearchTerm || undefined,
      page: 1, // Reset to first page on new search
    }));
  }, [debouncedSearchTerm]);

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Feed */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <HomeSearchBar value={searchTerm} onValueChange={setSearchTerm} />
          <ExploreFilters />
          <FeedGrid projects={projects?.data || []} />

          {projects?.pagination && projects.pagination.totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <Pagination
                total={projects.pagination.totalPages}
                page={filters.page || 1}
                onChange={(page) => setFilters((prev) => ({ ...prev, page }))}
                color="primary"
                variant="flat"
              />
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <FeedProfileCard talent={MOCK_TALENT_DETAILS} />
          <PeopleYouMayNeedSidebar />
        </div>
      </div>
    </div>
  );
}
