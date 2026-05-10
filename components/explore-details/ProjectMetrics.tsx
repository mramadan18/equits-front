"use client";

import { Project } from "@/types/api";
import { useTranslations } from "next-intl";
import { formatCurrency } from "@/utils";
import {
  FiTrendingUp,
  FiUsers,
  FiActivity,
  FiDollarSign,
  FiTarget,
  FiLayers,
  FiBriefcase,
  FiBarChart2,
} from "react-icons/fi";
import { Card, CardBody } from "@heroui/react";
import { motion } from "framer-motion";
import { ProjectFinancials } from "./ProjectFinancials";

export function ProjectMetrics({ project }: { project: Project }) {
  const t = useTranslations("ProjectDetails.metrics");
  const te = useTranslations("Pitch.Enums");

  const metrics = [
    {
      label: t("currentTraction"),
      value:
        te(`TractionType.${project.currentTraction}` as any) ||
        project.currentTraction,
      icon: <FiActivity className="text-blue-500 text-xl" />,
      condition: project.currentTraction,
      bg: "bg-blue-50",
    },
    {
      label: t("growthRate"),
      value:
        te(`GrowthRate.${project.growthRate}` as any) || project.growthRate,
      icon: <FiTrendingUp className="text-emerald-500 text-xl" />,
      condition: project.growthRate,
      bg: "bg-emerald-50",
    },
    {
      label: t("totalUsers"),
      value: project.totalUsers,
      icon: <FiUsers className="text-violet-500 text-xl" />,
      condition: project.totalUsers,
      bg: "bg-violet-50",
    },
    {
      label: t("dailyActiveUsers"),
      value: project.dailyActiveUsers,
      icon: <FiBarChart2 className="text-orange-500 text-xl" />,
      condition: project.dailyActiveUsers,
      bg: "bg-orange-50",
    },
    {
      label: t("monthlyRevenue"),
      value: formatCurrency(Number(project.monthlyRevenue || 0)),
      icon: <FiDollarSign className="text-green-600 text-xl" />,
      condition: project.monthlyRevenue,
      bg: "bg-green-50",
    },
    {
      label: t("growthRatePct"),
      value: `${project.growthRatePct}%`,
      icon: <FiTrendingUp className="text-cyan-500 text-xl" />,
      condition: project.growthRatePct,
      bg: "bg-cyan-50",
    },
    {
      label: t("retentionRate"),
      value: `${project.retentionRate}%`,
      icon: <FiTarget className="text-rose-500 text-xl" />,
      condition: project.retentionRate,
      bg: "bg-rose-50",
    },
    {
      label: t("conversionRate"),
      value: `${project.conversionRate}%`,
      icon: <FiLayers className="text-indigo-500 text-xl" />,
      condition: project.conversionRate,
      bg: "bg-indigo-50",
    },
    {
      label: t("fundingStage"),
      value:
        te(`FundingStage.${project.fundingStage}` as any) ||
        project.fundingStage,
      icon: <FiBriefcase className="text-amber-500 text-xl" />,
      condition: project.fundingStage,
      bg: "bg-amber-50",
    },
  ];

  const activeMetrics = metrics.filter((m) => m.condition);

  if (activeMetrics.length === 0 && !project.useOfFunds) return null;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <div className="flex flex-col gap-6 mt-4">
      {/* <div className="flex items-center gap-3">
        <h3 className="text-base sm:text-xl font-semibold text-dark">
          {t("title")}
        </h3>
      </div> */}

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
      >
        {activeMetrics.map((metric, index) => (
          <motion.div variants={item} key={index}>
            <Card
              shadow="none"
              className="border border-gray-100 bg-white hover:border-yellow/30 hover:shadow-md transition-all duration-300 group"
              classNames={{
                base: "p-0",
              }}
            >
              <CardBody className="flex flex-col justify-center items-center gap-2 sm:gap-4 p-1 sm:p-4">
                <div
                  className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl ${metric.bg} group-hover:scale-110 transition-transform duration-300`}
                >
                  {metric.icon}
                </div>
                <div className="flex flex-col justify-center items-center text-center">
                  <span className="text-[10px] font-bold text-gray2 uppercase tracking-[0.1em] mb-0.5">
                    {metric.label}
                  </span>
                  <span className="text-base sm:text-lg font-bold text-dark tabular-nums">
                    {metric.value}
                  </span>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-4">
        <ProjectFinancials project={project} />
      </div>

      {project.useOfFunds && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Card
            shadow="none"
            className="border border-gray-100 bg-gray-50/50 mt-2 overflow-hidden relative"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-yellow" />
            <CardBody className="p-2 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-white shadow-sm border border-gray-100">
                  <FiTarget className="text-primary text-xl" />
                </div>
                <h4 className="text-base sm:text-xl font-semibold text-dark">
                  {t("useOfFunds")}
                </h4>
              </div>
              <p className="text-gray leading-relaxed text-xs sm:text-lg font-medium">
                {project.useOfFunds}
              </p>
            </CardBody>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
