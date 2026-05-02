"use client";

import { useTranslations } from "next-intl";

export default function LanguageSettingsPage() {
  const t = useTranslations("Settings");

  return (
    <div className="flex flex-col gap-12">
      <h2 className="text-3xl font-semibold text-dark">
        {t("account.language")}
      </h2>
      <p className="text-gray2">Settings content for Language will go here.</p>
    </div>
  );
}
