"use client";

import { RequestMeetingForm } from "./RequestMeetingForm";
import { ModalContent, addToast } from "@heroui/react";
import { RequestMeetingFormValues } from "@/validations/meeting.validation";
import { SubmitHandler } from "react-hook-form";

import { useRequestTalentMeeting } from "@/hooks/api/useProfile";
import { useTranslations } from "next-intl";
import { MeetingType } from "@/types/api";

export const RequestTalentMeetingModal = ({
  onOpenChange,
  talentId,
}: {
  onOpenChange: () => void;
  talentId: number;
}) => {
  const t = useTranslations("TalentDetails");
  const { mutate: requestMeeting, isPending } = useRequestTalentMeeting();

  const meetingTypes = [
    {
      key: MeetingType.GENERAL_NETWORKING,
      label: t("requestMeetingModal.meetingTypes.generalNetworking"),
    },
    {
      key: MeetingType.JOIN_AS_MEMBER,
      label: t("requestMeetingModal.meetingTypes.joinAsMember"),
    },
    {
      key: MeetingType.INVESTMENT_DISC,
      label: t("requestMeetingModal.meetingTypes.investmentDisc"),
    },
    {
      key: MeetingType.OTHER,
      label: t("requestMeetingModal.meetingTypes.other"),
    },
  ];

  const onSubmit: SubmitHandler<RequestMeetingFormValues> = (data) => {
    if (!talentId) return;

    requestMeeting(
      {
        id: talentId,
        data: {
          type: data.type,
          preferredDate: data.date.toString(),
          preferredTime: data.time.toString(),
          contactMethod: data.contactMethod,
          contactInfo: data.contactValue,
          message: data.message || "",
          otherType: data.otherType || "",
        },
      },
      {
        onSuccess: (res) => {
          addToast({
            title: res.message || "Request sent successfully",
            color: "success",
          });
          onOpenChange();
        },
      },
    );
  };

  return (
    <ModalContent>
      {(onClose: any) => (
        <RequestMeetingForm
          onClose={onClose}
          onSubmit={onSubmit}
          isPending={isPending}
          types={meetingTypes}
        />
      )}
    </ModalContent>
  );
};
