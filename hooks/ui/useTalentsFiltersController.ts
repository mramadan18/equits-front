"use client";

import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  useFaculties,
  useUniversities,
  useCities,
} from "@/hooks/api/useLookup";
import { ExperienceLevel, UserType } from "@/types/api";

export const useTalentsFiltersController = () => {
  const t = useTranslations("TalentsExplore");
  const st = useTranslations("Settings");
  const pt = useTranslations("Pitch");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { data: universitiesData } = useUniversities();
  const { data: facultiesData } = useFaculties();
  const { data: citiesData } = useCities(1); // Assuming 1 is Egypt

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

  const bulkUpdateParams = (newParams: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, value]) => {
      if (value && value !== "all" && value !== "false") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const userType = searchParams.get("userType") || UserType.TALENT;
  const experienceLevel = searchParams.get("experienceLevel") || "all";
  const cityId = searchParams.get("cityId") || "all";
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

  const cityItems = [
    { key: "all", label: t("location") },
    ...(citiesData?.data.map((city) => ({
      key: String(city.id),
      label: city.name,
    })) || []),
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

  const clearFilters = () => {
    router.push(pathname);
  };

  return {
    t,
    st,
    pt,
    userType,
    experienceLevel,
    cityId,
    universityId,
    facultyId,
    userTypeItems,
    experienceLevelItems,
    cityItems,
    universityItems,
    facultyItems,
    updateParam,
    bulkUpdateParams,
    clearFilters,
  };
};
