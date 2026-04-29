import {
  IdeaActionSidebar,
  IdeaBusinessPlan,
  IdeaClassifications,
  IdeaElevatorPitch,
  IdeaEngagement,
  IdeaHeader,
  IdeaTeam,
  IdeaVideoHero,
} from "@/components/explore-details";
import { projectService } from "@/services/project.service";
import { Divider } from "@heroui/divider";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const projectId = id;

  const { data: project } = await projectService.getProjectById(projectId);

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl font-semibold text-gray-500">Project not found</p>
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
