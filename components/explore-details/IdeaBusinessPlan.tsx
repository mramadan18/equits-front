import { Project } from "@/types/api";
import { Button } from "@heroui/react";
import { FiEye } from "react-icons/fi";
import { useTranslations } from "next-intl";

interface IdeaBusinessPlanProps {
  project: Project;
}

export function IdeaBusinessPlan({ project }: IdeaBusinessPlanProps) {
  const t = useTranslations("ProjectDetails.businessPlan");
  if (!project.businessPlanUrl) return null;

  return (
    <div className="flex flex-col gap-4 mt-1">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-dark">{t("title")}:</h3>
        <Button
          as="a"
          href={project.businessPlanUrl}
          target="_blank"
          variant="flat"
          color="primary"
          size="sm"
          startContent={<FiEye className="w-4 h-4" />}
          className="font-semibold"
        >
          {t("viewPdf")}
        </Button>
      </div>
      <div className="w-full h-[400px] sm:h-[500px] rounded-xl border border-gray-200 bg-gray-50 overflow-hidden">
        <iframe
          src={`${project.businessPlanUrl}#toolbar=0&navpanes=0&scrollbar=0`}
          title={t("title")}
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
