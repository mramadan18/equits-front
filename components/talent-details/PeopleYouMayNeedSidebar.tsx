import { useTranslations } from "next-intl";
import Image from "next/image";
import { MdVerified } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";

import { MOCK_PEOPLE_YOU_MAY_NEED } from "./mockData";

export const PeopleYouMayNeedSidebar = () => {
  const t = useTranslations("TalentDetails");

  return (
    <div className="w-full lg:w-[320px] xl:w-[380px] bg-white rounded-2xl shadow-sm border border-gray-200 flex flex-col h-max overflow-hidden sticky top-24">
      {/* Header */}
      <div className="p-6 pb-4">
        <h2 className="text-lg md:text-xl font-semibold text-dark">
          {t("peopleYouMayNeed")}
        </h2>
      </div>

      {/* List */}
      <div className="flex flex-col">
        {MOCK_PEOPLE_YOU_MAY_NEED.map((person, index) => (
          <div
            key={person.id}
            className="flex flex-col px-6 py-4 hover:bg-gray-50 transition-colors"
          >
            {/* Person Header Info */}
            <div className="flex items-start gap-4 mb-3">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-gray-200 bg-gray-100 overflow-hidden relative flex-shrink-0 shadow-sm">
                <Image
                  src={person.avatar}
                  alt={person.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 flex flex-col justify-center">
                <div className="flex items-center gap-1 mb-0.5">
                  <h3 className="font-medium text-dark text-lg whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px]">
                    {person.name}
                  </h3>
                  {person.verified && (
                    <MdVerified className="text-primary text-xl flex-shrink-0" />
                  )}
                </div>
                <div className="text-sm font-medium text-gray-700 leading-tight">
                  {person.level && <span className="me-1">{person.level}</span>}
                  {person.role}
                </div>
                <div className="text-sm text-gray-500 font-medium">
                  @ {person.organization}
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray2 font-medium line-clamp-3 leading-relaxed mb-4">
              {person.description}
            </p>

            {/* Action Button */}
            <Button
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
            {index < MOCK_PEOPLE_YOU_MAY_NEED.length - 1 && (
              <Divider className="mt-6" />
            )}
          </div>
        ))}
      </div>

      {/* Footer Show All Button */}
      <div className="p-6 pt-2 pb-6 w-full flex justify-center">
        <Button
          variant="light"
          className="font-bold text-gray-600 hover:text-dark text-lg"
          size="md"
          disableAnimation
        >
          {t("showAll")}
        </Button>
      </div>
    </div>
  );
};
