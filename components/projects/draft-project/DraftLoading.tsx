"use client";

import { Spinner } from "@heroui/spinner";
import { useTranslations } from "next-intl";

export const DraftLoading = () => {
  const t = useTranslations("Drafts");

  return (
    <div className="col-span-full flex flex-col items-center justify-center py-12">
      <Spinner size="lg" color="primary" />
      <p className="mt-4 text-default-500">{t("loading")}</p>
    </div>
  );
};
