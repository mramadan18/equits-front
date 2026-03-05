import { useTranslations } from "next-intl";
import Image from "next/image";
import { MdVerified } from "react-icons/md";
import { FaVideo, FaGraduationCap } from "react-icons/fa";
import { IoLocationOutline, IoPersonOutline } from "react-icons/io5";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";

import { TalentDetailsData } from "./types";

interface TalentProfileOverviewProps {
  talent: TalentDetailsData;
}

export const TalentProfileOverview = ({
  talent,
}: TalentProfileOverviewProps) => {
  const t = useTranslations("TalentDetails");

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-6 flex flex-col">
      {/* Cover Image */}
      <div className="h-48 md:h-64 w-full relative">
        <Image
          src={talent.coverImage}
          alt={`${talent.name} cover`}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>

      <div className="relative px-6 md:px-8 pb-8 flex flex-col pt-0">
        {/* Avatar */}
        <div className="absolute -top-16 md:-top-20 left-6 md:left-8 w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white bg-gray-100 overflow-hidden shadow-md z-10 flex-shrink-0">
          <Image
            src={talent.avatar}
            alt={talent.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Action Tags Top Right */}
        <div className="flex flex-col gap-2 absolute top-4 right-6 md:right-8 items-end">
          {talent.tags.map((tag) => (
            <span
              key={tag}
              className="px-4 py-1 bg-primary-100 text-primary font-semibold text-sm rounded-full w-min"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Profile Info */}
        <div className="mt-20 md:mt-24 w-full">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-xl md:text-2xl font-medium text-dark">
              {talent.name}
            </h1>
            {talent.verified && (
              <MdVerified className="text-primary text-xl md:text-2xl" />
            )}
          </div>

          <p className="text-gray2 font-medium mb-1">{talent.role}</p>
          <p className="text-gray2 font-medium mb-4">@ {talent.organization}</p>

          {/* Location and Education Info */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 mb-8 text-gray-700 font-medium">
            <div className="flex items-center gap-2">
              <FaGraduationCap className="text-xl text-gray-400" />
              <span>{talent.university}</span>
            </div>
            <div className="flex items-center gap-2">
              <IoLocationOutline className="text-xl text-gray-400" />
              <span>{talent.location}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-row flex-wrap items-center gap-4 mb-8">
            <Button
              color="primary"
              variant="solid"
              className="font-bold px-8 shadow-md"
              radius="sm"
              size="md"
              startContent={<FaVideo className="text-lg" />}
            >
              {t("requestMeeting")}
            </Button>
            <Button
              color="primary"
              variant="bordered"
              className="font-bold px-8 border-2"
              radius="sm"
              size="md"
              startContent={<IoPersonOutline className="text-lg" />}
            >
              {t("contact")}
            </Button>
          </div>

          <Divider className="my-6" />

          {/* About Section */}
          <div>
            <h2 className="text-lg md:text-xl font-medium text-dark mb-4">
              {t("about")}
            </h2>
            <p className="text-gray2 leading-relaxed font-medium">
              {talent.about}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
