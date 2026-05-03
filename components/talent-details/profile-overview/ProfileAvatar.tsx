"use client";

import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
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
    <div className="absolute -top-16 md:-top-20 start-6 md:start-8 w-32 h-32 md:w-40 md:h-40 z-10 flex-shrink-0">
      <div className="w-full h-full rounded-full border-4 border-white bg-gray-100 overflow-hidden shadow-md">
        <Avatar
          src={`${talent?.avatar}`}
          alt={`${talent?.firstName} ${talent?.lastName}`}
          classNames={{ base: "object-cover w-full h-full" }}
          showFallback
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
            className="absolute bottom-2 end-2 w-9 h-9 rounded-full bg-primary-50 border-2 border-white flex items-center justify-center text-primary hover:bg-primary-100 transition-all shadow-md z-20"
          >
            {isProcessing && cropType === "avatar" ? (
              <Spinner size="sm" color="primary" />
            ) : (
              <FiCamera className="text-lg" />
            )}
          </Button>
        </>
      )}
    </div>
  );
};
