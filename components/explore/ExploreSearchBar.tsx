"use client";

import { useTranslations } from "next-intl";
import { BaseSearchBar } from "@/components/shared/BaseSearchBar";

export const ExploreSearchBar = () => {
  const t = useTranslations("Explore");

  return (
    <BaseSearchBar
      placeholder={t("searchPlaceholder")}
      addLabel={t("addYours")}
    />
  );
};
