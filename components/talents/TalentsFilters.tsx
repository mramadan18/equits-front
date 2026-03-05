import { useTranslations } from "next-intl";
import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { IoFilterOutline, IoChevronDown } from "react-icons/io5";

import { FilterDropdown } from "@/components/shared/FilterDropdown";

export const TalentsFilters = () => {
  const t = useTranslations("TalentsExplore");

  return (
    <div className="flex items-center w-full gap-2 md:gap-4 mb-6 md:mb-10 relative">
      <div className="flex-shrink-0 flex items-center pe-2 md:pe-4 border-e-2 border-gray-200">
        <Button
          variant="light"
          radius="full"
          className="font-bold text-dark2 min-w-max h-10 md:h-11 px-2 md:px-4 hover:bg-gray-100 transition-colors"
          startContent={<IoFilterOutline className="text-xl text-dark2" />}
        >
          <span className="hidden sm:inline-block">{t("allFilters")}</span>
        </Button>
      </div>

      <div className="flex flex-1 items-center gap-2 md:gap-3 overflow-x-auto pb-2 -mb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <Dropdown>
          <DropdownTrigger>
            <Button
              color="primary"
              radius="full"
              className="font-semibold shadow-md px-5 md:px-6 h-10 md:h-11 flex-shrink-0 text-sm md:text-base"
              endContent={
                <IoChevronDown className="text-white text-base md:text-lg" />
              }
            >
              {t("talents")}
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Talents Filter">
            <DropdownItem key="all">All Talents</DropdownItem>
            <DropdownItem key="new">New Talents</DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <div className="flex-shrink-0">
          <FilterDropdown label={t("jobTitle")} />
        </div>
        <div className="flex-shrink-0">
          <FilterDropdown label={t("skills")} />
        </div>
        <div className="flex-shrink-0">
          <FilterDropdown label={t("experienceLevel")} />
        </div>
        <div className="flex-shrink-0">
          <FilterDropdown label={t("timeAvailability")} />
        </div>
        <div className="flex-shrink-0">
          <FilterDropdown label={t("location")} />
        </div>
      </div>
    </div>
  );
};
