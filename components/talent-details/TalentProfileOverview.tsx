"use client";

import { useTranslations, useLocale } from "next-intl";
import { User } from "@/types/api";
import { ImageCropModal } from "@/components/common/ImageCropModal";
import { useTalentProfileController } from "@/hooks/ui/useTalentProfileController";

// Sub-components
import { ProfileCover } from "./profile-overview/ProfileCover";
import { ProfileAvatar } from "./profile-overview/ProfileAvatar";
import { ProfileBio } from "./profile-overview/ProfileBio";
import { ProfileActions } from "./profile-overview/ProfileActions";
import { ProfileAbout } from "./profile-overview/ProfileAbout";

export const TalentProfileOverview = ({ talent }: { talent: User }) => {
  const t = useTranslations("TalentDetails");
  const locale = useLocale();
  const {
    isOwnProfile,
    progress,
    cropType,
    selectedImage,
    isProcessing,
    contactDisclosure,
    meetingDisclosure,
    profileCompleteDisclosure,
    cropDisclosure,
    onFileChange,
    handleCropComplete,
    handleCropClose,
  } = useTalentProfileController(talent);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray2 overflow-hidden mb-6 flex flex-col">
      <ProfileCover
        talent={talent}
        isOwnProfile={isOwnProfile}
        isProcessing={isProcessing}
        cropType={cropType}
        onFileChange={onFileChange}
      />

      <div className="relative px-6 md:px-8 pb-8 flex flex-col pt-0">
        <ProfileAvatar
          talent={talent}
          isOwnProfile={isOwnProfile}
          isProcessing={isProcessing}
          cropType={cropType}
          onFileChange={onFileChange}
        />

        <ProfileBio talent={talent} isOwnProfile={isOwnProfile} />

        <ProfileActions
          talent={talent}
          isOwnProfile={isOwnProfile}
          locale={locale}
          t={t}
          isContactOpen={contactDisclosure.isOpen}
          onContactOpenChange={contactDisclosure.onOpenChange}
          isMeetingOpen={meetingDisclosure.isOpen}
          onMeetingOpenChange={meetingDisclosure.onOpenChange}
          isProfileCompleteOpen={profileCompleteDisclosure.isOpen}
          onProfileCompleteOpenChange={profileCompleteDisclosure.onOpenChange}
          onMeetingOpen={meetingDisclosure.onOpen}
          onContactOpen={contactDisclosure.onOpen}
          onProfileCompleteOpen={profileCompleteDisclosure.onOpen}
          progress={progress}
        />

        <ProfileAbout talent={talent} t={t} />
      </div>

      {selectedImage && (
        <ImageCropModal
          isOpen={cropDisclosure.isOpen}
          onOpenChange={handleCropClose}
          image={selectedImage}
          onCropComplete={handleCropComplete}
          aspectRatio={cropType === "avatar" ? 1 / 1 : 16 / 9}
          cropSize={
            cropType === "avatar"
              ? { width: 300, height: 300 }
              : { width: 435, height: 128 }
          }
          isLoading={isProcessing}
        />
      )}
    </div>
  );
};
