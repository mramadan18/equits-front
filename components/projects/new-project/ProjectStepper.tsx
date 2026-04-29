"use client";

import { ProjectStep } from "@/types/project";

interface ProjectStepperProps {
  step: ProjectStep;
}

export const ProjectStepper = ({ step }: ProjectStepperProps) => {
  return (
    <div className="flex items-center justify-between mb-12 relative px-4">
      {[1, 2, 3, 4].map((itemStep) => {
        const currentStep = itemStep as ProjectStep;

        return (
          <div
            key={currentStep}
            className="flex-1 flex items-center last:flex-none"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm z-10 ${
                step >= currentStep
                  ? "bg-primary text-white"
                  : "border-2 border-gray-300 text-gray-400 bg-white"
              }`}
            >
              {step > currentStep ? "✓" : currentStep}
            </div>
            {currentStep < 4 && (
              <div
                className={`flex-1 h-0.5 mx-0 ${
                  step > currentStep ? "bg-primary" : "bg-gray-300"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
