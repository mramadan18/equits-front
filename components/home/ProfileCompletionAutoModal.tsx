"use client";

import { useEffect } from "react";
import { Modal, useDisclosure } from "@heroui/react";
import {
  useProfileStatus,
  useDismissProfileStatusModal,
} from "@/hooks/api/useProfile";
import { CompleteProfileModal } from "./CompleteProfileModal";

export const ProfileCompletionAutoModal = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { data: statusResponse } = useProfileStatus();
  const { mutate: dismissModal } = useDismissProfileStatusModal();

  useEffect(() => {
    if (statusResponse?.data?.shouldShowModal) {
      onOpen();
    }
  }, [statusResponse, onOpen]);

  const handleClose = () => {
    dismissModal();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={(open) => {
        if (!open) handleClose();
        else onOpenChange();
      }}
      size="4xl"
    >
      <CompleteProfileModal />
    </Modal>
  );
};
