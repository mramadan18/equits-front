"use client";

import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal";
import { Button } from "@heroui/button";
import { useRouter } from "@/i18n/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";
import clsx from "clsx";
import { FiPlus, FiFileText } from "react-icons/fi";
import { MainRoutes } from "@/types";
import { User } from "@/types/api";

interface PitchModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  user: User | null;
}

export const PitchModal = ({ isOpen, onOpenChange, user }: PitchModalProps) => {
  const t = useTranslations("Navbar");
  const router = useRouter();
  const [pitchAction, setPitchAction] = useState<"new" | "existing">("new");

  const handlePitchContinue = () => {
    if (pitchAction === "new") {
      router.push(MainRoutes.NEW_PROJECT);
    } else {
      router.push(MainRoutes.DRAFT_PROJECTS);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="2xl"
      backdrop="blur"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 pt-8 px-8">
              <h2 className="text-xl font-bold text-dark">
                {t("PitchModal.title")}
              </h2>
              <p className="text-xs font-normal text-gray2">
                {t("PitchModal.description")}
              </p>
            </ModalHeader>
            <ModalBody className="pb-8 px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <button
                  className={clsx(
                    "flex flex-col items-start p-6 rounded-2xl border-2 transition-all text-start group",
                    pitchAction === "new"
                      ? "border-primary bg-primary/5 ring-1 ring-primary"
                      : "border-gray-100 hover:border-primary/50 bg-white",
                  )}
                  onClick={() => setPitchAction("new")}
                >
                  <div
                    className={clsx(
                      "w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors",
                      pitchAction === "new"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray2 group-hover:bg-primary/10 group-hover:text-primary",
                    )}
                  >
                    <FiPlus size={24} />
                  </div>
                  <h3 className="font-semibold text-lg mb-1">
                    {t("PitchModal.newProject.title")}
                  </h3>
                  <p className="text-xs text-gray2 leading-relaxed">
                    {t("PitchModal.newProject.description")}
                  </p>
                </button>

                <button
                  className={clsx(
                    "flex flex-col items-start p-6 rounded-2xl border-2 transition-all text-start group relative",
                    pitchAction === "existing"
                      ? "border-primary bg-primary/5 ring-1 ring-primary"
                      : "border-gray-100 hover:border-primary/50 bg-white",
                  )}
                  onClick={() => setPitchAction("existing")}
                >
                  <div
                    className={clsx(
                      "w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors",
                      pitchAction === "existing"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray2 group-hover:bg-primary/10 group-hover:text-primary",
                    )}
                  >
                    <FiFileText size={24} />
                  </div>
                  {user?.draftProjectsCount && user.draftProjectsCount > 0 && (
                    <span className="absolute top-6 right-6 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
                      {user.draftProjectsCount}
                    </span>
                  )}
                  <h3 className="font-semibold text-lg mb-1">
                    {t("PitchModal.continueProject.title")}
                  </h3>
                  <p className="text-xs text-gray2 leading-relaxed">
                    {t("PitchModal.continueProject.description", {
                      count: user?.draftProjectsCount || 0,
                    })}
                  </p>
                </button>
              </div>

              <div className="flex justify-end gap-3 mt-8">
                <Button
                  variant="flat"
                  className="rounded-full px-6"
                  onPress={onClose}
                >
                  {t("PitchModal.close")}
                </Button>
                <Button
                  color="primary"
                  className="rounded-full px-8 font-bold"
                  onPress={() => {
                    onClose();
                    handlePitchContinue();
                  }}
                >
                  {t("PitchModal.continue")}
                </Button>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
