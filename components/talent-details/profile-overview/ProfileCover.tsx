"use client";

import Image from "next/image";
import { Button, Spinner } from "@heroui/react";
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
    <div className="h-52 md:h-72 w-full relative group/cover">
      {talent?.cover ? (
        <Image
          src={`${talent.cover}`}
          alt={`${talent.firstName} ${talent.lastName}`}
          fill
          className="object-cover transition-transform duration-700 group-hover/cover:scale-[1.02]"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-primary/60" />
      )}
      {/* Multi-layer gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

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
            className="absolute top-4 end-4 bg-white/15 backdrop-blur-xl hover:bg-white/30 transition-all duration-300 shadow-lg z-20 border border-white/20 text-white opacity-0 group-hover/cover:opacity-100"
            isIconOnly
            isDisabled={isProcessing && cropType === "cover"}
          >
            {isProcessing && cropType === "cover" ? (
              <Spinner size="sm" color="white" />
            ) : (
              <FiCamera size={20} />
            )}
          </Button>
        </>
      )}
    </div>
  );
};
