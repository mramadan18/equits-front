"use client";

import { Button } from "@heroui/button";
import { PitchStepper } from "./PitchStepper";
import { ProjectBasicsStep } from "./steps/ProjectBasicsStep";
import { ProjectMarketStep } from "./steps/ProjectMarketStep";
import { ProjectTractionStep } from "./steps/ProjectTractionStep";
import { ProjectFundingStep } from "./steps/ProjectFundingStep";
import { usePitchWizard } from "./usePitchWizard";

export const PitchWizard = () => {
  const {
    step,
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
  } = usePitchWizard();

  return (
    <div className="container max-w-6xl py-12 px-4">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-primary/70">
          Project submission
        </p>
        <h1 className="mt-3 text-4xl font-bold text-primary sm:text-5xl">
          Pitch Your Project
        </h1>
        <p className="mt-4 text-sm text-default-500 sm:text-base">
          Save each step to keep a draft alive, then submit the finished project
          for approval.
        </p>
      </div>

      <PitchStepper step={step} />

      <div>
        {errorMessage && (
          <div className="mb-6 rounded-lg border border-danger/20 bg-danger/5 px-4 py-3 text-sm text-danger">
            {errorMessage}
          </div>
        )}

        {step === 1 && (
          <ProjectBasicsStep
            form={step1Form}
            setForm={setStep1Form}
            isAcademic={isAcademic}
            setIsAcademic={setIsAcademic}
          />
        )}

        {step === 2 && (
          <ProjectMarketStep form={step2Form} setForm={setStep2Form} />
        )}

        {step === 3 && (
          <ProjectTractionStep form={step3Form} setForm={setStep3Form} />
        )}

        {step === 4 && (
          <ProjectFundingStep form={step4Form} setForm={setStep4Form} />
        )}

        <div className="mt-8 flex justify-end gap-4">
          {step > 1 && (
            <Button
              variant="bordered"
              onPress={goBack}
              className="px-8 rounded-full border-gray-300 text-gray-600 font-medium"
              isDisabled={isSaving}
            >
              Back
            </Button>
          )}
          {step < 4 ? (
            <Button
              color="primary"
              onPress={handleNext}
              className="px-8 rounded-full font-bold"
              isLoading={isSaving}
            >
              Save & Continue
            </Button>
          ) : (
            <Button
              color="primary"
              onPress={handlePublish}
              className="px-8 rounded-full font-bold"
              isLoading={isSaving}
            >
              Submit for Approval
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
