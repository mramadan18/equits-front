"use client";

import { useCallback, useMemo } from "react";
import { useTranslations } from "next-intl";
import { useUpdateOverview } from "@/hooks/api/useProfile";
import { UserType } from "@/types/api";
import {
  getUpdateOverviewSchema,
  UpdateOverviewFormData,
} from "@/validations/profile.validation";
import { useSettingsForm } from "@/hooks/ui/useSettingsForm";

export const useOverviewController = () => {
  const t = useTranslations("Settings");
  const validationT = useTranslations("Auth.Validation");
  const updateMutation = useUpdateOverview();

  const schema = useMemo(
    () => getUpdateOverviewSchema(validationT),
    [validationT],
  );

  const userToForm = useCallback(
    (user: any) => ({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      userType: user?.userType as UserType,
      overview: user?.overview || "",
      videoLink: user?.videoLink || "",
    }),
    [],
  );

  const settingsForm = useSettingsForm<UpdateOverviewFormData>({
    schema,
    mutation: updateMutation,
    successMessage: t("overviewForm.saveSuccess"),
    userToForm,
  });

  return {
    t,
    ...settingsForm,
  };
};
