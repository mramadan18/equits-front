"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Button, useDisclosure, Spinner } from "@heroui/react";
import { useImageUpload } from "@/hooks/ui/useImageUpload";
import { User } from "@/types/api";
import { Area } from "react-easy-crop";
import { FiCamera } from "react-icons/fi";
import { ImageCropModal } from "@/components/ui/ImageCropModal";

export const ProfileCover = ({ user }: { user: User | null }) => {
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

  const handleCameraButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleCropComplete = (croppedAreaPixels: Area, rotation: number) => {
    uploadAndSave(croppedAreaPixels, rotation, "cover");
  };

  return (
    <div className="h-32 w-full relative bg-gray2 group/cover">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={onFileChange}
      />

      {user?.cover && !imageError ? (
        <>
          <Image
            src={user.cover}
            alt={`${user.firstName} ${user.lastName}`}
            fill
            className="object-cover opacity-80"
            onError={() => setImageError(true)}
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/cover:opacity-100 transition-opacity" />
        </>
      ) : (
        <div className="w-full h-full bg-gradient-to-r from-[#A3D9FF] via-[#E2E8F0] to-[#D1D5DB] relative flex items-center justify-end pr-6 overflow-hidden" />
      )}

      <Button
        variant="light"
        color="primary"
        radius="full"
        onPress={handleCameraButtonClick}
        className="absolute top-3 right-3 bg-white/20 backdrop-blur-md hover:bg-white/40 transition-all shadow-lg z-20"
        isIconOnly
        isDisabled={isProcessing}
      >
        {isProcessing ? (
          <Spinner size="sm" color="white" />
        ) : (
          <FiCamera size={24} />
        )}
      </Button>

      {selectedImage && (
        <ImageCropModal
          isOpen={isOpen}
          onOpenChange={() => {
            onOpenChange();
            cancelSelection();
          }}
          image={selectedImage}
          onCropComplete={handleCropComplete}
          aspectRatio={16 / 9}
          cropSize={{ width: 435, height: 128 }}
          isLoading={isProcessing}
        />
      )}
    </div>
  );
};
