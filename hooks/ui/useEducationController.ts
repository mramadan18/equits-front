"use client";

import { useTranslations } from "next-intl";
import { useUniversities, useFaculties } from "@/hooks/api/useLookup";
import { useUpdateEducation } from "@/hooks/api/useProfile";
import {
  getUpdateEducationSchema,
  UpdateEducationFormData,
} from "@/validations/profile.validation";
import { useSettingsForm } from "@/hooks/ui/useSettingsForm";
import { useFieldArray } from "react-hook-form";

export const useEducationController = () => {
  const t = useTranslations("Settings");
  const validationT = useTranslations("Auth.Validation");
  const updateMutation = useUpdateEducation();

  const { data: universitiesRes } = useUniversities();
  const universities = universitiesRes?.data || [];
  const { data: facultiesRes } = useFaculties();
  const faculties = facultiesRes?.data || [];

  const settingsForm = useSettingsForm<UpdateEducationFormData>({
    schema: getUpdateEducationSchema(validationT),
    mutation: updateMutation,
    successMessage: t("overviewForm.saveSuccess"),
    userToForm: (user) => ({
      certificates: user?.educationCertificates?.map((cert: any) => ({
        university: cert.university,
        degree: cert.degree,
        faculty: cert.faculty,
        programLink: cert.programLink || "",
        startDate: cert.startDate ? cert.startDate.split("-")[0] : "",
        endDate: cert.endDate ? cert.endDate.split("-")[0] : "",
        present: cert.present,
      })) || [
        {
          university: "",
          degree: undefined as any,
          faculty: "",
          programLink: "",
          startDate: "",
          endDate: "",
          present: false,
        },
      ],
    }),
    prepareData: (data) => ({
      certificates: data.certificates.map((cert) => ({
        ...cert,
        endDate: cert.present ? null : cert.endDate,
      })),
    }),
  });

  const { fields, append, remove } = useFieldArray({
    control: settingsForm.control,
    name: "certificates",
  });

  const handleAddMore = () => {
    append({
      university: "",
      degree: undefined as any,
      faculty: "",
      programLink: "",
      startDate: "",
      endDate: "",
      present: false,
    });
  };

  return {
    t,
    universities,
    faculties,
    fields,
    append,
    remove,
    handleAddMore,
    ...settingsForm,
  };
};
