"use client";

import { Suspense } from "react";
import { Button, Input, Spinner } from "@heroui/react";
import { IoSearchOutline, IoCheckmarkCircle } from "react-icons/io5";
import { useInterestsController } from "@/hooks/ui/useInterestsController";
import { SettingsPageHeader } from "@/components/ui/SettingsPageHeader";
import { SettingsFormActions } from "@/components/ui/SettingsFormActions";

function InterestsSettingsForm() {
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
    handleCancel,
    isDirty,
  } = useInterestsController();

  if (isLoading) {
    return (
      <div className="flex h-[400px] w-full items-center justify-center">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-12">
      <SettingsPageHeader title={t("title")} description={t("subtitle")} />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
        className="flex flex-col gap-10"
      >
        {/* Search */}
        <Input
          value={searchQuery}
          onValueChange={setSearchQuery}
          placeholder={t("searchPlaceholder")}
          radius="sm"
          variant="bordered"
          size="lg"
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

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[50vh] overflow-y-auto pr-2 pb-4 scrollbar-thin scrollbar-thumb-default-200">
          {filteredIndustries.map((industry) => {
            const isSelected = selectedIds.includes(industry.id);
            return (
              <Button
                key={industry.id}
                variant="light"
                onPress={() => toggleInterest(industry.id)}
                className={`relative p-4 rounded-2xl border-2 text-start h-28 cursor-pointer flex flex-col justify-between items-start ${
                  isSelected
                    ? "border-primary bg-primary-50/10 text-primary dark:border-primary dark:bg-primary-900/20 dark:text-primary-200"
                    : "border-default-200 hover:border-primary/50 text-default-700 dark:text-default-300"
                }`}
              >
                <span className="font-bold text-sm leading-snug line-clamp-2">
                  {industry.name}
                </span>
                {isSelected && (
                  <IoCheckmarkCircle className="text-2xl text-primary self-end mt-auto" />
                )}
              </Button>
            );
          })}
        </div>

        <SettingsFormActions
          isPending={isUpdating}
          isDirty={isDirty}
          onCancel={handleCancel}
        />
      </form>
    </div>
  );
}

export default function InterestsSettingsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-[400px] w-full items-center justify-center">
          <Spinner size="lg" color="primary" />
        </div>
      }
    >
      <InterestsSettingsForm />
    </Suspense>
  );
}
