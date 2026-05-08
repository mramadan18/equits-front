"use client";

import { ReactNode } from "react";
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
import { StatusState } from "@/components/shared/StatusState";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useProject } from "@/hooks/api/useProject";

const SectionWrapper = ({ children }: { children: ReactNode }) => (
  <section className="bg-white p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm">
    {children}
  </section>
);

export default function ProjectPage() {
  const params = useParams();
  const id = params.id as string;
  const t = useTranslations("ProjectDetails");

  const { data: projectResponse, isLoading, error } = useProject(id);
  const project = projectResponse?.data;

  const isError = Boolean(error || (!isLoading && !project));

  return (
    <StatusState
      isLoading={isLoading}
      error={isError}
      loadingComponent={<ProjectSkeleton />}
      errorTitle={t("notFound")}
      errorDescription={error?.response?.data?.message || t("notFound")}
    >
      {project && (
        <div className="w-full bg-gray-50/50 pb-16 md:pb-24 pt-4 md:pt-8 min-h-screen">
          <div className="container flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Left Content Column */}
            <div className="flex-1 flex flex-col gap-6 sm:gap-8">
              <div className="flex flex-col gap-4">
                <IdeaHeader project={project} />
                <IdeaVideoHero project={project} />
                <IdeaEngagement project={project} />
                <IdeaElevatorPitch project={project} />
              </div>

              <SectionWrapper>
                <IdeaClassifications project={project} />
              </SectionWrapper>

              <SectionWrapper>
                <ProjectMetrics project={project} />
              </SectionWrapper>

              <IdeaTeam project={project} />

              <SectionWrapper>
                <IdeaMarketStrategy project={project} />
              </SectionWrapper>

              <SectionWrapper>
                <IdeaBusinessPlan project={project} />
              </SectionWrapper>
            </div>

            {/* Right Sidebar */}
            <div className="lg:w-1/3">
              <IdeaActionSidebar project={project} />
            </div>
          </div>
        </div>
      )}
    </StatusState>
  );
}
