"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { FiCamera } from "react-icons/fi";
import { useTranslations } from "next-intl";
import { User } from "@/types/api";
import { useDisclosure, Spinner } from "@heroui/react";
import { Area } from "react-easy-crop";
import { ImageCropModal } from "@/components/common/ImageCropModal";
import { useImageUpload } from "@/hooks/ui/useImageUpload";

export const ProfileAvatar = ({ user }: { user: User | null }) => {
  const t = useTranslations("FeedProfileCard");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageError, setImageError] = useState(false);

  const {
    selectedImage,
    isProcessing,
    handleFileChange,
    uploadAndSave,
    cancelSelection,
  } = useImageUpload({
    onSuccess: () => onOpenChange(),
  });

  // Open modal when image is selected
  useEffect(() => {
    if (selectedImage) {
      onOpen();
    }
  }, [selectedImage, onOpen]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(e);
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleCropComplete = (croppedAreaPixels: Area, rotation: number) => {
    uploadAndSave(croppedAreaPixels, rotation, "avatar");
  };

  const initials = `${user?.firstName?.charAt(0) || ""}${
    user?.lastName?.charAt(0) || ""
  }`.toUpperCase();

  return (
    <div className="-mt-12 relative z-10 w-24 h-24 flex-shrink-0 rounded-full border-4 border-white bg-gray-100 overflow-hidden shadow-sm group/avatar">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={onFileChange}
      />

      {user?.avatar && !imageError ? (
        <div
          className="relative w-full h-full cursor-pointer"
          onClick={handleAvatarClick}
        >
          <Image
            src={user.avatar}
            alt={`${user.firstName} ${user.lastName}`}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity">
            {isProcessing ? (
              <Spinner size="sm" color="white" />
            ) : (
              <FiCamera size={24} className="text-white" />
            )}
          </div>
        </div>
      ) : (
        <div
          className="relative flex items-center justify-center w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 text-white font-bold text-2xl uppercase cursor-pointer"
          onClick={handleAvatarClick}
        >
          {initials || <FiCamera size={24} className="text-[#A0A0A0]" />}
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity text-white">
            {isProcessing ? (
              <Spinner size="sm" color="white" />
            ) : (
              <>
                <FiCamera size={20} className="mb-1" />
                <span className="text-[10px] normal-case font-medium">
                  {t("addAvatar")}
                </span>
              </>
            )}
          </div>
        </div>
      )}

      {selectedImage && (
        <ImageCropModal
          isOpen={isOpen}
          onOpenChange={() => {
            onOpenChange();
            cancelSelection();
          }}
          image={selectedImage}
          onCropComplete={handleCropComplete}
          aspectRatio={1 / 1}
          cropSize={{ width: 300, height: 300 }}
          isLoading={isProcessing}
        />
      )}
    </div>
  );
};
