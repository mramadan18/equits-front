"use client";

import { useTranslations } from "next-intl";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";
import { useAuthStore } from "@/stores/useAuthStore";
import { useUpdateJobTitle } from "@/hooks/api/useProfile";
import { addToast } from "@heroui/toast";
import { ExperienceLevel } from "@/types/api";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  getUpdateJobTitleSchema,
  UpdateJobTitleFormData,
} from "@/validations/profile.validation";
import { useEffect } from "react";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { useUniversities } from "@/hooks/api/useLookup";

export default function JobTitleSettingsPage() {
  const t = useTranslations("Settings");
  const validationT = useTranslations("Auth.Validation");
  const tp = useTranslations("Pitch.Basics");
  const { user, setUser } = useAuthStore();
  const { mutate: updateJobTitle, isPending } = useUpdateJobTitle();

  const { data: universitiesRes } = useUniversities();
  const universities = universitiesRes?.data || [];

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isDirty },
  } = useForm<UpdateJobTitleFormData>({
    mode: "all",
    defaultValues: {
      jobTitle: user?.jobTitle || "",
      experienceLevel: user?.experienceLevel as ExperienceLevel,
      company: user?.company || "",
      companyLink: user?.companyLink || "",
    },
    resolver: zodResolver(getUpdateJobTitleSchema(validationT)),
  });

  const onSubmit = (data: UpdateJobTitleFormData) => {
    updateJobTitle(data, {
      onSuccess: (response) => {
        setUser(response.data);
        addToast({
          title:
            t("overviewForm.saveSuccess") || "Profile updated successfully",
          color: "success",
        });
      },
      onError: () => {
        addToast({
          title: t("overviewForm.saveError") || "Failed to update profile",
          color: "danger",
        });
      },
    });
  };

  const handleCancel = () => {
    if (user) {
      reset({
        jobTitle: user.jobTitle || "",
        experienceLevel: user.experienceLevel as ExperienceLevel,
        company: user.company || "",
        companyLink: user.companyLink || "",
      });
    }
  };

  useEffect(() => {
    if (user) {
      reset({
        jobTitle: user.jobTitle || "",
        experienceLevel: user.experienceLevel as ExperienceLevel,
        company: user.company || "",
        companyLink: user.companyLink || "",
      });
    }
  }, [user, reset]);

  const experienceLevels = Object.values(ExperienceLevel);

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-6">
        <h2 className="text-3xl font-semibold text-dark">
          {t("jobTitleForm.title")}
        </h2>
        <p className="text-gray2">{t("jobTitleForm.description")}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
        <Input
          label={t("jobTitleForm.yourJobTitle")}
          placeholder={t("jobTitleForm.yourJobTitlePlaceholder")}
          labelPlacement="outside"
          variant="bordered"
          radius="sm"
          {...register("jobTitle")}
          isInvalid={!!errors.jobTitle}
          errorMessage={errors.jobTitle?.message}
        />

        <Controller
          name="experienceLevel"
          control={control}
          render={({ field }) => (
            <Select
              label={t("jobTitleForm.experienceLevel")}
              labelPlacement="outside"
              placeholder={tp("selectPlaceholder")}
              variant="bordered"
              radius="sm"
              selectedKeys={field.value ? [field.value] : []}
              onSelectionChange={(keys) => {
                const value = Array.from(keys)[0] as ExperienceLevel;
                field.onChange(value);
              }}
              isInvalid={!!errors.experienceLevel}
              errorMessage={errors.experienceLevel?.message}
            >
              {experienceLevels.map((level) => (
                <SelectItem
                  key={level}
                  textValue={t(`jobTitleForm.levels.${level}`)}
                >
                  {t(`jobTitleForm.levels.${level}`)}
                </SelectItem>
              ))}
            </Select>
          )}
        />

        <Controller
          name="company"
          control={control}
          render={({ field }) => (
            <Autocomplete
              label={t("jobTitleForm.organization")}
              placeholder={t("jobTitleForm.organization")}
              labelPlacement="outside"
              variant="bordered"
              radius="sm"
              allowsCustomValue
              inputValue={field.value}
              onInputChange={(value) => field.onChange(value)}
              onSelectionChange={(key) => {
                if (key) {
                  field.onChange(key as string);
                }
              }}
              isInvalid={!!errors.company}
              errorMessage={errors.company?.message}
            >
              {universities.map((uni) => (
                <AutocompleteItem key={uni.name} textValue={uni.name}>
                  {uni.name}
                </AutocompleteItem>
              ))}
            </Autocomplete>
          )}
        />

        <Input
          label={t("jobTitleForm.organizationLink")}
          placeholder={t("jobTitleForm.organizationLinkPlaceholder")}
          labelPlacement="outside"
          variant="bordered"
          radius="sm"
          {...register("companyLink")}
          isInvalid={!!errors.companyLink}
          errorMessage={errors.companyLink?.message}
        />

        <div className="flex justify-end gap-6 mt-12">
          <Button variant="bordered" onPress={handleCancel}>
            {t("jobTitleForm.cancel")}
          </Button>
          <Button
            color="primary"
            type="submit"
            isLoading={isPending}
            isDisabled={isPending || !isDirty}
          >
            {t("jobTitleForm.save")}
          </Button>
        </div>
      </form>
    </div>
  );
}
