import { useState, useMemo, useEffect } from "react";
import {
  initialStep1Form,
  initialStep2Form,
  initialStep3Form,
  initialStep4Form,
} from "@/components/projects/new-project/constants";
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
import {
  useUpdateProjectStep,
  useSubmitProject,
  useProject,
} from "@/hooks/api/useProject";
import { useRouter, useSearchParams } from "next/navigation";
import { MainRoutes } from "@/types";
import { addToast } from "@heroui/react";
import {
  mapProjectToFormData,
  prepareProjectDataForSubmit,
} from "@/utils/projectMapper";

export const useProjectWizard = (id?: string) => {
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
  const [projectId, setProjectId] = useState<string | null>(
    id || searchParams.get("id") || null,
  );
  const router = useRouter();

  useEffect(() => {
    const urlId = searchParams.get("id");
    if (!urlId && !id) {
      router.replace(MainRoutes.HOME);
      return;
    }

    if (urlId && urlId !== projectId) {
      setProjectId(urlId);
    }
  }, [searchParams, projectId, id, router]);

  const { data: projectData } = useProject(projectId as string);
  const [hasInitialized, setHasInitialized] = useState(false);

  const { mutateAsync: updateStep, isPending: isUpdating } =
    useUpdateProjectStep();
  const { mutateAsync: submitProject, isPending: isSubmitting } =
    useSubmitProject();

  const { setValue, trigger, control, getValues } = useForm<ProjectFormData>({
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

  useEffect(() => {
    if (projectData?.data && !hasInitialized) {
      const project = projectData.data;
      const formData = mapProjectToFormData(project);

      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          setValue(key as any, value);
        }
      });

      if (project.currentStep !== undefined) {
        const nextStep = Math.min(project.currentStep + 1, 4) as ProjectStep;
        setStep(nextStep);
      }

      setHasInitialized(true);
    }
  }, [projectData, setValue, hasInitialized]);

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
        const data = prepareProjectDataForSubmit(getValues());

        await updateStep({
          id: projectId,
          step,
          data,
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
        const data = prepareProjectDataForSubmit(getValues());

        // Save the last step first
        await updateStep({
          id: projectId,
          step: 4,
          data,
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
