"use client";
import { useTranslations } from "next-intl";
import { MdVerified } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import { Button, Divider, Avatar } from "@heroui/react";
import Link from "next/link";
import { MainRoutes } from "@/types";
import { Skeleton } from "@heroui/skeleton";
import { User } from "@/types/api";

export const PeopleYouMayNeedSidebar = ({
  talents,
  isLoading,
}: {
  talents: User[];
  isLoading?: boolean;
}) => {
  const t = useTranslations("TalentDetails");

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-md flex flex-col h-max overflow-hidden sticky top-24">
        <div className="p-6 pb-4">
          <Skeleton className="h-7 w-2/3 rounded-lg" />
        </div>
        <div className="flex flex-col">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col px-6 py-4">
              <div className="flex items-start gap-4 mb-3">
                <Skeleton className="w-14 h-14 md:w-16 md:h-16 rounded-full flex-shrink-0" />
                <div className="flex-1 flex flex-col justify-center gap-2">
                  <Skeleton className="h-5 w-3/4 rounded-lg" />
                  <Skeleton className="h-4 w-1/2 rounded-lg" />
                </div>
              </div>
              <div className="flex flex-col gap-2 mb-4">
                <Skeleton className="h-3 w-full rounded-lg" />
                <Skeleton className="h-3 w-5/6 rounded-lg" />
              </div>
              <Skeleton className="h-10 w-full rounded-lg" />
              {i < 3 && <Divider className="mt-6" />}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md flex flex-col h-max overflow-hidden sticky top-24">
      {/* Header */}
      <div className="p-6 pb-4">
        <h2 className="text-lg md:text-xl font-semibold text-dark">
          {t("peopleYouMayNeed")}
        </h2>
      </div>

      {/* List */}
      <div className="flex flex-col">
        {talents?.map((talent, index) => (
          <div
            key={talent?.id}
            className="flex flex-col px-6 py-4 hover:bg-gray-50 transition-colors"
          >
            {/* Person Header Info */}
            <div className="flex items-start gap-4 mb-3">
              <div className="w-14 h-14 md:w-16 md:h-16">
                <Avatar
                  src={`${talent.avatar}`}
                  alt={`${talent.firstName} ${talent.lastName}`}
                  color="primary"
                  showFallback
                  className="w-full h-full"
                />
              </div>

              <div className="flex-1 flex flex-col justify-center">
                <div className="flex items-center gap-1 mb-0.5">
                  <h3 className="font-medium text-dark text-lg whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px]">
                    {talent?.firstName} {talent?.lastName}
                  </h3>
                  {talent?.isTrusted ? (
                    <MdVerified className="text-primary text-xl flex-shrink-0" />
                  ) : (
                    <MdVerified className="text-gray-400 text-xl flex-shrink-0" />
                  )}
                </div>
                <div className="text-sm font-medium text-gray-700 leading-tight">
                  {talent?.experienceLevel && (
                    <span className="me-1">{talent?.experienceLevel}</span>
                  )}{" "}
                  {talent?.jobTitle}
                </div>
                {/* <div className="text-sm text-gray-500 font-medium">
                @ {talent.company}
              </div> */}
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray2 font-medium line-clamp-3 leading-relaxed mb-4">
              {talent?.overview}
            </p>

            {/* Action Button */}
            <Button
              as={Link}
              href={`${MainRoutes.TALENTS}/${talent?.id}`}
              variant="bordered"
              color="primary"
              fullWidth
              className="font-medium border-2"
              radius="sm"
              size="md"
              startContent={<TbListDetails className="text-lg" />}
            >
              {t("moreDetails")}
            </Button>

            {/* Divider if not the last item */}
            {index < talents?.length - 1 && <Divider className="mt-6" />}
          </div>
        ))}
      </div>

      {/* Footer Show All Button */}
      <div className="p-6 pt-2 pb-6 w-full flex justify-center">
        <Button
          as={Link}
          href={MainRoutes.TALENTS}
          variant="light"
          radius="sm"
          fullWidth
        >
          {t("showAll")}
        </Button>
      </div>
    </div>
  );
};
