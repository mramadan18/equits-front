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
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-start gap-3">
        {project?.logo && (
          <Image
            src={`${project.logo}`}
            alt={`${project.title}`}
            width={40}
            height={40}
            className="w-10 h-10 sm:w-12 sm:h-12 object-contain shrink-0 mt-1"
          />
        )}
        <div className="flex flex-col">
          <h1 className="text-xl sm:text-2xl font-semibold text-dark">
            {project?.title}
          </h1>
          <p className="text-xs sm:text-base text-gray2 font-medium">
            {project?.tagline}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-start sm:items-end gap-1 text-gray-400 mt-1 sm:mt-0 shrink-0">
        <div className="flex items-center gap-2 font-bold">
          <FiCalendar className="text-sm sm:text-base" />
          <span className="text-[10px] sm:text-xs">{formattedDate}</span>
        </div>
        <span className="text-[8px] sm:text-xs">
          {t("updated")}:{" "}
          {project.updatedAt
            ? dayjs(project.updatedAt).fromNow()
            : t("recently")}
        </span>
      </div>
    </div>
  );
}
