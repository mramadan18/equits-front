"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@heroui/modal";
import { User } from "@/types/api";
import { useAuthStore } from "@/stores/useAuthStore";
import { useProfileStatus } from "@/hooks/api/useProfile";
import { useImageUpload } from "@/hooks/ui/useImageUpload";

export const useTalentProfileController = (talent: User) => {
  const { user } = useAuthStore();
  const router = useRouter();

  // Disclosures
  const contactDisclosure = useDisclosure();
  const meetingDisclosure = useDisclosure();
  const profileCompleteDisclosure = useDisclosure();
  const cropDisclosure = useDisclosure();

  const isOwnProfile = user?.id === talent?.id;
  const { data: statusResponse } = useProfileStatus(isOwnProfile);
  const progress = statusResponse?.data?.progress || 0;

  const [cropType, setCropType] = useState<"avatar" | "cover">("avatar");

  const {
    selectedImage,
    isProcessing,
    handleFileChange,
    uploadAndSave,
    cancelSelection,
  } = useImageUpload({
    onSuccess: () => {
      cropDisclosure.onClose();
      router.refresh();
    },
  });

  // Open modal when image is selected
  useEffect(() => {
    if (selectedImage) {
      cropDisclosure.onOpen();
    }
  }, [selectedImage, cropDisclosure]);

  const onFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "avatar" | "cover",
  ) => {
    setCropType(type);
    handleFileChange(e);
  };

  const handleCropComplete = (croppedAreaPixels: any, rotation: number) => {
    uploadAndSave(croppedAreaPixels, rotation, cropType);
  };

  const handleCropClose = () => {
    cropDisclosure.onOpenChange();
    cancelSelection();
  };

  return {
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
  };
};
