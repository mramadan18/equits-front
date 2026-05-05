"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { FaHeart, FaCommentDots, FaStar } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import Link from "next/link";
import { Stat } from "@/components/shared/creative-idea-card/components/Stat";
import { Button } from "@heroui/react";
import { Project } from "@/types/api";
import { MainRoutes } from "@/types";

export const TalentProjectCard = ({ project }: { project: Project }) => {
  const t = useTranslations("TalentDetails");

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray2 p-5 flex flex-col md:flex-row gap-6">
      {/* Image */}
      <div className="w-full md:w-56 h-36 md:h-auto relative flex-shrink-0">
        <Image
          src={project?.cover}
          alt={project?.title}
          fill
          className="size-full object-cover rounded-xl overflow-hidden"
        />
        {project?.logo && (
          <div className="absolute -top-2 -end-4 w-12 h-12 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
            <Image
              src={project?.logo}
              alt={project?.title}
              fill
              className="object-cover"
            />
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="flex-1 flex flex-col">
        <div className="flex flex-col md:flex-row md:items-center gap-2 mb-3">
          <h3 className="font-medium text-dark text-base md:text-lg">
            {project?.title}
          </h3>
          {/* <span className="text-gray2 font-medium">@ {project.title}</span> */}
        </div>

        <p className="text-gray2 mb-6 line-clamp-3 leading-relaxed">
          {project?.elevatorPitch}
        </p>

        {/* Stats & Actions Row */}
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm font-semibold">
            <Stat
              icon={<FaHeart className="text-red-500 text-lg" />}
              value={project?.likesCount}
            />
            <Stat
              icon={<FaCommentDots className="text-green-500 text-xl" />}
              value={project?.commentsCount}
            />
            <Stat
              icon={<FaStar className="text-orange-400 text-lg" />}
              value={project?.rating}
            />
          </div>

          <Button
            as={Link}
            href={`${MainRoutes.PROJECTS}/${project?.id}`}
            className="text-primary font-bold"
            endContent={<FaArrowRightLong className="rtl:rotate-180" />}
            color="primary"
            variant="light"
          >
            {t("viewDetails")}
          </Button>
        </div>
      </div>
    </div>
  );
};
