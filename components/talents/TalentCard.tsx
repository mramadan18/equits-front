"use client";
import { Card, CardBody, Avatar } from "@heroui/react";
import { Button } from "@heroui/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { MdVerified } from "react-icons/md";
import { FaVideo } from "react-icons/fa";
import Link from "next/link";
import { MainRoutes } from "@/types";
import { User } from "@/types/api";
import { useDisclosure } from "@heroui/react";
import { RequestMeetingModal } from "../talent-details/RequestMeetingModal";

export const TalentCard = ({ item }: { item: User }) => {
  const t = useTranslations("TalentsExplore");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <Card className="border-1 border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 rounded-xl overflow-hidden bg-white group flex flex-col pt-0 p-0 h-full">
      {/* Cover Image */}
      <Link
        className="relative h-32 md:h-36 w-full overflow-hidden flex-shrink-0 bg-gray-100"
        href={`${MainRoutes.TALENTS}/${item.id}`}
      >
        {item?.cover ? (
          <Image
            src={item.cover}
            alt={`${item.firstName} ${item.lastName}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 opacity-50" />
        )}
      </Link>

      <CardBody className="p-5 pt-0 relative flex flex-col flex-grow text-start overflow-visible h-full">
        {/* Avatar */}
        <Link
          className="relative w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white overflow-hidden -mt-10 md:-mt-12 mb-3 z-10 shadow-sm bg-gray-100 flex-shrink-0 left-0"
          href={`${MainRoutes.TALENTS}/${item.id}`}
        >
          <Avatar
            src={`${item?.avatar}`}
            alt={`${item.firstName} ${item.lastName}`}
            showFallback
            classNames={{
              base: "w-full h-full",
              img: "object-cover",
            }}
          />
        </Link>

        {/* Info */}
        <div className="flex flex-col flex-grow">
          <div className="flex items-center gap-1 mb-1 relative z-20">
            <Link
              className="font-medium text-dark text-lg truncate max-w-[85%] hover:underline"
              href={`${MainRoutes.TALENTS}/${item.id}`}
            >
              {item.firstName} {item.lastName}
            </Link>
            {item.isTrusted ? (
              <MdVerified className="text-primary text-xl" />
            ) : (
              <MdVerified className="text-gray-400 text-xl flex-shrink-0" />
            )}
          </div>

          <p className="text-sm text-gray2 mb-1 line-clamp-1">
            {item.jobTitle}
          </p>
          <p className="text-xs text-gray-500 mb-4 font-medium line-clamp-1">
            {item.company ? `@ ${item.company}` : ""}
          </p>

          <p className="text-xs text-gray2 mb-6 line-clamp-4 leading-relaxed flex-grow font-medium">
            {item.overview}
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
            onPress={onOpen}
          >
            {t("requestMeeting")}
          </Button>
        </div>
      </CardBody>
      <RequestMeetingModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        talent={item}
      />
    </Card>
  );
};
