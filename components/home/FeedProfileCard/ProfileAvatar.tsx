"use client";

import { useRef, useEffect } from "react";
import { FiCamera } from "react-icons/fi";
import { User } from "@/types/api";
import { useDisclosure, Spinner, Avatar } from "@heroui/react";
import { Area } from "react-easy-crop";
import { ImageCropModal } from "@/components/common/ImageCropModal";
import { useImageUpload } from "@/hooks/ui/useImageUpload";

export const ProfileAvatar = ({ user }: { user: User | null }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  return (
    <div className="-mt-12 relative z-10 w-24 h-24 flex-shrink-0 rounded-full border-4 border-white bg-gray-100 overflow-hidden shadow-sm group/avatar">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={onFileChange}
      />

      <div
        className="relative w-full h-full cursor-pointer"
        onClick={handleAvatarClick}
      >
        <Avatar
          showFallback
          color="primary"
          src={`${user?.avatar}`}
          alt={`${user?.firstName} ${user?.lastName}`}
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity">
          {isProcessing ? (
            <Spinner size="sm" color="white" />
          ) : (
            <FiCamera size={24} className="text-white" />
          )}
        </div>
      </div>

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
