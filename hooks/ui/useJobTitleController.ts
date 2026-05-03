"use client";

import { useTranslations } from "next-intl";
import { useUpdateJobTitle } from "@/hooks/api/useProfile";
import { ExperienceLevel } from "@/types/api";
import {
  getUpdateJobTitleSchema,
  UpdateJobTitleFormData,
} from "@/validations/profile.validation";
import { useUniversities } from "@/hooks/api/useLookup";
import { useSettingsForm } from "@/hooks/ui/useSettingsForm";

export const useJobTitleController = () => {
  const t = useTranslations("Settings");
  const validationT = useTranslations("Auth.Validation");
  const tp = useTranslations("Pitch.Basics");
  const updateMutation = useUpdateJobTitle();

  const { data: universitiesRes } = useUniversities();
  const universities = universitiesRes?.data || [];

  const settingsForm = useSettingsForm<UpdateJobTitleFormData>({
    schema: getUpdateJobTitleSchema(validationT),
    mutation: updateMutation,
    successMessage: t("overviewForm.saveSuccess"),
    userToForm: (user) => ({
      jobTitle: user?.jobTitle || "",
      experienceLevel: user?.experienceLevel as ExperienceLevel,
      company: user?.company || "",
      companyLink: user?.companyLink || "",
    }),
  });

  const experienceLevels = Object.values(ExperienceLevel);

  return {
    t,
    tp,
    universities,
    experienceLevels,
    ...settingsForm,
  };
};
