"use client";

import { useTranslations } from "next-intl";
import { Button } from "@heroui/button";
import { IoFilterOutline } from "react-icons/io5";
import { FilterDropdown } from "@/components/shared/FilterDropdown";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { ExperienceLevel, UserType, ServiceArea } from "@/types/api";
import { useFaculties, useUniversities } from "@/hooks/api/useLookup";

export const TalentsFilters = () => {
  const t = useTranslations("TalentsExplore");
  const st = useTranslations("Settings");
  const pt = useTranslations("Pitch");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { data: universitiesData } = useUniversities();
  const { data: facultiesData } = useFaculties();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === "all") {
        params.delete(name);
      } else {
        params.set(name, value);
      }
      return params.toString();
    },
    [searchParams],
  );

  const handleFilterChange = (name: string, value: string) => {
    router.push(pathname + "?" + createQueryString(name, value));
  };

  const userType = searchParams.get("userType") || UserType.TALENT;
  const experienceLevel = searchParams.get("experienceLevel") || "all";
  const location = searchParams.get("location") || "all";
  const universityId = searchParams.get("universityId") || "all";
  const facultyId = searchParams.get("facultyId") || "all";

  const userTypeItems = [
    { key: UserType.TALENT, label: st("overviewForm.talent") },
    { key: UserType.INVESTOR, label: st("overviewForm.investor") },
  ];

  const experienceLevelItems = [
    { key: "all", label: t("experienceLevel") },
    ...Object.values(ExperienceLevel).map((level) => ({
      key: level,
      label: st(`jobTitleForm.levels.${level}`),
    })),
  ];

  const serviceAreaItems = [
    { key: "all", label: t("location") },
    ...Object.values(ServiceArea).map((area) => ({
      key: area,
      label: pt(`Enums.ServiceArea.${area}`),
    })),
  ];

  const universityItems = [
    { key: "all", label: pt("Basics.university") },
    ...(universitiesData?.data.map((u) => ({
      key: String(u.id),
      label: u.name,
    })) || []),
  ];

  const facultyItems = [
    { key: "all", label: pt("Basics.faculty") },
    ...(facultiesData?.data.map((f) => ({
      key: String(f.id),
      label: f.name,
    })) || []),
  ];

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
        <div className="flex-shrink-0">
          <FilterDropdown
            label={st("overviewForm.userType")}
            items={userTypeItems}
            selectedKey={userType}
            onSelectionChange={(key) => handleFilterChange("userType", key)}
          />
        </div>
        <div className="flex-shrink-0">
          <FilterDropdown
            label={t("experienceLevel")}
            items={experienceLevelItems}
            selectedKey={experienceLevel}
            onSelectionChange={(key) =>
              handleFilterChange("experienceLevel", key)
            }
          />
        </div>
        <div className="flex-shrink-0">
          <FilterDropdown
            label={t("location")}
            items={serviceAreaItems}
            selectedKey={location}
            onSelectionChange={(key) => handleFilterChange("location", key)}
          />
        </div>
        <div className="flex-shrink-0">
          <FilterDropdown
            label={pt("Basics.university")}
            items={universityItems}
            selectedKey={universityId}
            onSelectionChange={(key) => handleFilterChange("universityId", key)}
            disableInput={false}
          />
        </div>
        <div className="flex-shrink-0">
          <FilterDropdown
            label={pt("Basics.faculty")}
            items={facultyItems}
            selectedKey={facultyId}
            onSelectionChange={(key) => handleFilterChange("facultyId", key)}
            disableInput={false}
          />
        </div>
      </div>
    </div>
  );
};
