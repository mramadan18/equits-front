"use client";

import { FundingStage, ServiceArea } from "@/types/project";
import { useTranslations } from "next-intl";
import { Control, useWatch } from "react-hook-form";
import { ProjectFormData } from "@/types/project";
import { FormSelect } from "@/components/ui/form/FormSelect";
import { FormInput } from "@/components/ui/form/FormInput";
import { FormTextarea } from "@/components/ui/form/FormTextarea";
import { FormFileUploader } from "@/components/ui/form/FormFileUploader";
import { SelectItem } from "@heroui/select";

export const ProjectFundingStep = ({
  control,
}: {
  control: Control<ProjectFormData>;
}) => {
  const t = useTranslations("Pitch");
  const useOfFunds = useWatch({ control, name: "useOfFunds" }) as string;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormSelect
          name="fundingStage"
          control={control}
          t={t}
          label={t("Funding.fundingStage")}
          placeholder={t("Basics.selectPlaceholder")}
          labelPlacement="outside"
          variant="bordered"
          radius="sm"
          classNames={{ base: "mt-0!", label: "text-foreground pb-1" }}
        >
          {Object.values(FundingStage).map((stage) => (
            <SelectItem
              key={stage}
              textValue={t(`Enums.FundingStage.${stage}`)}
            >
              {t(`Enums.FundingStage.${stage}`)}
            </SelectItem>
          ))}
        </FormSelect>

        <FormSelect
          name="serviceArea"
          control={control}
          t={t}
          label={t("Funding.serviceArea")}
          placeholder={t("Basics.selectPlaceholder")}
          labelPlacement="outside"
          variant="bordered"
          radius="sm"
          classNames={{ base: "mt-0!", label: "text-foreground pb-1" }}
        >
          {Object.values(ServiceArea).map((area) => (
            <SelectItem key={area} textValue={t(`Enums.ServiceArea.${area}`)}>
              {t(`Enums.ServiceArea.${area}`)}
            </SelectItem>
          ))}
        </FormSelect>

        <FormInput
          name="fundingAsk"
          control={control}
          t={t}
          label={t("Funding.fundingAsk")}
          placeholder={t("Funding.fundingAskPlaceholder")}
          labelPlacement="outside"
          variant="bordered"
          radius="sm"
          type="number"
        />

        <FormInput
          name="equityStake"
          control={control}
          t={t}
          label={t("Funding.equityStake")}
          placeholder={t("Funding.equityStakePlaceholder")}
          labelPlacement="outside"
          variant="bordered"
          radius="sm"
          type="number"
        />
      </div>

      <div>
        <FormTextarea
          name="useOfFunds"
          control={control}
          t={t}
          label={t("Funding.useOfFunds")}
          placeholder={t("Funding.useOfFundsPlaceholder")}
          labelPlacement="outside"
          minRows={4}
          variant="bordered"
          radius="sm"
          maxLength={1000}
          classNames={{
            description: "absolute bottom-4 end-4 text-tiny text-gray2",
            inputWrapper: "relative",
          }}
          description={
            <div className="flex justify-end w-full">
              <span>{useOfFunds?.length ?? 0}/1000</span>
            </div>
          }
        />
      </div>

      <div>
        <FormFileUploader
          name="businessPlanUrl"
          control={control}
          t={t}
          label={`${t("Funding.businessPlan")} ${t("Basics.optional")}`}
          placeholder={t("Funding.businessPlanPlaceholder")}
          accept=".pdf,image/*"
        />
      </div>
    </div>
  );
};
