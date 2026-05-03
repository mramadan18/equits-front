"use client";

import { SelectItem } from "@heroui/select";
import { AutocompleteItem } from "@heroui/autocomplete";
import { FormInput, FormSelect, FormAutocomplete } from "@/components/ui/form";
import { SettingsFormActions } from "@/components/shared/SettingsFormActions";
import { SettingsPageHeader } from "@/components/shared/SettingsPageHeader";
import { useJobTitleController } from "@/hooks/ui/useJobTitleController";

export default function JobTitleSettingsPage() {
  const {
    t,
    tp,
    universities,
    experienceLevels,
    control,
    onSubmit,
    handleCancel,
    isPending,
    isDirty,
  } = useJobTitleController();

  return (
    <div className="flex flex-col gap-12">
      <SettingsPageHeader
        title={t("jobTitleForm.title")}
        description={t("jobTitleForm.description")}
      />

      <form onSubmit={onSubmit} className="flex flex-col gap-10">
        <FormInput
          name="jobTitle"
          control={control}
          label={t("jobTitleForm.yourJobTitle")}
          placeholder={t("jobTitleForm.yourJobTitlePlaceholder")}
          labelPlacement="outside"
          variant="bordered"
          radius="sm"
        />

        <FormSelect
          name="experienceLevel"
          control={control}
          label={t("jobTitleForm.experienceLevel")}
          labelPlacement="outside"
          placeholder={tp("selectPlaceholder")}
          variant="bordered"
          radius="sm"
        >
          {experienceLevels.map((level) => (
            <SelectItem
              key={level}
              textValue={t(`jobTitleForm.levels.${level}`)}
            >
              {t(`jobTitleForm.levels.${level}`)}
            </SelectItem>
          ))}
        </FormSelect>

        <FormAutocomplete
          name="company"
          control={control}
          label={t("jobTitleForm.organization")}
          placeholder={t("jobTitleForm.organization")}
          labelPlacement="outside"
          variant="bordered"
          radius="sm"
          allowsCustomValue
        >
          {universities.map((uni) => (
            <AutocompleteItem key={uni.name} textValue={uni.name}>
              {uni.name}
            </AutocompleteItem>
          ))}
        </FormAutocomplete>

        <FormInput
          name="companyLink"
          control={control}
          label={t("jobTitleForm.organizationLink")}
          placeholder={t("jobTitleForm.organizationLinkPlaceholder")}
          labelPlacement="outside"
          variant="bordered"
          radius="sm"
        />

        <SettingsFormActions
          isPending={isPending}
          isDirty={isDirty}
          onCancel={handleCancel}
        />
      </form>
    </div>
  );
}
