import { useTranslations } from "next-intl";
import Image from "next/image";
import { FaHeart, FaCommentDots, FaStar } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import Link from "next/link";

import { TalentExperience } from "./types";
import { Stat } from "@/components/shared/creative-idea-card/components/Stat";
import { Button } from "@heroui/button";

interface TalentExperienceCardProps {
  experience: TalentExperience;
}

export const TalentExperienceCard = ({
  experience,
}: TalentExperienceCardProps) => {
  const t = useTranslations("TalentDetails");

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 md:p-6 mb-6 flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow">
      {/* Image */}
      <div className="w-full md:w-56 h-36 md:h-auto rounded-xl overflow-hidden relative flex-shrink-0">
        <Image
          src={experience.image}
          alt={experience.role}
          fill
          className="object-cover"
        />
        {/* Subtle dark overlay for the small avatar button usually placed inside */}
        <div className="absolute bottom-2 right-2 w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
          {/* Typically avatar goes here. If available in data we can show it, but for now just mock */}
          <Image
            src="/images/idea-2.png"
            alt="org"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Info Section */}
      <div className="flex-1 flex flex-col">
        <div className="flex flex-col md:flex-row md:items-center gap-2 mb-3">
          <h3 className="font-medium text-dark text-base md:text-lg">
            {experience.role}
          </h3>
          <span className="text-gray2 font-medium">
            @ {experience.organization}
          </span>
        </div>

        <p className="text-gray2 mb-6 line-clamp-3 leading-relaxed">
          {experience.description}
        </p>

        {/* Stats & Actions Row */}
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm font-semibold">
            <Stat
              icon={<FaHeart className="text-red-500 text-lg" />}
              value={experience.likes}
            />
            <Stat
              icon={<FaCommentDots className="text-green-500 text-xl" />}
              value={experience.comments}
            />
            <Stat
              icon={<FaStar className="text-orange-400 text-lg" />}
              value={experience.rating}
            />
          </div>

          <Button
            as={Link}
            href="#"
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
