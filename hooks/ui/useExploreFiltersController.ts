"use client";

import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useIndustries } from "@/hooks/api/useLookup";

export const useExploreFiltersController = () => {
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

  return {
    t,
    currentStage,
    currentIndustry,
    stageItems,
    industryItems,
    updateParam,
  };
};
