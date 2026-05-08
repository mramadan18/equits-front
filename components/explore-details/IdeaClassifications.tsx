"use client";

import { Chip } from "@heroui/react";
import { Project } from "@/types/api";
import { useTranslations } from "next-intl";
import {
  FiBook,
  FiBriefcase,
  FiLayers,
  FiDollarSign,
  FiTrendingUp,
  FiTarget,
  FiGlobe,
} from "react-icons/fi";
import { motion } from "framer-motion";

interface IdeaClassificationsProps {
  project: Project;
}

export function IdeaClassifications({ project }: IdeaClassificationsProps) {
  const t = useTranslations("ProjectDetails.classifications");
  const te = useTranslations("Pitch.Enums");

  const classificationItems = [
    {
      label: "Academic",
      icon: <FiBook className="text-primary" />,
      content: (
        <div className="flex flex-wrap gap-1 sm:gap-2.5">
          <Chip
            radius="sm"
            variant="flat"
            color="primary"
            size="sm"
            className="font-semibold text-xxs sm:text-sm"
          >
            {project?.university?.name}
          </Chip>
          <Chip
            radius="sm"
            variant="flat"
            color="primary"
            size="sm"
            className="font-semibold text-xxs sm:text-sm"
          >
            {project?.faculty?.name}
          </Chip>
        </div>
      ),
      condition: project?.isAcademic,
    },
    {
      label: t("industry"),
      icon: <FiBriefcase className="text-blue-500" />,
      content: (
        <div className="flex flex-wrap gap-1 sm:gap-2.5">
          <Chip
            radius="sm"
            variant="bordered"
            size="sm"
            className="border-gray-200 font-bold text-dark h-7 text-xxs sm:text-sm"
          >
            {project?.industry?.name}
          </Chip>
          {project?.subIndustries?.map((sub) => (
            <Chip
              key={sub.id}
              radius="sm"
              variant="bordered"
              size="sm"
              className="border-gray-100 font-medium text-gray2 h-7 text-xxs sm:text-sm"
            >
              {sub.name}
            </Chip>
          ))}
        </div>
      ),
      condition: !!project?.industry,
    },
    {
      label: t("type"),
      icon: <FiLayers className="text-violet-500" />,
      content: (
        <div className="flex flex-wrap gap-1.5">
          {project.projectTypes.map((type: string, index: number) => (
            <Chip
              key={index}
              radius="sm"
              variant="bordered"
              size="sm"
              className="border-gray-200 font-bold text-dark h-7 text-xxs sm:text-sm"
            >
              {te(`ProjectType.${type}` as any) || type}
            </Chip>
          ))}
        </div>
      ),
      condition: project?.projectTypes && project?.projectTypes.length > 0,
    },
    {
      label: t("revenueModel"),
      icon: <FiDollarSign className="text-emerald-500" />,
      content: (
        <Chip
          radius="sm"
          variant="bordered"
          size="sm"
          className="border-gray-200 font-bold text-dark h-7  text-xxs sm:text-sm"
        >
          {te(`RevenueModel.${project.revenueModel}` as any) ||
            project.revenueModel}
        </Chip>
      ),
      condition: !!project.revenueModel,
    },
    {
      label: t("stage"),
      icon: <FiTrendingUp className="text-amber-500" />,
      content: (
        <Chip
          radius="sm"
          variant="bordered"
          size="sm"
          className="border-gray-200 font-bold text-dark h-7 text-xxs sm:text-sm"
        >
          {te(`ProjectStage.${project?.stage}` as any) || project?.stage}
        </Chip>
      ),
      condition: !!project?.stage,
    },
    {
      label: t("marketFocus"),
      icon: <FiTarget className="text-rose-500" />,
      content: (
        <Chip
          radius="sm"
          variant="bordered"
          size="sm"
          className="border-gray-200 font-bold text-dark h-7 text-xxs sm:text-sm"
        >
          {te(`MarketFocus.${project?.marketFocus}` as any) ||
            project?.marketFocus}
        </Chip>
      ),
      condition: !!project?.marketFocus,
    },
    {
      label: t("serviceArea"),
      icon: <FiGlobe className="text-cyan-500" />,
      content: (
        <Chip
          radius="sm"
          variant="bordered"
          size="sm"
          className="border-gray-200 font-bold text-dark h-7 text-xxs sm:text-sm"
        >
          {te(`ServiceArea.${project?.serviceArea}` as any) ||
            project?.serviceArea}
        </Chip>
      ),
      condition: !!project?.serviceArea,
    },
  ];

  const activeItems = classificationItems.filter((i) => i.condition);

  return (
    <div className="flex flex-col gap-6 mt-4">
      {/* <div className="flex items-center gap-3">
        <h3 className="text-base sm:text-xl font-semibold text-dark">
          {t("title")}
        </h3>
      </div> */}

      {/* Classifications Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 sm:gap-6 w-full">
        {activeItems.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            className="flex flex-col gap-1.5 sm:gap-2.5 p-1 sm:p-4 rounded-xl sm:rounded-2xl border border-gray-100 bg-white hover:border-gray-200 transition-colors shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]"
          >
            <div className="flex items-center gap-2">
              <div className="p-1 sm:p-2 rounded-lg sm:rounded-xl bg-gray-50 group-hover:bg-white transition-colors">
                {item.icon}
              </div>
              <span className="text-xxs font-bold text-gray2 uppercase">
                {item.label}
              </span>
            </div>
            <div className="ps-1">{item.content}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
