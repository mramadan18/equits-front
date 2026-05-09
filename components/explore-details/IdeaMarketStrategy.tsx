"use client";

import { Project } from "@/types/api";
import { useTranslations } from "next-intl";
import { FiAlertCircle, FiCheckCircle, FiStar } from "react-icons/fi";
import { motion } from "framer-motion";

export function IdeaMarketStrategy({ project }: { project: Project }) {
  const t = useTranslations("ProjectDetails.market");

  const strategies = [
    {
      title: t("problem"),
      content: project.problem,
      icon: <FiAlertCircle className="text-rose-500" />,
      bg: "bg-rose-50/50",
      border: "border-rose-100",
      condition: !!project.problem,
    },
    {
      title: t("solution"),
      content: project.solution,
      icon: <FiCheckCircle className="text-emerald-500" />,
      bg: "bg-emerald-50/50",
      border: "border-emerald-100",
      condition: !!project.solution,
    },
    {
      title: t("valueProp"),
      content: project.valueProp,
      icon: <FiStar className="text-amber-500" />,
      bg: "bg-amber-50/50",
      border: "border-amber-100",
      condition: !!project.valueProp,
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* <div className="flex items-center gap-3">
        <h3 className="text-base sm:text-xl font-semibold text-dark">
          {t("title")}
        </h3>
      </div> */}

      <div className="grid grid-cols-1 gap-6">
        {strategies
          .filter((s) => s.condition)
          .map((strategy, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`p-2 sm:p-4 rounded-xl sm:rounded-xl border ${strategy.border} ${strategy.bg} flex flex-col gap-3 sm:gap-4 relative overflow-hidden`}
            >
              <div className="flex items-center gap-3 relative z-10">
                <div className="p-2 rounded-xl bg-white shadow-sm">
                  {strategy.icon}
                </div>
                <h4 className="text-xs sm:text-lg font-bold text-dark">
                  {strategy.title}
                </h4>
              </div>
              <p className="text-gray leading-relaxed font-medium relative z-10 text-xxs! sm:text-base md:text-lg">
                {strategy.content}
              </p>

              {/* Decorative Icon in background */}
              <div className="absolute -bottom-4 -right-4 opacity-[0.03] text-xl pointer-events-none">
                {strategy.icon}
              </div>
            </motion.div>
          ))}
      </div>
    </div>
  );
}
