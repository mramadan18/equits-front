"use client";

import { Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import {
  ProjectType,
  ProjectStage,
  RevenueModel,
  MarketFocus,
} from "@/types/project";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { useIndustries } from "@/hooks/api/useLookup";
import { Controller, Control, useWatch } from "react-hook-form";
import { ProjectFormData } from "@/types/project";

interface ProjectMarketStepProps {
  control: Control<ProjectFormData>;
}

export const ProjectMarketStep = ({ control }: ProjectMarketStepProps) => {
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

  const safeTranslate = (key: string | undefined) => {
    if (!key) return "";
    return key.startsWith("Validation.") ? t(key) : key;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Controller
            name="industryId"
            control={control}
            render={({ field, fieldState }) => (
              <Autocomplete
                label={t("Market.industry")}
                placeholder={t("Market.selectPlaceholder")}
                labelPlacement="outside"
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
                {industries.map((ind) => (
                  <AutocompleteItem key={ind.id.toString()}>
                    {ind.name}
                  </AutocompleteItem>
                ))}
              </Autocomplete>
            )}
          />
        </div>
        <div>
          <Controller
            name="subIndustryIds"
            control={control}
            render={({ field, fieldState }) => (
              <Select
                label={t("Market.subIndustry")}
                placeholder={t("Market.selectPlaceholder")}
                labelPlacement="outside"
                variant="bordered"
                radius="sm"
                selectionMode="multiple"
                selectedKeys={
                  new Set(
                    (field.value as number[])?.map((id) => id.toString()) || [],
                  )
                }
                isInvalid={!!fieldState.error}
                errorMessage={safeTranslate(fieldState.error?.message)}
                isDisabled={!selectedIndustryId}
                classNames={{ label: "text-foreground pb-1" }}
                onSelectionChange={(selection) =>
                  field.onChange(Array.from(selection).map(Number))
                }
                onBlur={field.onBlur}
              >
                {subIndustries.map((sub) => (
                  <SelectItem key={sub.id.toString()}>{sub.name}</SelectItem>
                ))}
              </Select>
            )}
          />
        </div>
        <div>
          <Controller
            name="projectTypes"
            control={control}
            render={({ field, fieldState }) => (
              <Select
                label={t("Market.projectType")}
                placeholder={t("Market.selectPlaceholder")}
                labelPlacement="outside"
                variant="bordered"
                radius="sm"
                selectionMode="multiple"
                selectedKeys={new Set(field.value as ProjectType[])}
                isInvalid={!!fieldState.error}
                errorMessage={safeTranslate(fieldState.error?.message)}
                classNames={{ label: "text-foreground pb-1" }}
                onSelectionChange={(selection) =>
                  field.onChange(Array.from(selection) as ProjectType[])
                }
                onBlur={field.onBlur}
              >
                {Object.values(ProjectType).map((type) => (
                  <SelectItem
                    key={type}
                    textValue={t(`Enums.ProjectType.${type}`)}
                  >
                    {t(`Enums.ProjectType.${type}`)}
                  </SelectItem>
                ))}
              </Select>
            )}
          />
        </div>
        <div>
          <Controller
            name="stage"
            control={control}
            render={({ field, fieldState }) => (
              <Select
                label={t("Market.stage")}
                placeholder={t("Market.selectPlaceholder")}
                labelPlacement="outside"
                variant="bordered"
                radius="sm"
                selectedKeys={field.value ? [field.value as string] : []}
                isInvalid={!!fieldState.error}
                errorMessage={safeTranslate(fieldState.error?.message)}
                classNames={{ label: "text-foreground pb-1" }}
                onSelectionChange={(selection) => {
                  const value = Array.from(selection)[0] as ProjectStage;
                  field.onChange(value || "");
                }}
                onBlur={field.onBlur}
              >
                {Object.values(ProjectStage).map((stage) => (
                  <SelectItem
                    key={stage}
                    textValue={t(`Enums.ProjectStage.${stage}`)}
                  >
                    {t(`Enums.ProjectStage.${stage}`)}
                  </SelectItem>
                ))}
              </Select>
            )}
          />
        </div>
        <div>
          <Controller
            name="revenueModel"
            control={control}
            render={({ field, fieldState }) => (
              <Select
                label={t("Market.revenueModel")}
                placeholder={t("Market.selectPlaceholder")}
                labelPlacement="outside"
                variant="bordered"
                radius="sm"
                selectedKeys={field.value ? [field.value as string] : []}
                isInvalid={!!fieldState.error}
                errorMessage={safeTranslate(fieldState.error?.message)}
                classNames={{ label: "text-foreground pb-1" }}
                onSelectionChange={(selection) => {
                  const value = Array.from(selection)[0] as RevenueModel;
                  field.onChange(value || "");
                }}
                onBlur={field.onBlur}
              >
                {Object.values(RevenueModel).map((model) => (
                  <SelectItem
                    key={model}
                    textValue={t(`Enums.RevenueModel.${model}`)}
                  >
                    {t(`Enums.RevenueModel.${model}`)}
                  </SelectItem>
                ))}
              </Select>
            )}
          />
        </div>
        <div>
          <Controller
            name="marketFocus"
            control={control}
            render={({ field, fieldState }) => (
              <Select
                label={t("Market.marketFocus")}
                placeholder={t("Market.selectPlaceholder")}
                labelPlacement="outside"
                variant="bordered"
                radius="sm"
                selectedKeys={field.value ? [field.value as string] : []}
                isInvalid={!!fieldState.error}
                errorMessage={safeTranslate(fieldState.error?.message)}
                classNames={{ label: "text-foreground pb-1" }}
                onSelectionChange={(selection) => {
                  const value = Array.from(selection)[0] as MarketFocus;
                  field.onChange(value || "");
                }}
                onBlur={field.onBlur}
              >
                {Object.values(MarketFocus).map((focus) => (
                  <SelectItem
                    key={focus}
                    textValue={t(`Enums.MarketFocus.${focus}`)}
                  >
                    {t(`Enums.MarketFocus.${focus}`)}
                  </SelectItem>
                ))}
              </Select>
            )}
          />
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <Controller
            name="problem"
            control={control}
            render={({ field, fieldState }) => (
              <Textarea
                label={t("Market.problem")}
                placeholder={t("Market.problemPlaceholder")}
                labelPlacement="outside"
                minRows={4}
                variant="bordered"
                radius="sm"
                value={field.value as string}
                isInvalid={!!fieldState.error}
                errorMessage={safeTranslate(fieldState.error?.message)}
                maxLength={2000}
                classNames={{
                  description: "absolute bottom-4 end-4 text-tiny text-gray2",
                  inputWrapper: "relative",
                }}
                description={
                  <div className="flex justify-end w-full">
                    <span>{(field.value as string)?.length ?? 0}/2000</span>
                  </div>
                }
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />
        </div>
        <div>
          <Controller
            name="solution"
            control={control}
            render={({ field, fieldState }) => (
              <Textarea
                label={t("Market.solution")}
                placeholder={t("Market.solutionPlaceholder")}
                labelPlacement="outside"
                minRows={4}
                variant="bordered"
                radius="sm"
                value={field.value as string}
                isInvalid={!!fieldState.error}
                errorMessage={safeTranslate(fieldState.error?.message)}
                maxLength={2000}
                classNames={{
                  description: "absolute bottom-4 end-4 text-tiny text-gray2",
                  inputWrapper: "relative",
                }}
                description={
                  <div className="flex justify-end w-full">
                    <span>{(field.value as string)?.length ?? 0}/2000</span>
                  </div>
                }
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />
        </div>
        <div>
          <Controller
            name="valueProp"
            control={control}
            render={({ field, fieldState }) => (
              <Textarea
                label={t("Market.valueProp")}
                placeholder={t("Market.valuePropPlaceholder")}
                labelPlacement="outside"
                minRows={4}
                variant="bordered"
                radius="sm"
                value={field.value as string}
                isInvalid={!!fieldState.error}
                errorMessage={safeTranslate(fieldState.error?.message)}
                maxLength={2000}
                classNames={{
                  description: "absolute bottom-4 end-4 text-tiny text-gray2",
                  inputWrapper: "relative",
                }}
                description={
                  <div className="flex justify-end w-full">
                    <span>{(field.value as string)?.length ?? 0}/2000</span>
                  </div>
                }
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};
