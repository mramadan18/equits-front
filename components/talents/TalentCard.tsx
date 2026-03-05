import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { MdVerified } from "react-icons/md";
import { FaVideo } from "react-icons/fa";

import { Talent } from "./types";

interface TalentCardProps {
  talent: Talent;
}

export const TalentCard = ({ talent }: TalentCardProps) => {
  const t = useTranslations("TalentsExplore");

  return (
    <Card className="border-1 border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 rounded-xl overflow-hidden bg-white group flex flex-col pt-0 p-0 h-full">
      {/* Cover Image */}
      <div className="relative h-32 md:h-36 w-full overflow-hidden flex-shrink-0">
        <Image
          src={talent.coverImage}
          alt={`${talent.name} cover`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <CardBody className="p-5 pt-0 relative flex flex-col flex-grow text-start overflow-visible h-full">
        {/* Avatar */}
        <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white overflow-hidden -mt-10 md:-mt-12 mb-3 z-10 shadow-sm bg-gray-100 flex-shrink-0 left-0">
          <Image
            src={talent.avatar}
            alt={talent.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col flex-grow">
          <div className="flex items-center gap-1 mb-1 relative z-20">
            <h3 className="font-medium text-dark text-lg">{talent.name}</h3>
            {talent.verified && <MdVerified className="text-primary text-xl" />}
          </div>

          <p className="text-sm text-gray2 mb-1">{talent.role}</p>
          <p className="text-xs text-gray-500 mb-4 font-medium">
            @ {talent.organization}
          </p>

          <p className="text-xs text-gray2 mb-6 line-clamp-4 leading-relaxed flex-grow font-medium">
            {talent.description}
          </p>
        </div>

        {/* Action Button */}
        <div className="mt-auto pt-2">
          <Button
            color="primary"
            variant="solid"
            fullWidth
            className="font-bold shadow-md"
            radius="sm"
            size="md"
            startContent={<FaVideo className="text-lg" />}
          >
            {t("requestMeeting")}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};
