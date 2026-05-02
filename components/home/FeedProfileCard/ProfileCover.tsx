import React, { useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@heroui/button";
import { FiCamera } from "react-icons/fi";
import { User } from "@/types/api";
import { useDisclosure } from "@heroui/modal";
import { ImageCropModal } from "@/components/common/ImageCropModal";
import { useUploadSingle } from "@/hooks/api/useUpload";
import { useUpdatePictures } from "@/hooks/api/useProfile";
import { getCroppedImg } from "@/utils/cropImage";
import { Spinner } from "@heroui/spinner";
import { Area } from "react-easy-crop";

export const ProfileCover = ({ user }: { user: User | null }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const { mutateAsync: uploadSingle } = useUploadSingle();
  const { mutateAsync: updatePictures } = useUpdatePictures();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
        onOpen();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleCropComplete = async (
    croppedAreaPixels: Area,
    rotation: number,
  ) => {
    if (!selectedImage) return;

    try {
      setIsProcessing(true);

      // 1. Crop image
      const croppedBlob = await getCroppedImg(
        selectedImage,
        croppedAreaPixels,
        rotation,
      );
      if (!croppedBlob) throw new Error("Failed to crop image");

      const file = new File([croppedBlob], "cover.jpg", { type: "image/jpeg" });

      // 2. Upload to server
      const uploadResponse = await uploadSingle({ file, folder: "covers" });
      const coverUrl = uploadResponse.data.url;

      // 3. Update profile
      await updatePictures({ cover: coverUrl });

      onOpenChange();
      setSelectedImage(null);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error updating cover:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="h-32 w-full relative bg-gray2 group/cover">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />

      {user?.cover ? (
        <>
          <Image
            src={user.cover}
            alt={`${user.firstName} ${user.lastName}`}
            fill
            className="object-cover opacity-80"
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
        disabled={isProcessing}
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
          onOpenChange={onOpenChange}
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
