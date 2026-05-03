"use client";

import { Skeleton } from "@heroui/skeleton";
import { Modal, useDisclosure } from "@heroui/modal";
import { useAuthStore } from "@/stores/useAuthStore";
import { useProfileStatus } from "@/hooks/api/useProfile";
import { CompleteProfileModal } from "./CompleteProfileModal";
import { ProfileCover } from "./FeedProfileCard/ProfileCover";
import { ProfileAvatar } from "./FeedProfileCard/ProfileAvatar";
import { ProfileInfo } from "./FeedProfileCard/ProfileInfo";
import { ProfileDetails } from "./FeedProfileCard/ProfileDetails";
import { ProfileCompletion } from "./FeedProfileCard/ProfileCompletion";

export const FeedProfileCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray2 overflow-hidden shadow-sm">
      <Skeleton className="h-32 w-full" />
      <div className="px-5 py-2 pb-4 relative">
        <div className="flex items-end gap-4 mb-5">
          <Skeleton className="-mt-12 w-24 h-24 rounded-full border-4 border-white flex-shrink-0" />
          <div className="flex-1 flex flex-col gap-2 pb-1">
            <Skeleton className="h-6 w-3/4 rounded-lg" />
            <Skeleton className="h-4 w-1/2 rounded-lg" />
          </div>
        </div>
        <div className="flex flex-col gap-3 mb-6">
          <div className="flex items-center gap-3">
            <Skeleton className="w-5 h-5 rounded-md" />
            <Skeleton className="h-4 w-5/6 rounded-lg" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="w-5 h-5 rounded-md" />
            <Skeleton className="h-4 w-2/3 rounded-lg" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center mb-1">
            <Skeleton className="h-4 w-1/4 rounded-lg" />
            <Skeleton className="h-4 w-12 rounded-lg" />
          </div>
          <Skeleton className="h-2 w-full rounded-full" />
        </div>
      </div>
    </div>
  );
};

export const FeedProfileCard = () => {
  const { user } = useAuthStore();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data: statusResponse, isLoading } = useProfileStatus();
  const progress = statusResponse?.data?.progress || 0;

  if (isLoading) {
    return <FeedProfileCardSkeleton />;
  }

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
