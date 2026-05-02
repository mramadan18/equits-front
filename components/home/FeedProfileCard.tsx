"use client";

import { Modal, useDisclosure } from "@heroui/modal";
import { useAuthStore } from "@/stores/useAuthStore";
import { useProfileStatus } from "@/hooks/api/useProfile";
import { CompleteProfileModal } from "./CompleteProfileModal";
import { ProfileCover } from "./FeedProfileCard/ProfileCover";
import { ProfileAvatar } from "./FeedProfileCard/ProfileAvatar";
import { ProfileInfo } from "./FeedProfileCard/ProfileInfo";
import { ProfileDetails } from "./FeedProfileCard/ProfileDetails";
import { ProfileCompletion } from "./FeedProfileCard/ProfileCompletion";

export const FeedProfileCard = () => {
  const { user } = useAuthStore();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data: statusResponse } = useProfileStatus();
  const progress = statusResponse?.data?.progress || 0;

  return (
    <div className="bg-white rounded-2xl border border-gray2 overflow-hidden shadow-sm">
      <ProfileCover user={user} />

      <div className="px-5 py-2 pb-4 relative">
        <div className="flex items-end gap-4 mb-5">
          <ProfileAvatar user={user} />
          <ProfileInfo user={user} />
        </div>

        <ProfileDetails user={user} />

        <ProfileCompletion progress={progress} onOpen={onOpen} />
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="4xl">
        <CompleteProfileModal />
      </Modal>
    </div>
  );
};
