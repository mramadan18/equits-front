import { useTranslations } from "next-intl";
import { Radio } from "@heroui/radio";
import { useUpdateOverview } from "@/hooks/api/useProfile";
import { UserType } from "@/types/api";
import {
  getUpdateOverviewSchema,
  UpdateOverviewFormData,
} from "@/validations/profile.validation";
import { useSettingsForm } from "@/hooks/ui/useSettingsForm";
import { FormInput, FormTextarea, FormRadioGroup } from "@/components/ui/form";
import { SettingsFormActions } from "@/components/shared/SettingsFormActions";
import { SettingsPageHeader } from "@/components/shared/SettingsPageHeader";

export default function OverviewSettingsPage() {
  const t = useTranslations("Settings");
  const validationT = useTranslations("Auth.Validation");
  const updateMutation = useUpdateOverview();

  const { control, onSubmit, handleCancel, isPending, isDirty } =
    useSettingsForm<UpdateOverviewFormData>({
      schema: getUpdateOverviewSchema(validationT),
      mutation: updateMutation,
      successMessage: t("overviewForm.saveSuccess"),
      userToForm: (user) => ({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        userType: user?.userType as UserType,
        overview: user?.overview || "",
        videoLink: user?.videoLink || "",
      }),
    });

  return (
    <div className="flex flex-col gap-12">
      <SettingsPageHeader
        title={t("overviewForm.title")}
        description={t("overviewForm.description")}
      >
        <ul className="list-disc list-inside text-gray2 text-sm ml-2">
          <li>{t("overviewForm.bullet1")}</li>
          <li>{t("overviewForm.bullet2")}</li>
          <li>{t("overviewForm.bullet3")}</li>
        </ul>
      </SettingsPageHeader>

      <form onSubmit={onSubmit} className="flex flex-col gap-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            name="firstName"
            control={control}
            label={t("overviewForm.firstName")}
            placeholder={t("overviewForm.firstNamePlaceholder")}
            labelPlacement="outside"
            variant="bordered"
            size="lg"
            radius="sm"
          />
          <FormInput
            name="lastName"
            control={control}
            label={t("overviewForm.lastName")}
            placeholder={t("overviewForm.lastNamePlaceholder")}
            labelPlacement="outside"
            variant="bordered"
            size="lg"
            radius="sm"
          />
        </div>

        <FormRadioGroup
          name="userType"
          control={control}
          label={t("overviewForm.userType")}
          orientation="horizontal"
        >
          <Radio value={UserType.TALENT}>{t("overviewForm.talent")}</Radio>
          <Radio value={UserType.INVESTOR}>{t("overviewForm.investor")}</Radio>
        </FormRadioGroup>

        <FormTextarea
          name="overview"
          control={control}
          label={t("overviewForm.overview")}
          placeholder={t("overviewForm.overviewPlaceholder")}
          labelPlacement="outside"
          variant="bordered"
          size="lg"
          radius="sm"
          minRows={6}
        />

        <FormInput
          name="videoLink"
          control={control}
          label={t("overviewForm.videoLink")}
          placeholder={t("overviewForm.videoLinkPlaceholder")}
          labelPlacement="outside"
          variant="bordered"
          size="lg"
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
