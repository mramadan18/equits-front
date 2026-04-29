"use client";

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
import { useSearchParams } from "next/navigation";
import {
  useUpdateProjectStep,
  useSubmitProject,
  useProject,
} from "@/hooks/api/useProject";
import { useRouter } from "@/i18n/navigation";
import { MainRoutes } from "@/types";
import { addToast } from "@heroui/toast";

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
  const projectId = id || searchParams.get("id");
  const router = useRouter();

  const { data: projectData, isLoading: isLoadingProject } = useProject(
    projectId as string,
  );
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

      const formData: Partial<ProjectFormData> = {
        title: project.title || "",
        tagline: project.tagline || "",
        logo: project.logo || "",
        cover: project.cover || "",
        elevatorPitch: project.elevatorPitch || "",
        videoUrl: project.videoUrl || "",
        projectUrl: project.projectUrl || "",
        linkedinUrl: project.linkedinUrl || "",
        facebookUrl: project.facebookUrl || "",
        instagramUrl: project.instagramUrl || "",
        youtubeUrl: project.youtubeUrl || "",
        universityId: project.universityId,
        facultyId: project.facultyId,
        isAcademic: project.isAcademic,

        industryId: project.industryId,
        subIndustryIds: project.subIndustries?.map((s) => s.id) || [],
        projectTypes: (project.projectTypes as any) || [],
        stage: (project.stage as any) || "",
        revenueModel: (project.revenueModel as any) || "",
        marketFocus: (project.marketFocus as any) || "",
        problem: project.problem || "",
        solution: project.solution || "",
        valueProp: project.valueProp || "",

        currentTraction: (project.currentTraction as any) || "",
        growthRate: (project.growthRate as any) || "",
        totalUsers: project.totalUsers ? Number(project.totalUsers) : null,
        dailyActiveUsers: project.dailyActiveUsers
          ? Number(project.dailyActiveUsers)
          : null,
        monthlyRevenue: project.monthlyRevenue
          ? Number(project.monthlyRevenue)
          : null,
        growthRatePct: project.growthRatePct
          ? Number(project.growthRatePct)
          : null,
        retentionRate: project.retentionRate
          ? Number(project.retentionRate)
          : null,
        conversionRate: project.conversionRate
          ? Number(project.conversionRate)
          : null,

        fundingStage: (project.fundingStage as any) || "",
        serviceArea: (project.serviceArea as any) || "",
        fundingAsk: project.fundingAsk ? Number(project.fundingAsk) : null,
        equityStake: project.equityStake ? Number(project.equityStake) : null,
        useOfFunds: project.useOfFunds || "",
        businessPlanUrl: project.businessPlanUrl || "",
      };

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
        const values = getValues();

        const filteredValues = Object.fromEntries(
          Object.entries(values).filter(
            ([_, value]) =>
              value !== null && value !== "" && value?.length !== 0,
          ),
        );
        const trimmedValues = Object.fromEntries(
          Object.entries(filteredValues).map(([key, value]) => [
            key,
            typeof value === "string" ? value.trim() : value,
          ]),
        );

        await updateStep({
          id: projectId,
          step,
          data: trimmedValues,
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

        const filteredValues = Object.fromEntries(
          Object.entries(values).filter(
            ([_, value]) =>
              value !== null && value !== "" && value?.length !== 0,
          ),
        );

        const trimmedValues = Object.fromEntries(
          Object.entries(filteredValues).map(([key, value]) => [
            key,
            typeof value === "string" ? value.trim() : value,
          ]),
        );

        // Save the last step first
        await updateStep({
          id: projectId,
          step: 4,
          data: trimmedValues,
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
    isLoading: isLoadingProject,
  };
};
