import { Project } from "@/types/api";
import Image from "next/image";

interface IdeaVideoHeroProps {
  project: Project;
}

export function IdeaVideoHero({ project }: IdeaVideoHeroProps) {
  return (
    <div className="relative w-full sm:h-[450px] aspect-video bg-dark rounded-xl sm:rounded-2xl overflow-hidden group shadow-md">
      {project?.videoUrl ? (
        <iframe
          src={`${project?.videoUrl}`}
          title={`${project?.title}`}
          loading="lazy"
          className="w-full h-full object-cover"
          allowFullScreen
        />
      ) : (
        <Image
          src={`${project?.cover}`}
          alt={`${project?.title}`}
          width={500}
          height={500}
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
}
