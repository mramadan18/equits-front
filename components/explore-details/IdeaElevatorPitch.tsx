"use client";

import { Project } from "@/types/api";
import { useTranslations } from "next-intl";
import { FiZap } from "react-icons/fi";

interface IdeaElevatorPitchProps {
  project: Project;
}

export function IdeaElevatorPitch({ project }: IdeaElevatorPitchProps) {
  const t = useTranslations("ProjectDetails.pitch");

  return (
    <div className="flex flex-col gap-1 sm:gap-4">
      <div className="flex items-center gap-2">
        <div className="p-1.5 rounded-lg bg-amber-50 text-amber-500">
          <FiZap className="text-lg fill-amber-500" />
        </div>
        <h3 className="text-base sm:text-xl font-semibold text-dark">
          {t("title")}
        </h3>
      </div>
      <div
        className="text-gray2 leading-relaxed text-xxs! sm:text-lg! font-medium ps-2 border-s-4 border-amber-100"
        dangerouslySetInnerHTML={{
          __html: project?.elevatorPitch ? `${project.elevatorPitch}` : "",
        }}
      />
    </div>
  );
}
