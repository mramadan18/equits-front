"use client";

import { useTranslations } from "next-intl";
import { Button } from "@heroui/button";
import { IoFilterOutline } from "react-icons/io5";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useIndustries } from "@/hooks/api/useLookup";
import { FilterDropdown } from "@/components/shared/FilterDropdown";

export const ExploreFilters = () => {
  const t = useTranslations("Explore");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { data: industriesData } = useIndustries();
  const industries = industriesData?.data || [];

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set("page", "1"); // Reset to page 1 on filter change
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const currentStage = searchParams.get("stage") || "all";
  const currentIndustry = searchParams.get("industryId") || "all";

  const stageItems = [
    { key: "all", label: t("allStages") },
    { key: "IDEA", label: t("stageIdea") },
    { key: "VALIDATION", label: t("stageValidation") },
    { key: "PROTOTYPE", label: t("stagePrototype") },
    { key: "MVP", label: t("stageMvp") },
    { key: "BUSINESS", label: t("stageBusiness") },
  ];

  const industryItems = [
    { key: "all", label: t("allIndustries") },
    ...industries.map((ind) => ({
      key: ind.id.toString(),
      label: ind.name,
    })),
  ];

  return (
    <div className="flex items-center w-full gap-2 md:gap-4 mb-6 md:mb-10 relative">
      {/* Sticky Filter Button */}
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

      {/* Horizontally Scrollable Filters */}
      <div className="flex flex-1 items-center gap-2 md:gap-3 overflow-x-auto pb-2 -mb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <FilterDropdown
          label={t("stage")}
          items={stageItems}
          selectedKey={currentStage}
          onSelectionChange={(key) => updateParam("stage", key)}
          color={currentStage !== "all" ? "primary" : "default"}
          variant={currentStage !== "all" ? "solid" : "bordered"}
        />

        <FilterDropdown
          label={t("industry")}
          items={industryItems}
          selectedKey={currentIndustry}
          onSelectionChange={(key) => updateParam("industryId", key)}
          color={currentIndustry !== "all" ? "primary" : "default"}
          variant={currentIndustry !== "all" ? "solid" : "bordered"}
        />
      </div>
    </div>
  );
};
