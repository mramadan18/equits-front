"use client";

import { useState, useMemo } from "react";
import {
  initialStep1Form,
  initialStep2Form,
  initialStep3Form,
  initialStep4Form,
} from "@/components/pitch/new-project/constants";
import { ProjectStep, ProjectFormData } from "@/types/project";
import { useTranslations } from "next-intl";
import {
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
} from "@/validations/project.validation";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useUpdateProjectStep, useSubmitProject } from "@/hooks/api/useProject";
import { useRouter } from "@/i18n/navigation";
import { MainRoutes } from "@/types";
import { addToast } from "@heroui/toast";

export const useProjectWizard = () => {
  const t = useTranslations("Pitch");
  const [step, setStep] = useState<ProjectStep>(1);

  const currentSchema = useMemo(() => {
    switch (step) {
      case 1:
        return step1Schema;
      case 2:
        return step2Schema;
      case 3:
        return step3Schema;
      case 4:
        return step4Schema;
      default:
        return step1Schema;
    }
  }, [step]);

  const searchParams = useSearchParams();
  const projectId = searchParams.get("id");
  const router = useRouter();

  const { mutateAsync: updateStep, isPending: isUpdating } =
    useUpdateProjectStep();
  const { mutateAsync: submitProject, isPending: isSubmitting } =
    useSubmitProject();

  const { setValue, trigger, control, getValues } = useForm<ProjectFormData>({
    mode: "onBlur",
    resolver: zodResolver(currentSchema as any),
    defaultValues: {
      ...initialStep1Form,
      ...initialStep2Form,
      ...initialStep3Form,
      ...initialStep4Form,
      isAcademic: false,
    },
  });

  const isAcademic = useWatch({ control, name: "isAcademic" }) as boolean;

  const validate = async () => {
    const result = await trigger();
    return result;
  };

  const handleNext = async () => {
    const isValid = await validate();
    if (!isValid) return;

    if (projectId) {
      try {
        const values = getValues();
        await updateStep({
          id: projectId,
          step,
          data: values,
        });

        const nextStep = (step + 1) as ProjectStep;
        if (nextStep <= 4) {
          setStep(nextStep);
          window.scrollTo(0, 0);
        }
      } catch {
        addToast({
          title: t("toasts.error"),
          description: t("toasts.saveError"),
          color: "danger",
        });
      }
    }
  };

  const handlePublish = async () => {
    const isValid = await validate();
    if (!isValid) return;

    if (projectId) {
      try {
        const values = getValues();
        // Save the last step first
        await updateStep({
          id: projectId,
          step: 4,
          data: values,
        });

        // Then submit
        await submitProject(projectId);
        addToast({
          title: t("toasts.success"),
          description: t("toasts.submitSuccess"),
          color: "success",
        });
        router.push(MainRoutes.HOME);
      } catch {
        addToast({
          title: t("toasts.error"),
          description: t("toasts.submitError"),
          color: "danger",
        });
      }
    }
  };

  const goBack = () => {
    const prevStep = Math.max(1, step - 1) as ProjectStep;
    setStep(prevStep);
  };

  return {
    step,
    control,
    isAcademic,
    setIsAcademic: (value: React.SetStateAction<boolean>) => {
      const nextValue = typeof value === "function" ? value(isAcademic) : value;
      setValue("isAcademic", nextValue, { shouldValidate: true });
    },
    handleNext,
    handlePublish,
    goBack,
    isUpdating,
    isSubmitting,
  };
};
