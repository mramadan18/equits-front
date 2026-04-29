"use client";

import { Input, Textarea } from "@heroui/input";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { Switch } from "@heroui/switch";
import Image from "next/image";
import { useRef } from "react";
import {
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { HiOutlineCloudArrowUp } from "react-icons/hi2";
import { useTranslations } from "next-intl";
import { useFaculties, useUniversities } from "@/hooks/api/useLookup";
import { Controller, Control } from "react-hook-form";
import { ProjectFormData } from "@/types/project";

interface ProjectBasicsStepProps {
  control: Control<ProjectFormData>;
  isAcademic: boolean;
  setIsAcademic: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FileUploaderProps {
  label: string;
  subLabel?: string;
  placeholder?: string;
  value?: string;
  onChange: (url: string) => void;
  isInvalid?: boolean;
  errorMessage?: string;
}

const FileUploader = ({
  label,
  subLabel,
  placeholder,
  value,
  onChange,
  isInvalid,
  errorMessage,
}: FileUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onChange(url);
    }
  };

  return (
    <div className="space-y-1 flex-1">
      <div className="flex items-center gap-1">
        <span className="text-sm text-dark">{label}</span>
        {subLabel && <span className="text-sm text-gray-400">{subLabel}</span>}
      </div>
      <div
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={`relative group h-32 w-full bg-[#F3F4F6] rounded-xl border cursor-pointer flex flex-col items-center justify-center gap-2 transition-all overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${isInvalid ? "border-danger" : "border-transparent hover:border-foreground"}`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
        />
        {value ? (
          <Image
            src={value}
            alt={label}
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="flex flex-col items-center justify-center pt-5 pb-6 group">
            <HiOutlineCloudArrowUp className="w-8 h-8 mb-4 text-gray2 group-hover:text-dark transition-colors" />
            <p className="mb-2 text-sm text-gray2 group-hover:text-dark transition-colors">
              <span className="font-semibold text-gray2 group-hover:text-dark transition-colors">
                {placeholder || "Browse to upload"}
              </span>
            </p>
          </div>
        )}
      </div>
      {isInvalid && errorMessage && (
        <p className="text-tiny text-danger">{errorMessage}</p>
      )}
    </div>
  );
};

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
                aria-label="LinkedIn Profile"
                placeholder="Share your startup's LinkedIn page (if available)."
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
                aria-label="Facebook Page"
                placeholder="Share your startup's Facebook page (if available)."
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
                aria-label="Instagram Profile"
                placeholder="Share your startup's Instagram profile (if available)."
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
                aria-label="YouTube Channel"
                placeholder="Share your startup's YouTube channel (if available)."
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
                selectedKey={field.value as string}
                isInvalid={!!fieldState.error}
                errorMessage={safeTranslate(fieldState.error?.message)}
                onSelectionChange={(key) =>
                  field.onChange((key as string) || "")
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
                selectedKey={field.value as string}
                isInvalid={!!fieldState.error}
                errorMessage={safeTranslate(fieldState.error?.message)}
                onSelectionChange={(key) =>
                  field.onChange((key as string) || "")
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
