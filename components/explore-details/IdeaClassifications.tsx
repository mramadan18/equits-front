import { Chip } from "@heroui/react";
import { Project } from "@/types/api";
import { useTranslations } from "next-intl";
import { formatCurrency } from "@/utils";

interface IdeaClassificationsProps {
  project: Project;
}

export function IdeaClassifications({ project }: IdeaClassificationsProps) {
  const t = useTranslations("ProjectDetails.classifications");
  const te = useTranslations("Pitch.Enums");

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mt-1">
      {/* Left Side: Classifications */}
      <div className="flex flex-col gap-5 flex-grow">
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

      {/* Right Side: Funding & Equity */}
      <div className="flex flex-col justify-end gap-6 min-w-[240px] border-l border-gray-100 pe-8 lg:mt-8">
        <div className="flex items-center justify-between gap-6">
          <span className="text-base font-semibold text-gray2">
            {t("fundingAsk")}:
          </span>
          <span className="text-2xl font-semibold text-dark">
            {project.fundingAsk
              ? Number(project.fundingAsk) >= 1000
                ? `$${(Number(project.fundingAsk) / 1000).toFixed(0)}k`
                : formatCurrency(project.fundingAsk)
              : "$0"}
          </span>
        </div>
        <div className="flex items-center justify-between gap-6">
          <span className="text-base font-semibold text-gray2">
            {t("equityStake")} :
          </span>
          <div className="flex items-baseline">
            <span className="text-2xl font-semibold text-dark">
              {project.equityStake || "0"}
            </span>
            <span className="text-2xl font-semibold text-dark">%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
