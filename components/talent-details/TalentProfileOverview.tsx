"use client";

import { useTranslations, useLocale } from "next-intl";
import { useDisclosure } from "@heroui/modal";
import { User } from "@/types/api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUploadSingle } from "@/hooks/api/useUpload";
import { useProfileStatus, useUpdatePictures } from "@/hooks/api/useProfile";
import { getCroppedImg } from "@/utils/cropImage";
import { Area } from "react-easy-crop";
import { ImageCropModal } from "@/components/common/ImageCropModal";
import { useAuthStore } from "@/stores/useAuthStore";

// Sub-components
import { ProfileCover } from "./profile-overview/ProfileCover";
import { ProfileAvatar } from "./profile-overview/ProfileAvatar";
import { ProfileBio } from "./profile-overview/ProfileBio";
import { ProfileActions } from "./profile-overview/ProfileActions";
import { ProfileAbout } from "./profile-overview/ProfileAbout";

export const TalentProfileOverview = ({ talent }: { talent: User }) => {
  const t = useTranslations("TalentDetails");
  const locale = useLocale();
  const { user } = useAuthStore();
  const router = useRouter();

  // Disclosures
  const contactDisclosure = useDisclosure();
  const meetingDisclosure = useDisclosure();
  const profileCompleteDisclosure = useDisclosure();
  const cropDisclosure = useDisclosure();

  const { data: statusResponse } = useProfileStatus();
  const progress = statusResponse?.data?.progress || 0;

  const isOwnProfile = user?.id === talent?.id;

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [cropType, setCropType] = useState<"avatar" | "cover">("avatar");
  const [isProcessing, setIsProcessing] = useState(false);

  const { mutateAsync: uploadSingle } = useUploadSingle();
  const { mutateAsync: updatePictures } = useUpdatePictures();

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "avatar" | "cover",
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
        setCropType(type);
        cropDisclosure.onOpen();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = async (
    croppedAreaPixels: Area,
    rotation: number,
  ) => {
    if (!selectedImage) return;

    try {
      setIsProcessing(true);

      const croppedBlob = await getCroppedImg(
        selectedImage,
        croppedAreaPixels,
        rotation,
      );
      if (!croppedBlob) throw new Error("Failed to crop image");

      const file = new File(
        [croppedBlob],
        cropType === "avatar" ? "avatar.jpg" : "cover.jpg",
        {
          type: "image/jpeg",
        },
      );

      const uploadResponse = await uploadSingle({
        file,
        folder: cropType === "avatar" ? "avatars" : "covers",
      });
      const imageUrl = uploadResponse.data.url;

      await updatePictures({
        [cropType]: imageUrl,
      });

      router.refresh();

      cropDisclosure.onClose();
      setSelectedImage(null);
    } catch {
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray2 overflow-hidden mb-6 flex flex-col">
      <ProfileCover
        talent={talent}
        isOwnProfile={isOwnProfile}
        isProcessing={isProcessing}
        cropType={cropType}
        onFileChange={handleFileChange}
      />

      <div className="relative px-6 md:px-8 pb-8 flex flex-col pt-0">
        <ProfileAvatar
          talent={talent}
          isOwnProfile={isOwnProfile}
          isProcessing={isProcessing}
          cropType={cropType}
          onFileChange={handleFileChange}
        />

        <ProfileBio talent={talent} />

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
          onOpenChange={cropDisclosure.onOpenChange}
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
