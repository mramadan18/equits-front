"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { TalentCard } from "./TalentCard";
import { User } from "@/types/api";
import { NoResults } from "@/components/ui";
import { useTranslations } from "next-intl";
import { Spinner } from "@heroui/react";

interface TalentsGridProps {
  profiles: User[];
  /** Whether the next page is currently being fetched */
  isFetchingNextPage?: boolean;
  /** Sentinel ref for infinite scroll trigger */
  sentinelRef?: React.Ref<HTMLDivElement>;
}

export const TalentsGrid = ({
  profiles,
  isFetchingNextPage,
  sentinelRef,
}: TalentsGridProps) => {
  const t = useTranslations("TalentsExplore");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const hasActiveFilters = Array.from(searchParams.keys()).some(
    (key) => key !== "page",
  );

  if (profiles.length === 0) {
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
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {profiles.map((item) => (
          <TalentCard key={item.id} item={item} />
        ))}
      </div>

      {/* Infinite scroll sentinel */}
      <div ref={sentinelRef} className="w-full flex justify-center py-4">
        {isFetchingNextPage && <Spinner size="lg" color="primary" />}
      </div>
    </div>
  );
};
