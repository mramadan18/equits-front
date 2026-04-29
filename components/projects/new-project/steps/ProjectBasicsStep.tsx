"use client";

import { Input, Textarea } from "@heroui/input";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { Switch } from "@heroui/switch";
import {
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { useTranslations } from "next-intl";
import { useFaculties, useUniversities } from "@/hooks/api/useLookup";
import { Controller, Control } from "react-hook-form";
import { ProjectFormData } from "@/types/project";
import { FileUploader } from "@/components/ui/FileUploader";

interface ProjectBasicsStepProps {
  control: Control<ProjectFormData>;
  isAcademic: boolean;
  setIsAcademic: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ProjectBasicsStep = ({
  control,
  isAcademic,
  setIsAcademic,
}: ProjectBasicsStepProps) => {
  const t = useTranslations("Pitch");
  const { data: universitiesRes } = useUniversities();
  const universities = universitiesRes?.data || [];
  const { data: facultiesRes } = useFaculties();
  const faculties = facultiesRes?.data || [];

  const safeTranslate = (key: string | undefined) => {
    if (!key) return "";
    return key.startsWith("Validation.") ? t(key) : key;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Controller
          name="title"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              label={t("Basics.projectName")}
              placeholder={t("Basics.projectNamePlaceholder")}
              labelPlacement="outside"
              variant="bordered"
              radius="sm"
              value={field.value as string}
              isInvalid={!!fieldState.error}
              errorMessage={safeTranslate(fieldState.error?.message)}
              maxLength={60}
              classNames={{
                description:
                  "absolute bottom-1 right-2 text-tiny text-default-400",
                inputWrapper: "relative",
              }}
              onChange={field.onChange}
              onBlur={field.onBlur}
            />
          )}
        />
        <Controller
          name="tagline"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              label={t("Basics.tagline")}
              placeholder={t("Basics.taglinePlaceholder")}
              labelPlacement="outside"
              variant="bordered"
              radius="sm"
              value={field.value as string}
              isInvalid={!!fieldState.error}
              errorMessage={safeTranslate(fieldState.error?.message)}
              maxLength={160}
              classNames={{
                description:
                  "absolute bottom-1 right-2 text-tiny text-default-400",
                inputWrapper: "relative",
              }}
              onChange={field.onChange}
              onBlur={field.onBlur}
            />
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Controller
          name="logo"
          control={control}
          render={({ field, fieldState }) => (
            <FileUploader
              label={t("Basics.logo")}
              subLabel={t("Basics.logoSubLabel")}
              placeholder={t("Basics.browse")}
              value={field.value as string}
              onChange={field.onChange}
              isInvalid={!!fieldState.error}
              errorMessage={safeTranslate(fieldState.error?.message)}
            />
          )}
        />
        <Controller
          name="cover"
          control={control}
          render={({ field, fieldState }) => (
            <FileUploader
              label={t("Basics.cover")}
              placeholder={t("Basics.browse")}
              value={field.value as string}
              onChange={field.onChange}
              isInvalid={!!fieldState.error}
              errorMessage={safeTranslate(fieldState.error?.message)}
            />
          )}
        />
      </div>

      <div className="flex flex-col gap-4">
        <Controller
          name="elevatorPitch"
          control={control}
          render={({ field, fieldState }) => (
            <Textarea
              label={t("Basics.elevatorPitch")}
              placeholder={t("Basics.elevatorPitchPlaceholder")}
              labelPlacement="outside"
              minRows={4}
              variant="bordered"
              radius="sm"
              value={field.value as string}
              isInvalid={!!fieldState.error}
              errorMessage={safeTranslate(fieldState.error?.message)}
              maxLength={500}
              description={
                <div className="flex justify-end w-full">
                  <span>{(field.value as string)?.length ?? 0}/500</span>
                </div>
              }
              classNames={{
                description: "absolute bottom-4 end-4 text-tiny text-gray2",
                inputWrapper: "relative",
              }}
              onChange={field.onChange}
              onBlur={field.onBlur}
            />
          )}
        />
        <Controller
          name="videoUrl"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              label={`${t("Basics.youtubeVideo")} ${t("Basics.optional")}`}
              placeholder={t("Basics.youtubeVideoPlaceholder")}
              labelPlacement="outside"
              variant="bordered"
              radius="sm"
              value={field.value as string}
              isInvalid={!!fieldState.error}
              errorMessage={safeTranslate(fieldState.error?.message)}
              onChange={field.onChange}
              onBlur={field.onBlur}
            />
          )}
        />
        <Controller
          name="projectUrl"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              label={`${t("Basics.liveLink")} ${t("Basics.optional")}`}
              placeholder={t("Basics.liveLinkPlaceholder")}
              labelPlacement="outside"
              variant="bordered"
              radius="sm"
              value={field.value as string}
              isInvalid={!!fieldState.error}
              errorMessage={safeTranslate(fieldState.error?.message)}
              onChange={field.onChange}
              onBlur={field.onBlur}
            />
          )}
        />
      </div>

      <div className="space-y-4">
        <span className="block text-sm">
          {t("Basics.socialMedia")} {t("Basics.optional")}
        </span>
        <div className="flex items-center gap-4">
          <FaLinkedinIn className="text-blue-600 text-2xl flex-shrink-0" />
          <Controller
            name="linkedinUrl"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                aria-label={t("Basics.linkedinLabel")}
                placeholder={t("Basics.linkedinPlaceholder")}
                className="flex-1"
                variant="bordered"
                radius="sm"
                value={field.value as string}
                isInvalid={!!fieldState.error}
                errorMessage={safeTranslate(fieldState.error?.message)}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />
        </div>
        <div className="flex items-center gap-4">
          <FaFacebookF className="text-blue-600 text-2xl flex-shrink-0" />
          <Controller
            name="facebookUrl"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                aria-label={t("Basics.facebookLabel")}
                placeholder={t("Basics.facebookPlaceholder")}
                className="flex-1"
                variant="bordered"
                radius="sm"
                value={field.value as string}
                isInvalid={!!fieldState.error}
                errorMessage={safeTranslate(fieldState.error?.message)}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />
        </div>
        <div className="flex items-center gap-4">
          <FaInstagram className="text-pink-600 text-2xl flex-shrink-0" />
          <Controller
            name="instagramUrl"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                aria-label={t("Basics.instagramLabel")}
                placeholder={t("Basics.instagramPlaceholder")}
                className="flex-1"
                variant="bordered"
                radius="sm"
                value={field.value as string}
                isInvalid={!!fieldState.error}
                errorMessage={safeTranslate(fieldState.error?.message)}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />
        </div>
        <div className="flex items-center gap-4">
          <FaYoutube className="text-red-600 text-2xl flex-shrink-0" />
          <Controller
            name="youtubeUrl"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                aria-label={t("Basics.youtubeLabel")}
                placeholder={t("Basics.youtubePlaceholder")}
                className="flex-1"
                variant="bordered"
                radius="sm"
                value={field.value as string}
                isInvalid={!!fieldState.error}
                errorMessage={safeTranslate(fieldState.error?.message)}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
        <div>
          <p className="text-sm">{t("Basics.academicToggle")}</p>
        </div>
        <Switch isSelected={isAcademic} onValueChange={setIsAcademic} />
      </div>

      {isAcademic && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Controller
            name="universityId"
            control={control}
            render={({ field, fieldState }) => (
              <Autocomplete
                label={t("Basics.university")}
                placeholder={t("Basics.selectPlaceholder")}
                variant="bordered"
                radius="sm"
                selectedKey={field.value?.toString()}
                isInvalid={!!fieldState.error}
                errorMessage={safeTranslate(fieldState.error?.message)}
                onSelectionChange={(key) =>
                  field.onChange(key ? Number(key) : null)
                }
                onBlur={field.onBlur}
              >
                {universities.map((uni) => (
                  <AutocompleteItem key={uni.id.toString()}>
                    {uni.name}
                  </AutocompleteItem>
                ))}
              </Autocomplete>
            )}
          />
          <Controller
            name="facultyId"
            control={control}
            render={({ field, fieldState }) => (
              <Autocomplete
                label={t("Basics.faculty")}
                placeholder={t("Basics.selectPlaceholder")}
                variant="bordered"
                radius="sm"
                selectedKey={field.value?.toString()}
                isInvalid={!!fieldState.error}
                errorMessage={safeTranslate(fieldState.error?.message)}
                onSelectionChange={(key) =>
                  field.onChange(key ? Number(key) : null)
                }
                onBlur={field.onBlur}
              >
                {faculties.map((fac) => (
                  <AutocompleteItem key={fac.id.toString()}>
                    {fac.name}
                  </AutocompleteItem>
                ))}
              </Autocomplete>
            )}
          />
        </div>
      )}
    </div>
  );
};
