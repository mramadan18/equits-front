import React, { useRef, useState } from "react";
import Image from "next/image";
import { FiCamera } from "react-icons/fi";
import { useTranslations } from "next-intl";
import { User } from "@/types/api";
import { useDisclosure } from "@heroui/modal";
import { useUploadSingle } from "@/hooks/api/useUpload";
import { useUpdatePictures } from "@/hooks/api/useProfile";
import { getCroppedImg } from "@/utils/cropImage";
import { Spinner } from "@heroui/spinner";
import { Area } from "react-easy-crop";
import { ImageCropModal } from "@/components/common/ImageCropModal";

export const ProfileAvatar = ({ user }: { user: User | null }) => {
  const t = useTranslations("FeedProfileCard");
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

  const handleAvatarClick = () => {
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

      const file = new File([croppedBlob], "avatar.jpg", {
        type: "image/jpeg",
      });

      // 2. Upload to server
      const uploadResponse = await uploadSingle({ file, folder: "avatars" });
      const avatarUrl = uploadResponse.data.url;

      // 3. Update profile
      await updatePictures({ avatar: avatarUrl });

      onOpenChange();
      setSelectedImage(null);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error updating avatar:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="-mt-12 relative z-10 w-24 h-24 flex-shrink-0 rounded-full border-4 border-white bg-gray-100 overflow-hidden shadow-sm group/avatar">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />

      {user?.avatar ? (
        <div
          className="relative w-full h-full cursor-pointer"
          onClick={handleAvatarClick}
        >
          <Image
            src={user.avatar}
            alt={`${user.firstName} ${user.lastName}`}
            fill
            className="object-cover"
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
          className="relative flex items-center justify-center w-full h-full bg-[#555555] text-[#A0A0A0] font-bold text-2xl uppercase cursor-pointer"
          onClick={handleAvatarClick}
        >
          {user?.firstName?.charAt(0)}
          {user?.lastName?.charAt(0)}
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
          onOpenChange={onOpenChange}
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
