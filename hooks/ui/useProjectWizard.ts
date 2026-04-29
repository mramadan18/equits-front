"use client";

import React, { useEffect, useState, useMemo } from "react";
import {
  initialStep1Form,
  initialStep2Form,
  initialStep3Form,
  initialStep4Form,
} from "@/components/pitch/new-project/constants";
import { ProjectStep, ProjectFormData } from "@/types/project";
import {
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
} from "@/validations/project.validation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const useProjectWizard = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialStep = Number(searchParams.get("step") ?? "1");

  const [step, setStep] = useState<ProjectStep>(
    Number.isFinite(initialStep) ? (initialStep as ProjectStep) : 1,
  );

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

  const { setValue, trigger, control } = useForm<ProjectFormData>({
    mode: "all",
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

  useEffect(() => {
    const queryStep = Number(searchParams.get("step") ?? "1");
    setStep(Number.isFinite(queryStep) ? (queryStep as ProjectStep) : 1);
  }, [searchParams]);

  const setWizardUrl = (nextStep: ProjectStep) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("step", String(nextStep));

    const nextUrl = params.toString() ? `?${params.toString()}` : pathname;
    router.replace(nextUrl, { scroll: false });
  };

  const handleNext = async () => {
    const isValid = await validate();
    if (!isValid) return;
    const nextStep = (step + 1) as ProjectStep;
    if (nextStep <= 4) {
      setStep(nextStep);
      setWizardUrl(nextStep);
    }
  };

  const handlePublish = async () => {
    const isValid = await validate();
    if (!isValid) return;
    // Handle publish logic here
  };

  const goBack = () => {
    const prevStep = Math.max(1, step - 1) as ProjectStep;
    setStep(prevStep);
    setWizardUrl(prevStep);
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
  };
};
