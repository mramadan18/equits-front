"use client";

import {
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { useTranslations } from "next-intl";
import { useFaculties, useUniversities } from "@/hooks/api/useLookup";
import { Control, useWatch } from "react-hook-form";
import { ProjectFormData } from "@/types/project";
import { FormInput } from "@/components/ui/form/FormInput";
import { FormTextarea } from "@/components/ui/form/FormTextarea";
import { FormAutocomplete } from "@/components/ui/form/FormAutocomplete";
import { FormFileUploader } from "@/components/ui/form/FormFileUploader";
import { AutocompleteItem, Switch } from "@heroui/react";

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

  const elevatorPitch = useWatch({ control, name: "elevatorPitch" }) as string;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          name="title"
          control={control}
          t={t}
          label={t("Basics.projectName")}
          placeholder={t("Basics.projectNamePlaceholder")}
          labelPlacement="outside"
          variant="bordered"
          radius="sm"
          maxLength={60}
          classNames={{
            description:
              "absolute bottom-1 right-2 text-tiny! text-default-400",
            inputWrapper: "relative",
          }}
        />
        <FormInput
          name="tagline"
          control={control}
          t={t}
          label={t("Basics.tagline")}
          placeholder={t("Basics.taglinePlaceholder")}
          labelPlacement="outside"
          variant="bordered"
          radius="sm"
          maxLength={160}
          classNames={{
            description:
              "absolute bottom-1 right-2 text-tiny! text-default-400",
            inputWrapper: "relative",
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormFileUploader
          name="logo"
          control={control}
          t={t}
          label={t("Basics.logo")}
          subLabel={t("Basics.logoSubLabel")}
          placeholder={t("Basics.browse")}
        />
        <FormFileUploader
          name="cover"
          control={control}
          t={t}
          label={t("Basics.cover")}
          placeholder={t("Basics.browse")}
        />
      </div>

      <div className="flex flex-col gap-4">
        <FormTextarea
          name="elevatorPitch"
          control={control}
          t={t}
          label={t("Basics.elevatorPitch")}
          placeholder={t("Basics.elevatorPitchPlaceholder")}
          labelPlacement="outside"
          minRows={4}
          variant="bordered"
          radius="sm"
          maxLength={1000}
          description={
            <div className="flex justify-end w-full">
              <span>{elevatorPitch?.length ?? 0}/1000</span>
            </div>
          }
          classNames={{
            description: "absolute bottom-4 end-4 text-tiny! text-gray2",
            inputWrapper: "relative",
          }}
        />
        <FormInput
          name="videoUrl"
          control={control}
          t={t}
          label={`${t("Basics.youtubeVideo")} ${t("Basics.optional")}`}
          placeholder={t("Basics.youtubeVideoPlaceholder")}
          labelPlacement="outside"
          variant="bordered"
          radius="sm"
        />
        <FormInput
          name="projectUrl"
          control={control}
          t={t}
          label={`${t("Basics.liveLink")} ${t("Basics.optional")}`}
          placeholder={t("Basics.liveLinkPlaceholder")}
          labelPlacement="outside"
          variant="bordered"
          radius="sm"
        />
      </div>

      <div className="space-y-4">
        <span className="block text-sm">
          {t("Basics.socialMedia")} {t("Basics.optional")}
        </span>
        <div className="flex items-center gap-4">
          <FaLinkedinIn className="text-blue-600 text-2xl flex-shrink-0" />
          <FormInput
            name="linkedinUrl"
            control={control}
            t={t}
            aria-label={t("Basics.linkedinLabel")}
            placeholder={t("Basics.linkedinPlaceholder")}
            className="flex-1"
            variant="bordered"
            radius="sm"
          />
        </div>
        <div className="flex items-center gap-4">
          <FaFacebookF className="text-blue-600 text-2xl flex-shrink-0" />
          <FormInput
            name="facebookUrl"
            control={control}
            t={t}
            aria-label={t("Basics.facebookLabel")}
            placeholder={t("Basics.facebookPlaceholder")}
            className="flex-1"
            variant="bordered"
            radius="sm"
          />
        </div>
        <div className="flex items-center gap-4">
          <FaInstagram className="text-pink-600 text-2xl flex-shrink-0" />
          <FormInput
            name="instagramUrl"
            control={control}
            t={t}
            aria-label={t("Basics.instagramLabel")}
            placeholder={t("Basics.instagramPlaceholder")}
            className="flex-1"
            variant="bordered"
            radius="sm"
          />
        </div>
        <div className="flex items-center gap-4">
          <FaYoutube className="text-red-600 text-2xl flex-shrink-0" />
          <FormInput
            name="youtubeUrl"
            control={control}
            t={t}
            aria-label={t("Basics.youtubeLabel")}
            placeholder={t("Basics.youtubePlaceholder")}
            className="flex-1"
            variant="bordered"
            radius="sm"
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
          <FormAutocomplete
            name="universityId"
            control={control}
            t={t}
            label={t("Basics.university")}
            placeholder={t("Basics.selectPlaceholder")}
            variant="bordered"
            radius="sm"
          >
            {universities.map((uni) => (
              <AutocompleteItem key={uni.id.toString()}>
                {uni.name}
              </AutocompleteItem>
            ))}
          </FormAutocomplete>
          <FormAutocomplete
            name="facultyId"
            control={control}
            t={t}
            label={t("Basics.faculty")}
            placeholder={t("Basics.selectPlaceholder")}
            variant="bordered"
            radius="sm"
          >
            {faculties.map((fac) => (
              <AutocompleteItem key={fac.id.toString()}>
                {fac.name}
              </AutocompleteItem>
            ))}
          </FormAutocomplete>
        </div>
      )}
    </div>
  );
};
