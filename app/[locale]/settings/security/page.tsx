"use client";

import { useTranslations } from "next-intl";

export default function SecuritySettingsPage() {
  const t = useTranslations("Settings");

  return (
    <div className="flex flex-col gap-12">
      <h2 className="text-3xl font-semibold text-dark">
        {t("account.security")}
      </h2>
      <p className="text-gray2">Settings content for Security will go here.</p>
    </div>
  );
}
