"use client";

import { TractionType, GrowthRate } from "@/types/project";
import { useTranslations } from "next-intl";
import { Control } from "react-hook-form";
import { ProjectFormData } from "@/types/project";
import { FormSelect } from "@/components/ui/form/FormSelect";
import { FormInput } from "@/components/ui/form/FormInput";
import { SelectItem } from "@heroui/react";

export const ProjectTractionStep = ({
  control,
}: {
  control: Control<ProjectFormData>;
}) => {
  const t = useTranslations("Pitch");

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormSelect
          name="currentTraction"
          control={control}
          t={t}
          label={t("Traction.currentTraction")}
          placeholder={t("Market.selectPlaceholder")}
          labelPlacement="outside"
          variant="bordered"
          radius="sm"
          classNames={{ base: "mt-0!", label: "text-foreground pb-1" }}
        >
          {Object.values(TractionType).map((type) => (
            <SelectItem key={type} textValue={t(`Enums.TractionType.${type}`)}>
              {t(`Enums.TractionType.${type}`)}
            </SelectItem>
          ))}
        </FormSelect>

        <FormSelect
          name="growthRate"
          control={control}
          t={t}
          label={`${t("Traction.growthRate")} ${t("Basics.optional")}`}
          placeholder={t("Market.selectPlaceholder")}
          labelPlacement="outside"
          variant="bordered"
          radius="sm"
          classNames={{ base: "mt-0!", label: "text-foreground pb-1" }}
        >
          {Object.values(GrowthRate).map((rate) => (
            <SelectItem key={rate} textValue={t(`Enums.GrowthRate.${rate}`)}>
              {t(`Enums.GrowthRate.${rate}`)}
            </SelectItem>
          ))}
        </FormSelect>

        <FormInput
          name="totalUsers"
          control={control}
          t={t}
          label={`${t("Traction.totalUsers")} ${t("Basics.optional")}`}
          placeholder={t("Traction.totalUsersPlaceholder")}
          labelPlacement="outside"
          variant="bordered"
          radius="sm"
          type="number"
        />

        <FormInput
          name="dailyActiveUsers"
          control={control}
          t={t}
          label={`${t("Traction.dau")} ${t("Basics.optional")}`}
          placeholder={t("Traction.dauPlaceholder")}
          labelPlacement="outside"
          variant="bordered"
          radius="sm"
          type="number"
        />

        <FormInput
          name="monthlyRevenue"
          control={control}
          t={t}
          label={`${t("Traction.mrr")} ${t("Basics.optional")}`}
          placeholder={t("Traction.mrrPlaceholder")}
          labelPlacement="outside"
          variant="bordered"
          radius="sm"
          type="number"
        />

        <FormInput
          name="growthRatePct"
          control={control}
          t={t}
          label={`${t("Traction.growthRatePct")} ${t("Basics.optional")}`}
          placeholder={t("Traction.growthRatePctPlaceholder")}
          labelPlacement="outside"
          variant="bordered"
          radius="sm"
          type="number"
        />

        <FormInput
          name="retentionRate"
          control={control}
          t={t}
          label={`${t("Traction.retentionRate")} ${t("Basics.optional")}`}
          placeholder={t("Traction.retentionRatePlaceholder")}
          labelPlacement="outside"
          variant="bordered"
          radius="sm"
          type="number"
        />

        <FormInput
          name="conversionRate"
          control={control}
          t={t}
          label={`${t("Traction.conversionRate")} ${t("Basics.optional")}`}
          placeholder={t("Traction.conversionRatePlaceholder")}
          labelPlacement="outside"
          variant="bordered"
          radius="sm"
          type="number"
        />
      </div>
    </div>
  );
};
