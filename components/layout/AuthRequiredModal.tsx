"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Button,
} from "@heroui/react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { AuthRoutes } from "@/types";
import { LuUserPlus, LuLogIn } from "react-icons/lu";

interface AuthRequiredModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export const AuthRequiredModal = ({
  isOpen,
  onOpenChange,
}: AuthRequiredModalProps) => {
  const t = useTranslations("Navbar");

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="md"
      backdrop="blur"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col items-center gap-1 pt-10 px-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                <LuUserPlus size={32} />
              </div>
              <h2 className="text-2xl font-bold text-dark">
                {t("AuthRequiredModal.title")}
              </h2>
            </ModalHeader>
            <ModalBody className="pb-10 px-8 text-center">
              <p className="text-gray-500 mb-8 leading-relaxed">
                {t("AuthRequiredModal.description")}
              </p>
              <div className="flex flex-col gap-3">
                <Button
                  as={Link}
                  href={AuthRoutes.REGISTER}
                  color="primary"
                  className="font-bold h-12 rounded-xl"
                  onPress={onClose}
                  startContent={<LuUserPlus size={20} />}
                >
                  {t("AuthRequiredModal.register")}
                </Button>
                <Button
                  as={Link}
                  href={AuthRoutes.LOGIN}
                  variant="flat"
                  color="primary"
                  className="font-bold h-12 rounded-xl"
                  onPress={onClose}
                  startContent={<LuLogIn size={20} />}
                >
                  {t("AuthRequiredModal.login")}
                </Button>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
