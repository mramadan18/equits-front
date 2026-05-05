import Image from "next/image";
import { FiCalendar } from "react-icons/fi";
import { Project } from "@/types/api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useTranslations } from "next-intl";

dayjs.extend(relativeTime);

export function IdeaHeader({ project }: { project: Project }) {
  const t = useTranslations("ProjectDetails.header");

  const formattedDate = project.createdAt
    ? dayjs(project.createdAt).format("DD / MM / YYYY")
    : t("na");

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
          {t("updated")}:{" "}
          {project.updatedAt
            ? dayjs(project.updatedAt).fromNow()
            : t("recently")}
        </span>
      </div>
    </div>
  );
}
