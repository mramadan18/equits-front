import { Project } from "@/types/api";
import { useTranslations } from "next-intl";

interface IdeaElevatorPitchProps {
  project: Project;
}

export function IdeaElevatorPitch({ project }: IdeaElevatorPitchProps) {
  const t = useTranslations("ProjectDetails.pitch");

  return (
    <div className="flex flex-col gap-3 mt-2">
      <h3 className="text-lg font-medium text-gray2">{t("title")}:</h3>
      <div
        className="text-gray leading-relaxed"
        dangerouslySetInnerHTML={{ __html: `${project?.elevatorPitch}` }}
      />
    </div>
  );
}
