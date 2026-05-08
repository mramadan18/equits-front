"use client";

import { Project } from "@/types/api";
import { useTranslations } from "next-intl";
import { formatCurrency } from "@/utils";
import { FiDollarSign, FiPieChart } from "react-icons/fi";
import { Card, CardBody } from "@heroui/react";

export function ProjectFinancials({ project }: { project: Project }) {
  const t = useTranslations("ProjectDetails.metrics");

  if (!project.fundingAsk && !project.equityStake) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {project.fundingAsk && (
        <Card
          shadow="none"
          className="border border-gray-100 bg-white hover:border-yellow/30 hover:shadow-md transition-all duration-300 group"
        >
          <CardBody className="flex flex-row items-center gap-4 p-4">
            <div className="p-3 rounded-2xl bg-green-50 group-hover:scale-110 transition-transform duration-300">
              <FiDollarSign className="text-green-600 text-xl" />
            </div>
            <div className="flex flex-col">
              <span className="text-xxs font-bold text-gray2 uppercase tracking-[0.1em] mb-0.5">
                {t("fundingAsk")}
              </span>
              <span className="text-2xl font-bold text-dark tabular-nums">
                {Number(project.fundingAsk) >= 1000
                  ? `$${(Number(project.fundingAsk) / 1000).toFixed(0)}k`
                  : formatCurrency(project.fundingAsk)}
              </span>
            </div>
          </CardBody>
        </Card>
      )}

      {project.equityStake && (
        <Card
          shadow="none"
          className="border border-gray-100 bg-white hover:border-yellow/30 hover:shadow-md transition-all duration-300 group"
        >
          <CardBody className="flex flex-row items-center gap-4 p-4">
            <div className="p-3 rounded-2xl bg-purple-50 group-hover:scale-110 transition-transform duration-300">
              <FiPieChart className="text-purple-500 text-xl" />
            </div>
            <div className="flex flex-col">
              <span className="text-xxs font-bold text-gray2 uppercase tracking-[0.1em] mb-0.5">
                {t("equityStake")}
              </span>
              <span className="text-2xl font-bold text-dark tabular-nums">
                {project.equityStake}%
              </span>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
