"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";

interface ConfirmModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  isLoading?: boolean;
  color?:
    | "danger"
    | "primary"
    | "warning"
    | "default"
    | "secondary"
    | "success";
}

export const ConfirmModal = ({
  isOpen,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  isLoading = false,
  color = "danger",
}: ConfirmModalProps) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>{title}</ModalHeader>
            <ModalBody>
              <p className="text-default-600">{description}</p>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose} disabled={isLoading}>
                {cancelLabel}
              </Button>
              <Button
                color={color}
                onPress={onConfirm}
                isLoading={isLoading}
                className="font-semibold"
              >
                {confirmLabel}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
