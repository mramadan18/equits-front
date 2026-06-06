"use client";

import { Suspense } from "react";
import { Button, Input, Spinner, Card } from "@heroui/react";
import { IoSearchOutline } from "react-icons/io5";
import { useInterestsController } from "@/hooks/ui/useInterestsController";
import { StaggerContainer, StaggerItem } from "@/components/ui/animations";

function InterestsForm() {
  const {
    t,
    isLoading,
    isUpdating,
    selectedIds,
    searchQuery,
    setSearchQuery,
    filteredIndustries,
    toggleInterest,
    handleSave,
    handleSkip,
  } = useInterestsController();

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] w-full items-center justify-center">
        <Spinner size="lg" color="primary" label={t("searchPlaceholder")} />
      </div>
    );
  }

  return (
    <div className="container py-8 lg:py-16 flex flex-col items-center justify-center min-h-[85vh]">
      <StaggerContainer delay={0.1} className="w-full max-w-3xl">
        <Card className="p-6 md:p-10 shadow-card bg-white/80 dark:bg-dark2/80 backdrop-blur-md border border-default-100 dark:border-default-50">
          {/* Header */}
          <StaggerItem className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-dark dark:text-white mb-3">
              {t("title")}
            </h1>
            <p className="text-gray2 dark:text-gray-400 max-w-xl mx-auto text-base">
              {t("subtitle")}
            </p>
          </StaggerItem>

          {/* Search bar */}
          <StaggerItem className="mb-6">
            <Input
              value={searchQuery}
              onValueChange={setSearchQuery}
              placeholder={t("searchPlaceholder")}
              radius="full"
              variant="bordered"
              classNames={{
                inputWrapper:
                  "h-12 bg-transparent border-2 border-default-200 hover:border-primary focus-within:border-primary shadow-sm transition-colors",
                input: "text-base px-2",
              }}
              endContent={
                <div className="flex items-center h-full px-2 text-default-400">
                  <IoSearchOutline className="text-xl" />
                </div>
              }
            />
          </StaggerItem>

          {/* Grid Selection */}
          <StaggerItem className="mb-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[40vh] overflow-y-auto pr-2 pb-4 scrollbar-thin scrollbar-thumb-default-200">
              {filteredIndustries.map((industry) => {
                const isSelected = selectedIds.includes(industry.id);
                return (
                  <Button
                    key={industry.id}
                    variant="light"
                    onPress={() => toggleInterest(industry.id)}
                    className={`relative p-4 rounded-2xl border-2 text-start h-28 cursor-pointer ${
                      isSelected
                        ? "border-primary bg-primary-50/10 text-primary dark:border-primary dark:bg-primary-900/20 dark:text-primary-200"
                        : "border-default-200 hover:border-primary/50 text-default-700 dark:text-default-300"
                    }`}
                  >
                    <span className="font-bold text-sm leading-snug line-clamp-2">
                      {industry.name}
                    </span>
                  </Button>
                );
              })}
            </div>
          </StaggerItem>

          {/* Action buttons */}
          <StaggerItem className="flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-default-100 pt-6">
            <Button
              variant="light"
              color="default"
              onPress={handleSkip}
              className="w-full sm:w-auto font-bold text-default-500"
            >
              {t("skip")}
            </Button>

            <Button
              color="primary"
              onPress={handleSave}
              isLoading={isUpdating}
              disabled={selectedIds.length === 0}
              className="w-full sm:w-auto px-8 py-6 font-bold shadow-md bg-primary hover:bg-primary-600 text-white rounded-full transition-all"
            >
              {t("submit")}
            </Button>
          </StaggerItem>
        </Card>
      </StaggerContainer>
    </div>
  );
}

export default function InterestsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[70vh] w-full items-center justify-center">
          <Spinner size="lg" color="primary" />
        </div>
      }
    >
      <InterestsForm />
    </Suspense>
  );
}
