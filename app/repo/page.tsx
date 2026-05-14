"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { projectService } from "@/services/project.service";
import { MyProjectCard } from "@/components/repo/MyProjectCard";
import { StatusState } from "@/components/shared/StatusState";
import { Skeleton } from "@heroui/skeleton";
import { Chip } from "@heroui/react";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import {
  HiOutlineFolder,
  HiOutlineClipboardCheck,
  HiOutlineGlobe,
  HiOutlineXCircle,
  HiOutlineViewGrid,
} from "react-icons/hi";

type StatusFilter =
  | "ALL"
  | "DRAFT"
  | "PENDING_APPROVAL"
  | "PUBLISHED"
  | "REJECTED";

export default function RepoPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("Repo");

  const activeFilter = (searchParams.get("filter") as StatusFilter) || "ALL";

  const handleFilterChange = (filter: StatusFilter) => {
    const params = new URLSearchParams(searchParams.toString());
    if (filter === "ALL") {
      params.delete("filter");
    } else {
      params.set("filter", filter);
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const filters: { key: StatusFilter; label: string; icon: React.ReactNode }[] =
    useMemo(
      () => [
        {
          key: "ALL",
          label: t("filters.all"),
          icon: <HiOutlineViewGrid className="w-4 h-4" />,
        },
        {
          key: "DRAFT",
          label: t("filters.drafts"),
          icon: <HiOutlineFolder className="w-4 h-4" />,
        },
        {
          key: "PENDING_APPROVAL",
          label: t("filters.pending"),
          icon: <HiOutlineClipboardCheck className="w-4 h-4" />,
        },
        {
          key: "PUBLISHED",
          label: t("filters.published"),
          icon: <HiOutlineGlobe className="w-4 h-4" />,
        },
        {
          key: "REJECTED",
          label: t("filters.rejected"),
          icon: <HiOutlineXCircle className="w-4 h-4" />,
        },
      ],
      [t],
    );

  const { data, isLoading, error } = useQuery({
    queryKey: ["myProjects"],
    queryFn: projectService.getMyProjects,
  });

  const projects = data?.data || [];

  /* ── derived counts ──────────────────────────────────── */
  const counts = useMemo(() => {
    const c: Record<StatusFilter, number> = {
      ALL: projects.length,
      DRAFT: 0,
      PENDING_APPROVAL: 0,
      PUBLISHED: 0,
      REJECTED: 0,
    };
    projects.forEach((p) => {
      if (c[p.status as StatusFilter] !== undefined)
        c[p.status as StatusFilter]++;
    });
    return c;
  }, [projects]);

  const filtered = useMemo(
    () =>
      activeFilter === "ALL"
        ? projects
        : projects.filter((p) => p.status === activeFilter),
    [projects, activeFilter],
  );

  const RepoSkeleton = (
    <div className="container py-8">
      {/* ── page header skeleton ────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <Skeleton className="h-9 w-48 rounded-lg mb-2" />
          <Skeleton className="h-5 w-72 rounded-lg" />
        </div>
      </div>

      {/* ── filter tabs skeleton ────────────────────────────────── */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1 scrollbar-hide">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-9 w-28 rounded-xl" />
        ))}
      </div>

      {/* ── grid skeleton ─────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} className="h-[300px] w-full rounded-[20px]" />
        ))}
      </div>
    </div>
  );

  return (
    <StatusState
      isLoading={isLoading}
      error={error}
      loadingComponent={RepoSkeleton}
      errorTitle={t("errors.title")}
      errorDescription={t("errors.description")}
      retryText={t("errors.retry")}
      onRetry={() => window.location.reload()}
    >
      <div className="container py-8">
        {/* ── page header ────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-dark leading-tight">
              {t("title")}
            </h1>
            <p className="text-sm text-gray2 mt-1">{t("subtitle")}</p>
          </div>
        </div>

        {/* ── filter tabs ────────────────────────────────── */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1 scrollbar-hide">
          {filters.map((f) => {
            const isActive = activeFilter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => handleFilterChange(f.key)}
                className={`
                inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium
                whitespace-nowrap transition-all duration-200 cursor-pointer
                ${
                  isActive
                    ? "bg-primary text-white shadow-md shadow-primary/25"
                    : "bg-gray3 text-gray2 hover:bg-gray-200"
                }
              `}
              >
                {f.icon}
                {f.label}
                {counts[f.key] > 0 && (
                  <Chip
                    size="sm"
                    variant="flat"
                    classNames={{
                      base: `ml-1 h-5 min-w-5 ${isActive ? "bg-white/20 text-white" : "bg-white text-gray2"}`,
                      content: "px-1 text-[11px] font-bold",
                    }}
                  >
                    {counts[f.key]}
                  </Chip>
                )}
              </button>
            );
          })}
        </div>

        {/* ── grid / empty state ─────────────────────────── */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-100 shadow-card">
            <div className="w-20 h-20 rounded-2xl bg-primary/5 flex items-center justify-center mb-5">
              <HiOutlineFolder className="w-10 h-10 text-primary/40" />
            </div>
            <h3 className="text-lg font-semibold text-dark mb-1">
              {activeFilter === "ALL"
                ? t("empty.all.title")
                : t("empty.status.title", {
                    status:
                      filters
                        .find((f) => f.key === activeFilter)
                        ?.label.toLowerCase() || "",
                  })}
            </h3>
            <p className="text-sm text-gray2 mb-6 max-w-sm text-center">
              {activeFilter === "ALL"
                ? t("empty.all.description")
                : t("empty.status.description")}
            </p>
            {/* {activeFilter === "ALL" && (
              <Button
                color="primary"
                radius="lg"
                className="font-semibold"
                startContent={<HiOutlineDocumentAdd className="w-5 h-5" />}
                onPress={() => router.push(`/projects/new`)}
              >
                {t("empty.all.action")}
              </Button>
            )} */}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((project) => (
              <MyProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </StatusState>
  );
}
