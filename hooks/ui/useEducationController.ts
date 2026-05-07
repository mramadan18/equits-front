"use client";

import { useCallback, useMemo } from "react";
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

  const schema = useMemo(
    () => getUpdateEducationSchema(validationT),
    [validationT],
  );

  const userToForm = useCallback(
    (user: any) => ({
      certificates: user?.educationCertificates?.map((cert: any) => ({
        university: cert.university || "",
        universityId: cert.universityId || null,
        degree: cert.degree,
        faculty: cert.faculty || "",
        facultyId: cert.facultyId || null,
        programLink: cert.programLink || "",
        startDate: cert.startDate ? cert.startDate.split("-")[0] : "",
        endDate: cert.endDate ? cert.endDate.split("-")[0] : "",
        present: cert.present,
      })) || [
        {
          university: "",
          universityId: null,
          degree: undefined as any,
          faculty: "",
          facultyId: null,
          programLink: "",
          startDate: "",
          endDate: "",
          present: false,
        },
      ],
    }),
    [],
  );

  const prepareData = useCallback(
    (data: UpdateEducationFormData) => ({
      certificates: data.certificates.map((cert) => ({
        ...cert,
        startDate: cert.startDate?.toString(),
        endDate: cert.present ? null : cert.endDate?.toString(),
      })),
    }),
    [],
  );

  const settingsForm = useSettingsForm<UpdateEducationFormData>({
    schema,
    mutation: updateMutation,
    successMessage: t("overviewForm.saveSuccess"),
    userToForm,
    prepareData,
  });

  const { fields, append, remove } = useFieldArray({
    control: settingsForm.control,
    name: "certificates",
  });

  const handleAddMore = () => {
    append({
      university: "",
      universityId: null,
      degree: undefined as any,
      faculty: "",
      facultyId: null,
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
