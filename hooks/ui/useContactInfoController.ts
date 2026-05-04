"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { useUpdateContact } from "@/hooks/api/useProfile";
import {
  getUpdateContactSchema,
  UpdateContactFormData,
} from "@/validations/profile.validation";
import { useSettingsForm } from "@/hooks/ui/useSettingsForm";
import { useCountries, useCities } from "@/hooks/api/useLookup";
import { useWatch } from "react-hook-form";

export const useContactInfoController = () => {
  const t = useTranslations("Settings");
  const validationT = useTranslations("Auth.Validation");
  const updateMutation = useUpdateContact();

  const schema = useMemo(
    () => getUpdateContactSchema(validationT),
    [validationT],
  );

  const { data: countriesRes } = useCountries();
  const countries = countriesRes?.data || [];

  const settingsForm = useSettingsForm<UpdateContactFormData>({
    schema,
    mutation: updateMutation,
    successMessage: t("overviewForm.saveSuccess"),
    userToForm: (user: any) => ({
      contactEmail: user?.contactEmail || "",
      phone: user?.phone || "",
      countryId: user?.countryId || null,
      cityId: user?.cityId || null,
      facebookUrl: user?.facebookUrl || "",
      linkedinUrl: user?.linkedinUrl || "",
      instagramUrl: user?.instagramUrl || "",
      youtubeUrl: user?.youtubeUrl || "",
    }),
  });

  const countryId = useWatch({
    control: settingsForm.control,
    name: "countryId",
  });

  const { data: citiesRes } = useCities(countryId || undefined);
  const cities = citiesRes?.data || [];

  return {
    t,
    countries,
    cities,
    ...settingsForm,
  };
};
