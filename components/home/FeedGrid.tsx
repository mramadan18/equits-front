import { Project } from "@/types/api";
import { FeedIdeaCard } from "./FeedIdeaCard";
import { Skeleton } from "@heroui/skeleton";
import { NoResults } from "../shared/NoResults";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

export const FeedGrid = ({
  projects,
  isLoading,
}: {
  projects: Project[];
  isLoading?: boolean;
}) => {
  const t = useTranslations("Explore");
  const router = useRouter();
  const pathname = usePathname();

  const handleClearFilters = () => {
    router.push(pathname);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-xl p-5 flex flex-col gap-4 shadow-sm"
          >
            <div className="flex justify-between items-center">
              <Skeleton className="w-24 h-4 rounded-lg" />
              <Skeleton className="w-8 h-8 rounded-full" />
            </div>
            <div className="flex flex-col md:flex-row gap-6">
              <Skeleton className="w-full md:w-56 h-48 md:h-28 rounded-xl" />
              <div className="flex flex-col flex-1 gap-3">
                <div className="flex gap-3">
                  <Skeleton className="w-48 h-6 rounded-lg" />
                  <Skeleton className="w-20 h-6 rounded-full" />
                </div>
                <Skeleton className="w-full h-12 rounded-lg" />
                <div className="flex justify-between items-end mt-4">
                  <Skeleton className="w-32 h-8 rounded-lg" />
                  <Skeleton className="w-32 h-8 rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <NoResults
        title={t("noResultsTitle")}
        description={t("noResultsDescription")}
        clearFiltersLabel={t("clearFilters")}
        onClearFilters={handleClearFilters}
      />
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {projects.map((project) => (
        <FeedIdeaCard key={project.id} idea={project as any} />
      ))}
    </div>
  );
};
