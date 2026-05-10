import { useDisclosure } from "@heroui/react";
import { useCallback, useState } from "react";

export function useModalManager<T extends string>() {
  const [activeModal, setActiveModal] = useState<T | null>(null);

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const openModal = useCallback(
    (modalName: T) => {
      setActiveModal(modalName);
      onOpen();
    },
    [onOpen],
  );

  const closeModal = useCallback(() => {
    setActiveModal(null);
    onClose();
  }, [onClose]);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        setActiveModal(null);
      }
      onOpenChange();
    },
    [onOpenChange],
  );

  const isModalOpen = useCallback(
    (modalName: T) => {
      return isOpen && activeModal === modalName;
    },
    [isOpen, activeModal],
  );

  return {
    activeModal,
    isOpen,
    openModal,
    closeModal,
    onOpenChange: handleOpenChange,
    isModalOpen,
  };
}
