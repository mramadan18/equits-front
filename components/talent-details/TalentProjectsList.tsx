import { Project } from "@/types/api";
import { TalentProjectCard } from "./TalentProjectCard";

export const TalentProjectsList = ({ projects }: { projects: Project[] }) => {
  return (
    <div className="flex flex-col gap-6 w-full">
      {projects.map((project) => (
        <TalentProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};
