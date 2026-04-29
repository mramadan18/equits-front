"use client";

import { Button } from "@heroui/button";
import { useTranslations } from "next-intl";

interface EmptyDraftsProps {
  isCreating: boolean;
  onStartNew: () => void;
}

export const EmptyDrafts = ({ isCreating, onStartNew }: EmptyDraftsProps) => {
  const t = useTranslations("Drafts.noDrafts");

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center col-span-full">
      <div className="mb-4 rounded-full bg-default-100 p-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-default-400"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="12" y1="18" x2="12" y2="12" />
          <line x1="9" y1="15" x2="15" y2="15" />
        </svg>
      </div>
      <h3 className="mb-2 text-xl font-semibold">{t("title")}</h3>
      <p className="mb-6 max-w-sm text-default-500">{t("description")}</p>
      <Button
        color="primary"
        className="font-semibold"
        radius="full"
        isLoading={isCreating}
        onPress={onStartNew}
      >
        {t("action")}
      </Button>
    </div>
  );
};
