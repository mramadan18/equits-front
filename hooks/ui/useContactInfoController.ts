"use client";

import { useCallback, useMemo } from "react";
import { useTranslations } from "next-intl";
import { useUpdateContact } from "@/hooks/api/useProfile";
import {
  getUpdateContactSchema,
  UpdateContactFormData,
} from "@/validations/profile.validation";
import { useSettingsForm } from "@/hooks/ui/useSettingsForm";

export const useContactInfoController = () => {
  const t = useTranslations("Settings");
  const validationT = useTranslations("Auth.Validation");
  const updateMutation = useUpdateContact();

  const schema = useMemo(
    () => getUpdateContactSchema(validationT),
    [validationT],
  );

  const userToForm = useCallback(
    (user: any) => ({
      contactEmail: user?.contactEmail || "",
      phone: user?.phone || "",
      address: user?.address || "",
      facebookUrl: user?.facebookUrl || "",
      linkedinUrl: user?.linkedinUrl || "",
      instagramUrl: user?.instagramUrl || "",
      youtubeUrl: user?.youtubeUrl || "",
    }),
    [],
  );

  const settingsForm = useSettingsForm<UpdateContactFormData>({
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
