"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@heroui/react";
import { useState, useEffect } from "react";

interface ConfirmModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  isLoading?: boolean;
  confirmationText?: string;
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
  confirmationText,
  color = "danger",
}: ConfirmModalProps) => {
  const [inputValue, setInputValue] = useState("");

  // Reset input when modal closes
  useEffect(() => {
    if (!isOpen) {
      setInputValue("");
    }
  }, [isOpen]);

  const isConfirmDisabled =
    isLoading || (confirmationText ? inputValue !== confirmationText : false);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>{title}</ModalHeader>
            <ModalBody className="gap-4">
              <p className="text-default-600">{description}</p>
              {confirmationText && (
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-default-500 italic">
                    Please type{" "}
                    <span className="font-bold text-danger">
                      {confirmationText}
                    </span>{" "}
                    to confirm.
                  </p>
                  <Input
                    variant="bordered"
                    placeholder={confirmationText}
                    value={inputValue}
                    onValueChange={setInputValue}
                  />
                </div>
              )}
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose} isDisabled={isLoading}>
                {cancelLabel}
              </Button>
              <Button
                color={color}
                onPress={onConfirm}
                isLoading={isLoading}
                isDisabled={isConfirmDisabled}
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
