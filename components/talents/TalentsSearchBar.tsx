"use client";

import { useTranslations } from "next-intl";
import { BaseSearchBar } from "@/components/ui/BaseSearchBar";

export const TalentsSearchBar = () => {
  const t = useTranslations("TalentsExplore");

  return (
    <BaseSearchBar
      placeholder={t("searchPlaceholder")}
      addLabel={t("addYours")}
      buttonBgClass="bg-primary-100"
    />
  );
};
