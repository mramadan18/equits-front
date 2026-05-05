"use client";

import { Button } from "@heroui/react";
import { ProjectStepper } from "@/components/projects/new-project/ProjectStepper";
import { ProjectBasicsStep } from "@/components/projects/new-project/steps/ProjectBasicsStep";
import { ProjectMarketStep } from "@/components/projects/new-project/steps/ProjectMarketStep";
import { ProjectTractionStep } from "@/components/projects/new-project/steps/ProjectTractionStep";
import { ProjectFundingStep } from "@/components/projects/new-project/steps/ProjectFundingStep";
import { useProjectWizard } from "@/hooks/ui/useProjectWizard";
import { useTranslations } from "next-intl";

export default function NewProjectPage() {
  const {
    step,
    control,
    isAcademic,
    setIsAcademic,
    handleNext,
    handlePublish,
    goBack,
    isUpdating,
    isSubmitting,
  } = useProjectWizard();
  const t = useTranslations("Pitch");

  return (
    <div className="container max-w-6xl py-12 px-4">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <h1 className="mt-3 text-3xl font-semibold text-primary">
          {t("title")}
        </h1>
        <p className="mt-4 text-sm text-gray2">{t("subtitle")}</p>
      </div>

      <ProjectStepper step={step} />

      <div>
        {step === 1 && (
          <ProjectBasicsStep
            control={control}
            isAcademic={isAcademic}
            setIsAcademic={setIsAcademic}
          />
        )}

        {step === 2 && <ProjectMarketStep control={control} />}

        {step === 3 && <ProjectTractionStep control={control} />}

        {step === 4 && <ProjectFundingStep control={control} />}

        <div className="mt-8 flex justify-end gap-4">
          {step > 1 && (
            <Button
              variant="bordered"
              onPress={goBack}
              disabled={isUpdating || isSubmitting}
              className="px-8 rounded-full border-gray-300 text-gray-600 font-medium"
            >
              {t("buttons.back")}
            </Button>
          )}
          {step < 4 ? (
            <Button
              className="font-semibold"
              color="primary"
              radius="full"
              onPress={handleNext}
              isLoading={isUpdating}
            >
              {t("buttons.next")}
            </Button>
          ) : (
            <Button
              className="font-semibold"
              color="primary"
              radius="full"
              onPress={handlePublish}
              isLoading={isUpdating || isSubmitting}
            >
              {t("buttons.submit")}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
