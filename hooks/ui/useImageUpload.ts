"use client";

import { useState } from "react";
import { Area } from "react-easy-crop";
import { getCroppedImg } from "@/utils/cropImage";
import { useUploadSingle } from "@/hooks/api/useUpload";
import { useUpdatePictures } from "@/hooks/api/useProfile";
import { addToast } from "@heroui/react";

interface UseImageUploadOptions {
  onSuccess?: () => void;
}

export const useImageUpload = ({ onSuccess }: UseImageUploadOptions = {}) => {
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
      };
      reader.readAsDataURL(file);
      return true;
    }
    return false;
  };

  const uploadAndSave = async (
    croppedAreaPixels: Area,
    rotation: number,
    type: "avatar" | "cover",
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

      const fileName = `${type}_${Date.now()}.jpg`;
      const file = new File([croppedBlob], fileName, {
        type: "image/jpeg",
      });

      // 2. Upload to server
      const folder = type === "avatar" ? "avatars" : "covers";
      const uploadResponse = await uploadSingle({ file, folder });
      const imageUrl = uploadResponse.data.url;

      // 3. Update profile
      await updatePictures({ [type]: imageUrl });

      addToast({
        title: "Successfully updated",
        color: "success",
      });

      setSelectedImage(null);
      onSuccess?.();
    } catch (error) {
      console.error(`Error updating ${type}:`, error);
      addToast({
        title: `Failed to update ${type}`,
        description: "Please try again later.",
        color: "danger",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const cancelSelection = () => {
    setSelectedImage(null);
  };

  return {
    selectedImage,
    isProcessing,
    handleFileChange,
    uploadAndSave,
    cancelSelection,
  };
};
