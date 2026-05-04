"use client";

import {
  IdeaActionSidebar,
  IdeaBusinessPlan,
  IdeaClassifications,
  IdeaElevatorPitch,
  IdeaEngagement,
  IdeaHeader,
  IdeaTeam,
  IdeaVideoHero,
  ProjectSkeleton,
} from "@/components/explore-details";
import { Divider } from "@heroui/divider";
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
    <div className="w-full bg-white pb-16 md:pb-24 pt-8 md:pt-12 min-h-screen">
      <div className="container flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Left Content Column */}
        <div className="flex-1 flex flex-col gap-4">
          <IdeaHeader project={project} />
          <IdeaVideoHero project={project} />
          <IdeaEngagement project={project} />
          <IdeaElevatorPitch project={project} />

          <Divider className="my-1 sm:my-3 bg-gray-200" />
          <IdeaClassifications project={project} />

          <Divider className="my-1 sm:my-3 bg-gray-200" />
          <IdeaTeam project={project} />

          <Divider className="my-1 sm:my-3 bg-gray-200" />
          <IdeaBusinessPlan project={project} />
        </div>

        {/* Right Sidebar */}
        <IdeaActionSidebar project={project} />
      </div>
    </div>
  );
}
