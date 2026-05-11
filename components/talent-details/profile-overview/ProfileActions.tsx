"use client";
import { HiPencil } from "react-icons/hi";
import { FaVideo } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { FiInfo, FiXCircle } from "react-icons/fi";
import Link from "next/link";
import { ProfileCompletion } from "../../home/FeedProfileCard/ProfileCompletion";
import {
  Modal,
  Button,
  Tooltip,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  addToast,
} from "@heroui/react";
import { CompleteProfileModal } from "../../home/CompleteProfileModal";
import { ContactModal } from "../ContactModal";
import { RequestTalentMeetingModal } from "../RequestTalentMeetingModal";
import { User } from "@/types/api";
import {
  useCheckMeetingEligibility,
  useCancelMeeting,
} from "@/hooks/api/useMeeting";
import { useState } from "react";

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
  const { data: eligibilityData, isLoading: isCheckingEligibility } =
    useCheckMeetingEligibility({
      receiverId: talent.id,
      enabled: !isOwnProfile,
    });

  const isEligible = eligibilityData?.data?.eligible !== false;
  const eligibilityReason = eligibilityData?.data?.reason;
  const eligibilityMessage = eligibilityData?.data?.message;
  const pendingRequestId = eligibilityData?.data?.meetingRequestId;

  const [isCancelConfirmOpen, setIsCancelConfirmOpen] = useState(false);
  const { mutate: cancelMeeting, isPending: isCancelling } = useCancelMeeting();

  const handleMeetingPress = () => {
    if (eligibilityReason === "PENDING") {
      setIsCancelConfirmOpen(true);
      return;
    }

    if (isEligible) {
      onMeetingOpen();
    }
  };

  const handleCancelMeeting = () => {
    if (pendingRequestId) {
      cancelMeeting(pendingRequestId, {
        onSuccess: () => {
          addToast({
            title: "Meeting request cancelled",
            color: "success",
          });
          setIsCancelConfirmOpen(false);
        },
      });
    }
  };

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
            <Tooltip
              content={eligibilityMessage}
              isDisabled={isEligible || eligibilityReason === "PENDING"}
              color="danger"
            >
              <div className="w-full sm:w-auto">
                <Button
                  color={
                    eligibilityReason === "PENDING"
                      ? "primary"
                      : isEligible
                        ? "primary"
                        : "default"
                  }
                  variant={
                    isEligible || eligibilityReason === "PENDING"
                      ? "solid"
                      : "solid"
                  }
                  className={`font-semibold shadow-md transition-all duration-300 w-full ${!isEligible && eligibilityReason !== "PENDING" ? "opacity-70 grayscale-[0.5]" : "hover:shadow-lg hover:scale-[1.02]"}`}
                  radius="sm"
                  size="md"
                  startContent={
                    eligibilityReason === "PENDING" ? (
                      <FiXCircle className="text-base" />
                    ) : isEligible ? (
                      <FaVideo className="text-base" />
                    ) : (
                      <FiInfo className="text-base" />
                    )
                  }
                  onPress={handleMeetingPress}
                  isDisabled={
                    (!isEligible && eligibilityReason !== "PENDING") ||
                    isCheckingEligibility
                  }
                  isLoading={isCheckingEligibility || isCancelling}
                >
                  {eligibilityReason === "PENDING"
                    ? "Cancel Request"
                    : t("requestMeeting")}
                </Button>
              </div>
            </Tooltip>
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
      <Modal
        isOpen={isMeetingOpen}
        onOpenChange={onMeetingOpenChange}
        size="xl"
        backdrop="blur"
        scrollBehavior="inside"
      >
        <RequestTalentMeetingModal
          onOpenChange={onMeetingOpenChange}
          talentId={talent.id}
        />
      </Modal>

      <Modal
        isOpen={isCancelConfirmOpen}
        onOpenChange={setIsCancelConfirmOpen}
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Cancel Meeting Request
              </ModalHeader>
              <ModalBody>
                <p>Are you sure you want to cancel your meeting request?</p>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  No, Keep it
                </Button>
                <Button
                  color="danger"
                  isLoading={isCancelling}
                  onPress={handleCancelMeeting}
                >
                  Yes, Cancel
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
