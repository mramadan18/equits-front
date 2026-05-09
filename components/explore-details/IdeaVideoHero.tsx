import { Project } from "@/types/api";
import Image from "next/image";

interface IdeaVideoHeroProps {
  project: Project;
}

export function IdeaVideoHero({ project }: IdeaVideoHeroProps) {
  const videoUrl = project?.videoUrl || null;
  const youtubeId = videoUrl?.includes("watch?v=")
    ? videoUrl.split("watch?v=")[1]
    : null;
  const youtubeUrl = youtubeId
    ? `https://www.youtube.com/embed/${youtubeId}`
    : null;
  return (
    <div className="relative w-full sm:h-[450px] aspect-video bg-dark rounded-xl sm:rounded-2xl overflow-hidden group shadow-md">
      {videoUrl && youtubeId ? (
        <iframe
          src={`${youtubeUrl}`}
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
