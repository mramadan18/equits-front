import { Project } from "@/types/api";
import { FeedIdeaCard } from "./FeedIdeaCard";

export const FeedGrid = ({ projects }: { projects: Project[] }) => {
  return (
    <div className="flex flex-col gap-6">
      {projects.map((project) => (
        <FeedIdeaCard key={project.id} idea={project as any} />
      ))}
    </div>
  );
};
