"use client";

import { Button } from "@heroui/button";
import { HiPencil } from "react-icons/hi";
import { FaVideo } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import Link from "next/link";
import { ProfileCompletion } from "../../home/FeedProfileCard/ProfileCompletion";
import { Modal } from "@heroui/modal";
import { CompleteProfileModal } from "../../home/CompleteProfileModal";
import { ContactModal } from "../ContactModal";
import { RequestMeetingModal } from "../RequestMeetingModal";
import { User } from "@/types/api";

interface ProfileActionsProps {
  talent: User;
  isOwnProfile: boolean;
  locale: string;
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
  locale,
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

      <div className="flex flex-row flex-wrap items-center gap-4 mb-4">
        {isOwnProfile ? (
          <Button
            as={Link}
            href={`/${locale}/settings/overview`}
            color="primary"
            variant="bordered"
            className="border-2 absolute top-4 end-4"
            radius="full"
            size="md"
            startContent={<HiPencil className="text-lg" />}
          >
            {t("editProfileBtn")}
          </Button>
        ) : (
          <>
            <Button
              color="primary"
              variant="solid"
              className="font-bold px-8 shadow-md"
              radius="sm"
              size="md"
              startContent={<FaVideo className="text-lg" />}
              onPress={onMeetingOpen}
            >
              {t("requestMeeting")}
            </Button>
            <Button
              color="primary"
              variant="bordered"
              className="font-bold px-8 border-2"
              radius="sm"
              size="md"
              startContent={<IoPersonOutline className="text-lg" />}
              onPress={onContactOpen}
            >
              {t("contact")}
            </Button>
          </>
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
