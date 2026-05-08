"use client";

import { Radio } from "@heroui/react";
import { UserType } from "@/types/api";
import { FormInput, FormTextarea, FormRadioGroup } from "@/components/ui/form";
import { SettingsFormActions } from "@/components/ui/SettingsFormActions";
import { SettingsPageHeader } from "@/components/ui/SettingsPageHeader";
import { useOverviewController } from "@/hooks/ui/useOverviewController";

export default function OverviewSettingsPage() {
  const { t, control, onSubmit, handleCancel, isPending, isDirty } =
    useOverviewController();

  return (
    <div className="flex flex-col gap-12">
      <SettingsPageHeader
        title={t("overviewForm.title")}
        description={t("overviewForm.description")}
      />

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
