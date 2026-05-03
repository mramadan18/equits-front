"use client";

import Image from "next/image";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import { FiCamera } from "react-icons/fi";
import { User } from "@/types/api";
import { useRef } from "react";

interface ProfileCoverProps {
  talent: User;
  isOwnProfile: boolean;
  isProcessing: boolean;
  cropType: "avatar" | "cover";
  onFileChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "avatar" | "cover",
  ) => void;
}

export const ProfileCover = ({
  talent,
  isOwnProfile,
  isProcessing,
  cropType,
  onFileChange,
}: ProfileCoverProps) => {
  const coverInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="h-48 md:h-64 w-full relative">
      {talent?.cover && (
        <Image
          src={`${talent.cover}`}
          alt={`${talent.firstName} ${talent.lastName}`}
          fill
          className="object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

      {isOwnProfile && (
        <>
          <input
            type="file"
            ref={coverInputRef}
            className="hidden"
            accept="image/*"
            onChange={(e) => onFileChange(e, "cover")}
          />
          <Button
            variant="light"
            color="primary"
            radius="full"
            onPress={() => coverInputRef.current?.click()}
            className="absolute top-3 right-3 bg-white/20 backdrop-blur-md hover:bg-white/40 transition-all shadow-lg z-20"
            isIconOnly
            isDisabled={isProcessing && cropType === "cover"}
          >
            {isProcessing && cropType === "cover" ? (
              <Spinner size="sm" color="white" />
            ) : (
              <FiCamera size={24} />
            )}
          </Button>
        </>
      )}
    </div>
  );
};
