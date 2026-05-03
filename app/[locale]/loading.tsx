"use client";

import { Spinner } from "@heroui/spinner";
import { useTranslations } from "next-intl";

export default function Loading() {
  const t = useTranslations("Common");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <Spinner size="lg" color="primary" labelColor="primary" />
        <p className="text-primary font-medium animate-pulse">
          {t("loading") || "Loading..."}
        </p>
      </div>
    </div>
  );
}
