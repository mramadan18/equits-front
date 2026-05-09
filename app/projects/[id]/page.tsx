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
} from "@/components/explore-details";
import { fetchServer } from "@/utils/api-utils";
import { Project } from "@/types/api";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const response = await fetchServer<Project>(`/projects/${id}`);
    const project = response.data;

    return {
      title: `${project.title} | Equits`,
      description: project.elevatorPitch || project.tagline,
      openGraph: {
        title: project.title,
        description: project.elevatorPitch || project.tagline,
        images: project.cover ? [project.cover] : [],
      },
      twitter: {
        card: "summary_large_image",
        title: project.title,
        description: project.elevatorPitch || project.tagline,
        images: project.cover ? [project.cover] : [],
      },
      alternates: { canonical: `/projects/${id}` },
    };
  } catch {
    return {
      title: "Project Not Found | Equits",
    };
  }
}

const SectionWrapper = ({ children }: { children: ReactNode }) => (
  <section className="bg-white p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm">
    {children}
  </section>
);

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;

  let project;
  try {
    const response = await fetchServer<Project>(`/projects/${id}`);
    project = response.data;
  } catch {
    notFound();
  }

  if (!project) {
    notFound();
  }

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.elevatorPitch || project.tagline,
    image: project.cover || undefined,
    url: `https://equits.net/projects/${id}`,
    author: {
      "@type": "Person",
      name: `${project?.owner?.firstName} ${project?.owner?.lastName}`,
      image: project?.owner?.avatar || undefined,
      url: project?.owner?.id
        ? `https://equits.net/talents/${project?.owner?.id}`
        : undefined,
    },
    dateCreated: project.createdAt,
    dateModified: project.updatedAt || project.createdAt,
  };

  return (
    <div className="w-full bg-gray-50/50 pb-16 md:pb-24 pt-4 md:pt-8 min-h-screen">
      <JsonLd data={projectJsonLd} />
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
  );
}
