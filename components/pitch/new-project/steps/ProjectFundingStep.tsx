"use client";

import { Input, Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { FundingStage, ServiceArea } from "@/types/project";
import { useTranslations } from "next-intl";
import { Controller, Control, useWatch } from "react-hook-form";
import { ProjectFormData } from "@/types/project";

interface ProjectFundingStepProps {
  control: Control<ProjectFormData>;
}

export const ProjectFundingStep = ({ control }: ProjectFundingStepProps) => {
  const t = useTranslations("Pitch");
  const useOfFunds = useWatch({ control, name: "useOfFunds" }) as string;

  const safeTranslate = (key: string | undefined) => {
    if (!key) return "";
    return key.startsWith("Validation.") ? t(key) : key;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Controller
          name="fundingStage"
          control={control}
          render={({ field, fieldState }) => (
            <Select
              label={t("Funding.fundingStage")}
              placeholder={t("Basics.selectPlaceholder")}
              labelPlacement="outside"
              variant="bordered"
              radius="sm"
              selectedKeys={field.value ? [field.value as string] : []}
              isInvalid={!!fieldState.error}
              errorMessage={safeTranslate(fieldState.error?.message)}
              classNames={{ label: "text-foreground pb-1" }}
              onSelectionChange={(selection) => {
                const value = Array.from(selection)[0] as FundingStage;
                field.onChange(value || "");
              }}
              onBlur={field.onBlur}
            >
              {Object.values(FundingStage).map((stage) => (
                <SelectItem
                  key={stage}
                  textValue={t(`Enums.FundingStage.${stage}`)}
                >
                  {t(`Enums.FundingStage.${stage}`)}
                </SelectItem>
              ))}
            </Select>
          )}
        />
        <Controller
          name="serviceArea"
          control={control}
          render={({ field, fieldState }) => (
            <Select
              label={t("Funding.serviceArea")}
              placeholder={t("Basics.selectPlaceholder")}
              labelPlacement="outside"
              variant="bordered"
              radius="sm"
              selectedKeys={field.value ? [field.value as string] : []}
              isInvalid={!!fieldState.error}
              errorMessage={safeTranslate(fieldState.error?.message)}
              classNames={{ label: "text-foreground pb-1" }}
              onSelectionChange={(selection) => {
                const value = Array.from(selection)[0] as ServiceArea;
                field.onChange(value || "");
              }}
              onBlur={field.onBlur}
            >
              {Object.values(ServiceArea).map((area) => (
                <SelectItem
                  key={area}
                  textValue={t(`Enums.ServiceArea.${area}`)}
                >
                  {t(`Enums.ServiceArea.${area}`)}
                </SelectItem>
              ))}
            </Select>
          )}
        />
        <Controller
          name="fundingAsk"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              label={t("Funding.fundingAsk")}
              placeholder={t("Funding.fundingAskPlaceholder")}
              labelPlacement="outside"
              variant="bordered"
              radius="sm"
              type="number"
              value={field.value as string}
              isInvalid={!!fieldState.error}
              errorMessage={safeTranslate(fieldState.error?.message)}
              onChange={field.onChange}
              onBlur={field.onBlur}
            />
          )}
        />
        <Controller
          name="equityStake"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              label={t("Funding.equityStake")}
              placeholder={t("Funding.equityStakePlaceholder")}
              labelPlacement="outside"
              variant="bordered"
              radius="sm"
              type="number"
              value={field.value as string}
              isInvalid={!!fieldState.error}
              errorMessage={safeTranslate(fieldState.error?.message)}
              onChange={field.onChange}
              onBlur={field.onBlur}
            />
          )}
        />
      </div>

      <Controller
        name="useOfFunds"
        control={control}
        render={({ field, fieldState }) => (
          <Textarea
            label={t("Funding.useOfFunds")}
            placeholder={t("Funding.useOfFundsPlaceholder")}
            labelPlacement="outside"
            minRows={4}
            variant="bordered"
            radius="sm"
            value={field.value as string}
            isInvalid={!!fieldState.error}
            errorMessage={safeTranslate(fieldState.error?.message)}
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
            onChange={field.onChange}
            onBlur={field.onBlur}
          />
        )}
      />

      <Controller
        name="businessPlanUrl"
        control={control}
        render={({ field, fieldState }) => (
          <Input
            label={`${t("Funding.businessPlan")} ${t("Basics.optional")}`}
            placeholder={t("Funding.businessPlanPlaceholder")}
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
  );
};
