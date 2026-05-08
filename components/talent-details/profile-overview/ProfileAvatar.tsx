"use client";

import { Avatar, Button, Spinner } from "@heroui/react";
import { FiCamera } from "react-icons/fi";
import { User } from "@/types/api";
import { useRef } from "react";

interface ProfileAvatarProps {
  talent: User;
  isOwnProfile: boolean;
  isProcessing: boolean;
  cropType: "avatar" | "cover";
  onFileChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "avatar" | "cover",
  ) => void;
}

export const ProfileAvatar = ({
  talent,
  isOwnProfile,
  isProcessing,
  cropType,
  onFileChange,
}: ProfileAvatarProps) => {
  const avatarInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="absolute -top-16 md:-top-20 start-6 md:start-8 w-32 h-32 md:w-40 md:h-40 z-10 flex-shrink-0 group/avatar">
      {/* Glow ring */}
      <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary via-primary/60 to-secondary opacity-60 blur-sm group-hover/avatar:opacity-80 transition-opacity duration-500" />
      {/* Avatar container */}
      <div className="relative w-full h-full rounded-full border-4 border-white bg-gray-100 overflow-hidden shadow-xl ring-2 ring-primary/20">
        <Avatar
          src={`${talent?.avatar}`}
          alt={`${talent?.firstName} ${talent?.lastName}`}
          className="w-full h-full"
          showFallback
          color="primary"
        />
      </div>
      {isOwnProfile && (
        <>
          <input
            type="file"
            ref={avatarInputRef}
            className="hidden"
            accept="image/*"
            onChange={(e) => onFileChange(e, "avatar")}
          />
          <Button
            onPress={() => avatarInputRef.current?.click()}
            isDisabled={isProcessing}
            isIconOnly
            className="absolute bottom-1 end-1 w-10 h-10 min-w-10 rounded-full bg-primary text-white border-3 border-white flex items-center justify-center hover:bg-primary/90 hover:scale-110 transition-all duration-300 shadow-lg z-20"
          >
            {isProcessing && cropType === "avatar" ? (
              <Spinner size="sm" color="white" />
            ) : (
              <FiCamera className="text-base" />
            )}
          </Button>
        </>
      )}
    </div>
  );
};
