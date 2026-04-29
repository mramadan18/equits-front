"use client";

import { useTranslations } from "next-intl";

export const DraftHeader = () => {
  const t = useTranslations("Drafts");

  return (
    <div className="mx-auto mb-10 text-center">
      <h1 className="mt-3 text-3xl font-semibold text-primary">{t("title")}</h1>
      <p className="mt-4 text-sm text-gray2">{t("subtitle")}</p>
    </div>
  );
};
