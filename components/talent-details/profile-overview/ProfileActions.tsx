"use client";
import { HiPencil } from "react-icons/hi";
import { FaVideo } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import Link from "next/link";
import { ProfileCompletion } from "../../home/FeedProfileCard/ProfileCompletion";
import { Modal, Button } from "@heroui/react";
import { CompleteProfileModal } from "../../home/CompleteProfileModal";
import { ContactModal } from "../ContactModal";
import { RequestMeetingModal } from "../RequestMeetingModal";
import { User } from "@/types/api";

interface ProfileActionsProps {
  talent: User;
  isOwnProfile: boolean;
  t: (key: string) => string;
  isContactOpen: boolean;
  onContactOpenChange: () => void;
  isMeetingOpen: boolean;
  onMeetingOpenChange: () => void;
  isProfileCompleteOpen: boolean;
  onProfileCompleteOpenChange: () => void;
  onMeetingOpen: () => void;
  onContactOpen: () => void;
  onProfileCompleteOpen: () => void;
  progress: number;
}

export const ProfileActions = ({
  talent,
  isOwnProfile,
  t,
  isContactOpen,
  onContactOpenChange,
  isMeetingOpen,
  onMeetingOpenChange,
  isProfileCompleteOpen,
  onProfileCompleteOpenChange,
  onMeetingOpen,
  onContactOpen,
  onProfileCompleteOpen,
  progress,
}: ProfileActionsProps) => {
  return (
    <>
      {isOwnProfile && (
        <ProfileCompletion progress={progress} onOpen={onProfileCompleteOpen} />
      )}

      <Modal
        isOpen={isProfileCompleteOpen}
        onOpenChange={onProfileCompleteOpenChange}
        size="4xl"
      >
        <CompleteProfileModal />
      </Modal>

      <div className="flex flex-row flex-wrap items-center gap-3 mb-4">
        {isOwnProfile ? (
          <Button
            as={Link}
            href={`/settings/overview`}
            color="primary"
            variant="bordered"
            className="border-2 absolute top-4 end-4 hover:bg-primary hover:text-white transition-all duration-300"
            radius="full"
            size="md"
            startContent={<HiPencil className="text-lg" />}
          >
            {t("editProfileBtn")}
          </Button>
        ) : (
          <div className="flex flex-wrap flex-row gap-3 w-full">
            <Button
              color="primary"
              variant="solid"
              className="font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 w-full sm:w-auto"
              radius="sm"
              size="md"
              startContent={<FaVideo className="text-base" />}
              onPress={onMeetingOpen}
            >
              {t("requestMeeting")}
            </Button>
            <Button
              color="primary"
              variant="bordered"
              className="font-semibold border-2 hover:bg-primary hover:text-white transition-all duration-300 w-full sm:w-auto"
              radius="sm"
              size="md"
              startContent={<IoPersonOutline className="text-base" />}
              onPress={onContactOpen}
            >
              {t("contact")}
            </Button>
          </div>
        )}
      </div>

      <ContactModal
        isOpen={isContactOpen}
        onOpenChange={onContactOpenChange}
        talent={talent}
      />
      <RequestMeetingModal
        isOpen={isMeetingOpen}
        onOpenChange={onMeetingOpenChange}
        talent={talent}
      />
    </>
  );
};
