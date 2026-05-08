"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { Badge } from "@heroui/badge";
import { IoFilterOutline } from "react-icons/io5";
import { FilterDropdown } from "@/components/ui";
import { useTalentsFiltersController } from "@/hooks/ui/useTalentsFiltersController";
import { TalentsFiltersDrawer } from "./TalentsFiltersDrawer";

export const TalentsFilters = () => {
  const {
    t,
    userType,
    experienceLevel,
    cityId,
    universityId,
    facultyId,
    userTypeItems,
    experienceLevelItems,
    universityItems,
    facultyItems,
    updateParam,
  } = useTalentsFiltersController();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const activeFiltersCount = [
    experienceLevel !== "all"
      ? experienceLevel.split(",").filter(Boolean).length
      : 0,
    cityId !== "all" ? cityId.split(",").filter(Boolean).length : 0,
    universityId !== "all" ? universityId.split(",").filter(Boolean).length : 0,
    facultyId !== "all" ? facultyId.split(",").filter(Boolean).length : 0,
  ].reduce((acc, val) => acc + val, 0);

  return (
    <div className="flex flex-col w-full mb-8 md:mb-10 gap-4">
      {/* Mobile Actions Row */}
      <div className="flex md:hidden items-center justify-between w-full px-1">
        <Badge
          content={activeFiltersCount}
          color="primary"
          isInvisible={activeFiltersCount === 0}
          shape="circle"
          size="sm"
          classNames={{
            badge: "min-w-5 h-5",
          }}
        >
          <Button
            variant="bordered"
            radius="full"
            className="font-bold text-black gap-2 h-10 px-4 border-gray-300"
            startContent={<IoFilterOutline className="text-xl" />}
            onPress={() => setIsDrawerOpen(true)}
          >
            {t("allFilters")}
          </Button>
        </Badge>
      </div>

      <div className="flex items-center w-full gap-4 overflow-hidden">
        {/* Filters Scrollable Area */}
        <div className="flex flex-1 items-center gap-3 overflow-x-auto no-scrollbar py-1">
          <FilterDropdown
            label={t("userType") || "User Type"}
            items={userTypeItems}
            selectedKey={userType}
            onSelectionChange={(key) => updateParam("userType", key)}
          />

          <FilterDropdown
            label={t("experienceLevel")}
            items={experienceLevelItems}
            selectedKey={experienceLevel}
            selectionMode="multiple"
            onSelectionChange={(key) => updateParam("experienceLevel", key)}
          />

          <FilterDropdown
            label={t("university") || "University"}
            items={universityItems}
            selectedKey={universityId}
            selectionMode="multiple"
            onSelectionChange={(key) => updateParam("universityId", key)}
            disableInput={false}
          />

          <FilterDropdown
            label={t("faculty") || "Faculty"}
            items={facultyItems}
            selectedKey={facultyId}
            selectionMode="multiple"
            onSelectionChange={(key) => updateParam("facultyId", key)}
            disableInput={false}
          />
        </div>

        {/* All Filters Button - Desktop */}
        <div className="shrink-0 hidden md:block">
          <Badge
            content={activeFiltersCount}
            color="primary"
            isInvisible={activeFiltersCount === 0}
            shape="circle"
          >
            <Button
              variant="light"
              radius="full"
              className="font-bold text-black gap-2 h-10 px-4 hover:bg-gray-50"
              startContent={<IoFilterOutline className="text-2xl" />}
              onPress={() => setIsDrawerOpen(true)}
            >
              {t("allFilters")}
            </Button>
          </Badge>
        </div>
      </div>

      <TalentsFiltersDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};
