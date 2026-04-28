"use client";

import { useEffect, useState } from "react";
import apiClient from "@/services/api-client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  initialStep1Form,
  initialStep2Form,
  initialStep3Form,
  initialStep4Form,
} from "./constants";
import { PitchStep } from "./types";
import {
  validateStep1,
  validateStep2,
  validateStep3,
  validateStep4,
} from "@/validations/pitch.validation";

const toNumber = (value: string) => {
  if (!value.trim()) {
    return undefined;
  }

  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
};

const getProjectIdFromResponse = (payload: any) => {
  if (payload?.data?.id) {
    return payload.data.id as number;
  }

  if (payload?.id) {
    return payload.id as number;
  }

  return undefined;
};

const getApiErrorMessage = (error: unknown) => {
  if (typeof error === "object" && error && "response" in error) {
    const response = (error as { response?: { data?: { message?: string } } })
      .response;
    const message = response?.data?.message;

    if (typeof message === "string") {
      return message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
};

export const usePitchWizard = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialProjectId = searchParams.get("projectId") ?? "";
  const initialStep = Number(searchParams.get("step") ?? "1");

  const [step, setStep] = useState<PitchStep>(
    Number.isFinite(initialStep) ? (initialStep as PitchStep) : 1,
  );
  const [projectId, setProjectId] = useState(initialProjectId);
  const [isAcademic, setIsAcademic] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [step1Form, setStep1Form] = useState(initialStep1Form);
  const [step2Form, setStep2Form] = useState(initialStep2Form);
  const [step3Form, setStep3Form] = useState(initialStep3Form);
  const [step4Form, setStep4Form] = useState(initialStep4Form);

  useEffect(() => {
    const queryStep = Number(searchParams.get("step") ?? "1");
    setStep(Number.isFinite(queryStep) ? (queryStep as PitchStep) : 1);
    setProjectId(searchParams.get("projectId") ?? "");
  }, [searchParams]);

  const setWizardUrl = (nextProjectId: string, nextStep: PitchStep) => {
    const params = new URLSearchParams(searchParams.toString());

    if (nextProjectId) {
      params.set("projectId", nextProjectId);
    } else {
      params.delete("projectId");
    }

    params.set("step", String(nextStep));

    const nextUrl = params.toString()
      ? `${pathname}?${params.toString()}`
      : pathname;
    router.replace(nextUrl, { scroll: false });
  };

  const saveStep = async (currentStep: PitchStep) => {
    setIsSaving(true);
    setErrorMessage("");

    try {
      if (currentStep === 1) {
        const validation = validateStep1(step1Form);
        if (!validation.success) {
          setErrorMessage(
            validation.error.issues[0]?.message ?? "Validation failed",
          );
          setIsSaving(false);
          throw new Error("Validation failed");
        }
        const payload = {
          title: step1Form.title.trim(),
          tagline: step1Form.tagline.trim(),
          logo: step1Form.logo.trim() || undefined,
          cover: step1Form.cover.trim(),
          elevatorPitch: step1Form.elevatorPitch.trim(),
          videoUrl: step1Form.videoUrl.trim() || undefined,
          projectUrl: step1Form.projectUrl.trim() || undefined,
          isAcademic,
          universityId: isAcademic
            ? toNumber(step1Form.universityId)
            : undefined,
          facultyId: isAcademic ? toNumber(step1Form.facultyId) : undefined,
          facebookUrl: step1Form.facebookUrl.trim() || undefined,
          instagramUrl: step1Form.instagramUrl.trim() || undefined,
          linkedinUrl: step1Form.linkedinUrl.trim() || undefined,
          youtubeUrl: step1Form.youtubeUrl.trim() || undefined,
        };

        if (!projectId) {
          const response = await apiClient.post("/projects", payload);
          const createdProjectId = getProjectIdFromResponse(response.data);

          if (!createdProjectId) {
            throw new Error("Project was created but no id was returned.");
          }

          const nextProjectId = String(createdProjectId);
          setProjectId(nextProjectId);
          setWizardUrl(nextProjectId, 2);
          setStep(2);
          return;
        }

        await apiClient.patch(`/projects/${projectId}?step=1`, payload);
        setWizardUrl(projectId, 2);
        setStep(2);
        return;
      }

      if (!projectId) {
        throw new Error(
          "A project draft must be created before saving this step.",
        );
      }

      if (currentStep === 2) {
        const validation = validateStep2(step2Form);
        if (!validation.success) {
          setErrorMessage(
            validation.error.issues[0]?.message ?? "Validation failed",
          );
          setIsSaving(false);
          throw new Error("Validation failed");
        }
        await apiClient.patch(`/projects/${projectId}?step=2`, {
          industryId: toNumber(step2Form.industryId),
          subIndustryIds: toNumber(step2Form.subIndustryId)
            ? [toNumber(step2Form.subIndustryId)]
            : [],
          projectTypes: step2Form.projectType ? [step2Form.projectType] : [],
          stage: step2Form.stage,
          revenueModel: step2Form.revenueModel,
          marketFocus: step2Form.marketFocus,
          problem: step2Form.problem.trim(),
          solution: step2Form.solution.trim(),
          valueProp: step2Form.valueProp.trim(),
        });

        setWizardUrl(projectId, 3);
        setStep(3);
        return;
      }

      if (currentStep === 3) {
        const validation = validateStep3(step3Form);
        if (!validation.success) {
          setErrorMessage(
            validation.error.issues[0]?.message ?? "Validation failed",
          );
          setIsSaving(false);
          throw new Error("Validation failed");
        }
        await apiClient.patch(`/projects/${projectId}?step=3`, {
          currentTraction: step3Form.currentTraction,
          growthRate: step3Form.growthRate || undefined,
          totalUsers: toNumber(step3Form.totalUsers),
          dailyActiveUsers: toNumber(step3Form.dailyActiveUsers),
          monthlyRevenue: toNumber(step3Form.monthlyRevenue),
          growthRatePct: toNumber(step3Form.growthRatePct),
          retentionRate: toNumber(step3Form.retentionRate),
          conversionRate: toNumber(step3Form.conversionRate),
        });

        setWizardUrl(projectId, 4);
        setStep(4);
        return;
      }

      if (currentStep === 4) {
        const validation = validateStep4(step4Form);
        if (!validation.success) {
          setErrorMessage(
            validation.error.issues[0]?.message ?? "Validation failed",
          );
          setIsSaving(false);
          throw new Error("Validation failed");
        }
        await apiClient.patch(`/projects/${projectId}?step=4`, {
          fundingStage: step4Form.fundingStage,
          serviceArea: step4Form.serviceArea,
          fundingAsk: toNumber(step4Form.fundingAsk),
          equityStake: toNumber(step4Form.equityStake),
          useOfFunds: step4Form.useOfFunds.trim(),
          businessPlanUrl: step4Form.businessPlanUrl.trim() || undefined,
        });

        await apiClient.post(`/projects/${projectId}/submit`);
        setWizardUrl(projectId, 4);
      }
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error));
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  const handleNext = async () => {
    await saveStep(step);
  };

  const handlePublish = async () => {
    await saveStep(4);
  };

  const goBack = () => {
    setStep((current) => Math.max(1, current - 1) as PitchStep);
  };

  return {
    step,
    projectId,
    isAcademic,
    setIsAcademic,
    isSaving,
    errorMessage,
    step1Form,
    setStep1Form,
    step2Form,
    setStep2Form,
    step3Form,
    setStep3Form,
    step4Form,
    setStep4Form,
    handleNext,
    handlePublish,
    goBack,
  };
};
