import { Chip } from "@heroui/chip";
import { Project } from "@/types/api";
import { useTranslations } from "next-intl";

interface IdeaClassificationsProps {
  project: Project;
}

export function IdeaClassifications({ project }: IdeaClassificationsProps) {
  const t = useTranslations("ProjectDetails.classifications");
  const te = useTranslations("Pitch.Enums");

  return (
    <div className="flex flex-col gap-5 mt-1">
      <h3 className="text-lg font-medium text-gray2">{t("title")}:</h3>

      {project?.industry && (
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <span className="text-sm font-semibold text-gray2 min-w-[120px]">
            {t("industry")}:
          </span>
          <div className="flex flex-wrap gap-2">
            <Chip
              radius="sm"
              classNames={{
                base: "bg-gray3 text-dark font-semibold h-8 px-1",
              }}
            >
              {project?.industry?.name}
            </Chip>
            {project?.subIndustries?.map((sub) => (
              <Chip
                key={sub.id}
                radius="sm"
                classNames={{
                  base: "bg-gray3 text-dark font-semibold h-8 px-1",
                }}
              >
                {sub.name}
              </Chip>
            ))}
          </div>
        </div>
      )}

      {project?.projectTypes && project?.projectTypes.length > 0 && (
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <span className="text-sm font-semibold text-gray2 min-w-[120px]">
            {t("type")}:
          </span>
          <div className="flex flex-wrap gap-2">
            {project.projectTypes.map((type: string, index: number) => (
              <Chip
                key={index}
                radius="sm"
                classNames={{
                  base: "bg-gray3 text-dark font-semibold h-8 px-1",
                }}
              >
                {te(`ProjectType.${type}` as any) || type}
              </Chip>
            ))}
          </div>
        </div>
      )}

      {project.revenueModel && (
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <span className="text-sm font-semibold text-gray2 min-w-[120px]">
            {t("revenueModel")}:
          </span>
          <div className="flex flex-wrap gap-2">
            <Chip
              radius="sm"
              classNames={{
                base: "bg-gray3 text-dark font-semibold h-8 px-1",
              }}
            >
              {te(`RevenueModel.${project.revenueModel}` as any) ||
                project.revenueModel}
            </Chip>
          </div>
        </div>
      )}

      {project?.stage && (
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <span className="text-sm font-semibold text-gray2 min-w-[120px]">
            {t("stage")}:
          </span>
          <div className="flex flex-wrap gap-2">
            <Chip
              radius="sm"
              classNames={{
                base: "bg-gray3 text-dark font-semibold h-8 px-1",
              }}
            >
              {te(`ProjectStage.${project?.stage}` as any) || project?.stage}
            </Chip>
          </div>
        </div>
      )}
      {project?.marketFocus && (
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <span className="text-sm font-semibold text-gray2 min-w-[120px]">
            {t("marketFocus")}:
          </span>
          <div className="flex flex-wrap gap-2">
            <Chip
              radius="sm"
              classNames={{
                base: "bg-gray3 text-dark font-semibold h-8 px-1",
              }}
            >
              {te(`MarketFocus.${project?.marketFocus}` as any) ||
                project?.marketFocus}
            </Chip>
          </div>
        </div>
      )}
      {project?.serviceArea && (
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <span className="text-sm font-semibold text-gray2 min-w-[120px]">
            {t("serviceArea")}:
          </span>
          <div className="flex flex-wrap gap-2">
            <Chip
              radius="sm"
              classNames={{
                base: "bg-gray3 text-dark font-semibold h-8 px-1",
              }}
            >
              {te(`ServiceArea.${project?.serviceArea}` as any) ||
                project?.serviceArea}
            </Chip>
          </div>
        </div>
      )}
    </div>
  );
}
