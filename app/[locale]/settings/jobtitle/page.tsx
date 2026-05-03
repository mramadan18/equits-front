import { useTranslations } from "next-intl";
import { SelectItem } from "@heroui/select";
import { useUpdateJobTitle } from "@/hooks/api/useProfile";
import { ExperienceLevel } from "@/types/api";
import {
  getUpdateJobTitleSchema,
  UpdateJobTitleFormData,
} from "@/validations/profile.validation";
import { AutocompleteItem } from "@heroui/autocomplete";
import { useUniversities } from "@/hooks/api/useLookup";
import { useSettingsForm } from "@/hooks/ui/useSettingsForm";
import { FormInput, FormSelect, FormAutocomplete } from "@/components/ui/form";
import { SettingsFormActions } from "@/components/shared/SettingsFormActions";
import { SettingsPageHeader } from "@/components/shared/SettingsPageHeader";

export default function JobTitleSettingsPage() {
  const t = useTranslations("Settings");
  const validationT = useTranslations("Auth.Validation");
  const tp = useTranslations("Pitch.Basics");
  const updateMutation = useUpdateJobTitle();

  const { data: universitiesRes } = useUniversities();
  const universities = universitiesRes?.data || [];

  const { control, onSubmit, handleCancel, isPending, isDirty } =
    useSettingsForm<UpdateJobTitleFormData>({
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
