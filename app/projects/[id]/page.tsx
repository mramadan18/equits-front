"use client";

import {
  IdeaActionSidebar,
  IdeaBusinessPlan,
  IdeaClassifications,
  IdeaElevatorPitch,
  IdeaEngagement,
  IdeaHeader,
  IdeaMarketStrategy,
  IdeaTeam,
  IdeaVideoHero,
  ProjectMetrics,
  ProjectSkeleton,
} from "@/components/explore-details";
import { Divider } from "@heroui/react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useProject } from "@/hooks/api/useProject";

export default function ProjectPage() {
  const params = useParams();
  const id = params.id as string;
  const t = useTranslations("ProjectDetails");

  const { data: projectResponse, isLoading, error } = useProject(id);
  const project = projectResponse?.data;

  if (isLoading) {
    return <ProjectSkeleton />;
  }

  if (error || !project) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl font-semibold text-gray-500">
          {error?.response?.data?.message || t("notFound")}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white pb-16 md:pb-24 pt-4 md:pt-8 min-h-screen">
      <div className="container flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Left Content Column */}
        <div className="flex-1 flex flex-col gap-2 sm:gap-4">
          <IdeaHeader project={project} />
          <IdeaVideoHero project={project} />
          <IdeaEngagement project={project} />
          <IdeaElevatorPitch project={project} />

          <Divider className="my-1 sm:my-3 bg-gray-200" />
          <section className="bg-white p-2 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm">
            <IdeaClassifications project={project} />
          </section>

          <Divider className="my-1 sm:my-3 bg-gray-200" />
          <section className="bg-white p-2 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm">
            <ProjectMetrics project={project} />
          </section>

          <Divider className="my-1 sm:my-3 bg-gray-200" />
          <IdeaTeam project={project} />

          <Divider className="my-1 sm:my-3 bg-gray-200" />
          <section className="bg-white p-4 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm">
            <IdeaMarketStrategy project={project} />
          </section>

          <Divider className="my-1 sm:my-3 bg-gray-200" />
          <section className="bg-white p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm">
            <IdeaBusinessPlan project={project} />
          </section>
        </div>

        {/* Right Sidebar */}
        <IdeaActionSidebar project={project} />
      </div>
    </div>
  );
}
