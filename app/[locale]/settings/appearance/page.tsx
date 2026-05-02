"use client";

import { useTranslations } from "next-intl";

export default function AppearanceSettingsPage() {
  const t = useTranslations("Settings");

  return (
    <div className="flex flex-col gap-12">
      <h2 className="text-3xl font-semibold text-dark">
        {t("account.appearance")}
      </h2>
      <p className="text-gray2">
        Settings content for Appearance will go here.
      </p>
    </div>
  );
}
