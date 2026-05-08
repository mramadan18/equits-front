"use client";

import { Button } from "@heroui/react";
import { useTranslations } from "next-intl";

interface SettingsFormActionsProps {
  isPending: boolean;
  isDirty: boolean;
  onCancel: () => void;
  saveLabel?: string;
  cancelLabel?: string;
}

export const SettingsFormActions = ({
  isPending,
  isDirty,
  onCancel,
  saveLabel,
  cancelLabel,
}: SettingsFormActionsProps) => {
  const t = useTranslations("Settings");

  return (
    <div className="flex justify-end gap-6 mt-12">
      <Button variant="bordered" onPress={onCancel}>
        {cancelLabel || t("overviewForm.cancel")}
      </Button>
      <Button
        color="primary"
        type="submit"
        isLoading={isPending}
        isDisabled={isPending || !isDirty}
      >
        {saveLabel || t("overviewForm.save")}
      </Button>
    </div>
  );
};
