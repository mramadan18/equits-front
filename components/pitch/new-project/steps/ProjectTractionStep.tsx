"use client";

import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { TractionType, GrowthRate } from "@/types/project";
import { useTranslations } from "next-intl";
import { Controller, Control } from "react-hook-form";
import { ProjectFormData } from "@/types/project";

interface ProjectTractionStepProps {
  control: Control<ProjectFormData>;
}

export const ProjectTractionStep = ({ control }: ProjectTractionStepProps) => {
  const t = useTranslations("Pitch");

  const safeTranslate = (key: string | undefined) => {
    if (!key) return "";
    return key.startsWith("Validation.") ? t(key) : key;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Controller
            name="currentTraction"
            control={control}
            render={({ field, fieldState }) => (
              <Select
                label={t("Traction.currentTraction")}
                placeholder={t("Market.selectPlaceholder")}
                labelPlacement="outside"
                variant="bordered"
                radius="sm"
                selectedKeys={field.value ? [field.value as string] : []}
                isInvalid={!!fieldState.error}
                errorMessage={safeTranslate(fieldState.error?.message)}
                classNames={{ base: "mt-0!", label: "text-foreground pb-1" }}
                onSelectionChange={(selection) => {
                  const value = Array.from(selection)[0] as TractionType;
                  field.onChange(value || "");
                }}
                onBlur={field.onBlur}
              >
                {Object.values(TractionType).map((type) => (
                  <SelectItem
                    key={type}
                    textValue={t(`Enums.TractionType.${type}`)}
                  >
                    {t(`Enums.TractionType.${type}`)}
                  </SelectItem>
                ))}
              </Select>
            )}
          />
        </div>
        <div>
          <Controller
            name="growthRate"
            control={control}
            render={({ field, fieldState }) => (
              <Select
                label={`${t("Traction.growthRate")} ${t("Basics.optional")}`}
                placeholder={t("Market.selectPlaceholder")}
                labelPlacement="outside"
                variant="bordered"
                radius="sm"
                selectedKeys={field.value ? [field.value as string] : []}
                isInvalid={!!fieldState.error}
                errorMessage={safeTranslate(fieldState.error?.message)}
                classNames={{ label: "text-foreground pb-1" }}
                onSelectionChange={(selection) => {
                  const value = Array.from(selection)[0] as GrowthRate;
                  field.onChange(value || "");
                }}
                onBlur={field.onBlur}
              >
                {Object.values(GrowthRate).map((rate) => (
                  <SelectItem
                    key={rate}
                    textValue={t(`Enums.GrowthRate.${rate}`)}
                  >
                    {t(`Enums.GrowthRate.${rate}`)}
                  </SelectItem>
                ))}
              </Select>
            )}
          />
        </div>
        <div>
          <Controller
            name="totalUsers"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                label={`${t("Traction.totalUsers")} ${t("Basics.optional")}`}
                placeholder={t("Traction.totalUsersPlaceholder")}
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
        <div>
          <Controller
            name="dailyActiveUsers"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                label={`${t("Traction.dau")} ${t("Basics.optional")}`}
                placeholder={t("Traction.dauPlaceholder")}
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
        <div>
          <Controller
            name="monthlyRevenue"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                label={`${t("Traction.mrr")} ${t("Basics.optional")}`}
                placeholder={t("Traction.mrrPlaceholder")}
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
        <div>
          <Controller
            name="growthRatePct"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                label={`${t("Traction.growthRatePct")} ${t("Basics.optional")}`}
                placeholder={t("Traction.growthRatePctPlaceholder")}
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
        <div>
          <Controller
            name="retentionRate"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                label={`${t("Traction.retentionRate")} ${t("Basics.optional")}`}
                placeholder={t("Traction.retentionRatePlaceholder")}
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
        <div>
          <Controller
            name="conversionRate"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                label={`${t("Traction.conversionRate")} ${t("Basics.optional")}`}
                placeholder={t("Traction.conversionRatePlaceholder")}
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
      </div>
    </div>
  );
};
