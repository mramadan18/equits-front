import Image from "next/image";
import { FiCalendar } from "react-icons/fi";
import { Project } from "@/types/api";
import moment from "moment";

interface IdeaHeaderProps {
  project: Project;
}

export function IdeaHeader({ project }: IdeaHeaderProps) {
  const formattedDate = project.createdAt
    ? moment(project.createdAt).format("DD / MM / YYYY")
    : "N/A";

  return (
    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          {project?.logo && (
            <Image
              src={`${project.logo}`}
              alt={`${project.title}`}
              width={32}
              height={32}
              className="w-10 h-10 object-contain"
            />
          )}
          <h1 className="text-2xl font-semibold text-dark">{project?.title}</h1>
        </div>
        <p className="text-sm text-gray font-medium">{project?.tagline}</p>
      </div>

      <div className="flex flex-col items-start sm:items-end gap-1.5 text-gray mt-1 sm:mt-0">
        <div className="flex items-center gap-2 font-medium">
          <FiCalendar className="w-5 h-5" />
          <span className="text-sm">{formattedDate}</span>
        </div>
        <span className="text-xs">
          Updated:{" "}
          {project.updatedAt ? moment(project.updatedAt).fromNow() : "Recently"}
        </span>
      </div>
    </div>
  );
}
