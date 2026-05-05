import { Project } from "@/types/api";
import { useTranslations } from "next-intl";

interface IdeaMarketStrategyProps {
  project: Project;
}

export function IdeaMarketStrategy({ project }: IdeaMarketStrategyProps) {
  const t = useTranslations("ProjectDetails.market");

  return (
    <div className="flex flex-col gap-6 mt-1">
      {project.problem && (
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-gray2">{t("problem")}:</h3>
          <p className="text-gray leading-relaxed text-sm sm:text-base">
            {project.problem}
          </p>
        </div>
      )}

      {project.solution && (
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-gray2">{t("solution")}:</h3>
          <p className="text-gray leading-relaxed text-sm sm:text-base">
            {project.solution}
          </p>
        </div>
      )}

      {project.valueProp && (
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-gray2">
            {t("valueProp")}:
          </h3>
          <p className="text-gray leading-relaxed text-sm sm:text-base">
            {project.valueProp}
          </p>
        </div>
      )}
    </div>
  );
}
