import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { ReactNode } from "react";
import { useTranslations } from "next-intl";

export interface BaseModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  onSubmit?: () => void;
  submitText?: string;
  cancelText?: string;
  isSubmitting?: boolean;
  size?:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "full";
  scrollBehavior?: "normal" | "inside" | "outside";
}

export function BaseModal({
  isOpen,
  onOpenChange,
  title,
  children,
  footer,
  onSubmit,
  submitText,
  cancelText,
  isSubmitting = false,
  size = "md",
  scrollBehavior = "normal",
}: BaseModalProps) {
  const t = useTranslations("common");

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size={size}
      scrollBehavior={scrollBehavior}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>{children}</ModalBody>
            <ModalFooter>
              {footer ? (
                footer
              ) : (
                <>
                  <Button color="danger" variant="light" onPress={onClose}>
                    {cancelText || t("cancel", { defaultValue: "Cancel" })}
                  </Button>
                  {onSubmit && (
                    <Button
                      color="primary"
                      onPress={onSubmit}
                      isLoading={isSubmitting}
                    >
                      {submitText || t("submit", { defaultValue: "Submit" })}
                    </Button>
                  )}
                </>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
