"use client";

import { Avatar } from "@heroui/react";
import { Project } from "@/types/api";
import { useTranslations } from "next-intl";
import { MainRoutes } from "@/types";
import Link from "next/link";
import { FiUsers, FiArrowRight } from "react-icons/fi";

export function IdeaTeam({ project }: { project: Project }) {
  const t = useTranslations("ProjectDetails.team");
  const allTeamMembers = [
    ...(project.owner ? [project.owner] : []),
    ...(project.teamMembers || []),
  ];

  if (allTeamMembers.length === 0) return null;

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/10 text-primary">
            <FiUsers className="text-xl" />
          </div>
          <h3 className="text-base sm:text-xl font-semibold text-dark">
            {t("title")}
          </h3>
        </div>
        <span className="text-xs font-semibold text-gray2 bg-gray-50 px-2 py-1 rounded-lg">
          {allTeamMembers.length}
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {allTeamMembers.map((member, index) => (
          <Link
            key={index}
            href={`${MainRoutes.TALENTS}/${member.id}`}
            className="flex items-center gap-4 p-3 bg-gray-50/50 hover:bg-white rounded-2xl border border-transparent hover:border-gray-100 hover:shadow-md transition-all duration-300 group"
          >
            <Avatar
              src={`${member.avatar}`}
              color="primary"
              showFallback
              className="w-12 h-12 text-large shrink-0 border-2 border-white shadow-sm"
            />
            <div className="flex-grow flex flex-col gap-0.5 overflow-hidden">
              <span className="font-semibold text-dark text-sm truncate group-hover:text-primary transition-colors">
                {member.firstName} {member.lastName}
              </span>
              <span className="text-xs font-semibold text-gray2 truncate uppercase tracking-wider">
                {member.jobTitle}
              </span>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0">
              <FiArrowRight className="text-primary" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
