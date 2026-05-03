"use client";

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

  const settingsForm = useSettingsForm<UpdateOverviewFormData>({
    schema: getUpdateOverviewSchema(validationT),
    mutation: updateMutation,
    successMessage: t("overviewForm.saveSuccess"),
    userToForm: (user) => ({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      userType: user?.userType as UserType,
      overview: user?.overview || "",
      videoLink: user?.videoLink || "",
    }),
  });

  return {
    t,
    ...settingsForm,
  };
};
