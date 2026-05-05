"use client";

import {
  ProjectType,
  ProjectStage,
  RevenueModel,
  MarketFocus,
} from "@/types/project";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { useIndustries } from "@/hooks/api/useLookup";
import { Control, useWatch } from "react-hook-form";
import { ProjectFormData } from "@/types/project";
import { FormSelect } from "@/components/ui/form/FormSelect";
import { FormAutocomplete } from "@/components/ui/form/FormAutocomplete";
import { FormTextarea } from "@/components/ui/form/FormTextarea";
import { AutocompleteItem, SelectItem } from "@heroui/react";

export const ProjectMarketStep = ({
  control,
}: {
  control: Control<ProjectFormData>;
}) => {
  const t = useTranslations("Pitch");
  const { data: industriesRes } = useIndustries();
  const industries = industriesRes?.data || [];

  const selectedIndustryId = useWatch({
    control,
    name: "industryId",
  }) as number | string | undefined;

  const subIndustries = useMemo(() => {
    if (!selectedIndustryId) return [];
    const industry = industries.find((i) => i.id === selectedIndustryId);
    return industry?.subIndustries || [];
  }, [selectedIndustryId, industries]);

  const problem = useWatch({ control, name: "problem" }) as string;
  const solution = useWatch({ control, name: "solution" }) as string;
  const valueProp = useWatch({ control, name: "valueProp" }) as string;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormAutocomplete
          name="industryId"
          control={control}
          t={t}
          label={t("Market.industry")}
          placeholder={t("Market.selectPlaceholder")}
          labelPlacement="outside"
          variant="bordered"
          radius="sm"
        >
          {industries.map((ind) => (
            <AutocompleteItem key={ind.id.toString()}>
              {ind.name}
            </AutocompleteItem>
          ))}
        </FormAutocomplete>

        <FormSelect
          name="subIndustryIds"
          control={control}
          t={t}
          label={t("Market.subIndustry")}
          placeholder={t("Market.selectPlaceholder")}
          labelPlacement="outside"
          variant="bordered"
          radius="sm"
          selectionMode="multiple"
          isDisabled={!selectedIndustryId}
          classNames={{ label: "text-foreground pb-1" }}
        >
          {subIndustries.map((sub) => (
            <SelectItem key={sub.id.toString()}>{sub.name}</SelectItem>
          ))}
        </FormSelect>

        <FormSelect
          name="projectTypes"
          control={control}
          t={t}
          label={t("Market.projectType")}
          placeholder={t("Market.selectPlaceholder")}
          labelPlacement="outside"
          variant="bordered"
          radius="sm"
          selectionMode="multiple"
          classNames={{ label: "text-foreground pb-1" }}
        >
          {Object.values(ProjectType).map((type) => (
            <SelectItem key={type} textValue={t(`Enums.ProjectType.${type}`)}>
              {t(`Enums.ProjectType.${type}`)}
            </SelectItem>
          ))}
        </FormSelect>

        <FormSelect
          name="stage"
          control={control}
          t={t}
          label={t("Market.stage")}
          placeholder={t("Market.selectPlaceholder")}
          labelPlacement="outside"
          variant="bordered"
          radius="sm"
          classNames={{ label: "text-foreground pb-1" }}
        >
          {Object.values(ProjectStage).map((stage) => (
            <SelectItem
              key={stage}
              textValue={t(`Enums.ProjectStage.${stage}`)}
            >
              {t(`Enums.ProjectStage.${stage}`)}
            </SelectItem>
          ))}
        </FormSelect>

        <FormSelect
          name="revenueModel"
          control={control}
          t={t}
          label={t("Market.revenueModel")}
          placeholder={t("Market.selectPlaceholder")}
          labelPlacement="outside"
          variant="bordered"
          radius="sm"
          classNames={{ label: "text-foreground pb-1" }}
        >
          {Object.values(RevenueModel).map((model) => (
            <SelectItem
              key={model}
              textValue={t(`Enums.RevenueModel.${model}`)}
            >
              {t(`Enums.RevenueModel.${model}`)}
            </SelectItem>
          ))}
        </FormSelect>

        <FormSelect
          name="marketFocus"
          control={control}
          t={t}
          label={t("Market.marketFocus")}
          placeholder={t("Market.selectPlaceholder")}
          labelPlacement="outside"
          variant="bordered"
          radius="sm"
          classNames={{ label: "text-foreground pb-1" }}
        >
          {Object.values(MarketFocus).map((focus) => (
            <SelectItem key={focus} textValue={t(`Enums.MarketFocus.${focus}`)}>
              {t(`Enums.MarketFocus.${focus}`)}
            </SelectItem>
          ))}
        </FormSelect>
      </div>

      <div className="space-y-6">
        <FormTextarea
          name="problem"
          control={control}
          t={t}
          label={t("Market.problem")}
          placeholder={t("Market.problemPlaceholder")}
          labelPlacement="outside"
          minRows={4}
          variant="bordered"
          radius="sm"
          maxLength={2000}
          classNames={{
            description: "absolute bottom-4 end-4 text-tiny text-gray2",
            inputWrapper: "relative",
          }}
          description={
            <div className="flex justify-end w-full">
              <span>{problem?.length ?? 0}/2000</span>
            </div>
          }
        />
        <FormTextarea
          name="solution"
          control={control}
          t={t}
          label={t("Market.solution")}
          placeholder={t("Market.solutionPlaceholder")}
          labelPlacement="outside"
          minRows={4}
          variant="bordered"
          radius="sm"
          maxLength={2000}
          classNames={{
            description: "absolute bottom-4 end-4 text-tiny text-gray2",
            inputWrapper: "relative",
          }}
          description={
            <div className="flex justify-end w-full">
              <span>{solution?.length ?? 0}/2000</span>
            </div>
          }
        />
        <FormTextarea
          name="valueProp"
          control={control}
          t={t}
          label={t("Market.valueProp")}
          placeholder={t("Market.valuePropPlaceholder")}
          labelPlacement="outside"
          minRows={4}
          variant="bordered"
          radius="sm"
          maxLength={2000}
          classNames={{
            description: "absolute bottom-4 end-4 text-tiny text-gray2",
            inputWrapper: "relative",
          }}
          description={
            <div className="flex justify-end w-full">
              <span>{valueProp?.length ?? 0}/2000</span>
            </div>
          }
        />
      </div>
    </div>
  );
};
