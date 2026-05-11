"use client";

import { Avatar } from "@heroui/react";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";

interface MeetingRequestDetailsProps {
  metadata: {
    senderAvatar?: string;
    senderName?: string;
    senderJobTitle?: string;
    type: string;
    preferredDate: string;
    preferredTime: string;
    contactMethod: string;
    contactInfo?: string;
  };
}

export const MeetingRequestDetails = ({
  metadata,
}: MeetingRequestDetailsProps) => {
  const t = useTranslations("Notifications");
  const tTalent = useTranslations("TalentDetails");

  return (
    <div className="bg-default-50/50 rounded-xl p-3 sm:p-4 mb-4 border border-default-200/50">
      <div className="flex items-center gap-3 mb-3 pb-3 border-b border-default-100">
        <Avatar
          src={metadata.senderAvatar}
          name={metadata.senderName}
          size="sm"
          className="ring-2 ring-white shadow-sm"
        />
        <div className="min-w-0">
          <p className="text-sm font-bold text-default-800 truncate">
            {metadata.senderName}
          </p>
          <p className="text-[11px] text-default-500 truncate">
            {metadata.senderJobTitle}
          </p>
        </div>
      </div>

      <div className="space-y-1 sm:space-y-2">
        {[
          {
            label: tTalent("requestMeetingModal.meetingType"),
            value: t(`meetingTypes.${metadata.type}`),
          },
          {
            label: tTalent("requestMeetingModal.preferredDate"),
            value: dayjs(metadata.preferredDate).format("DD/MM/YYYY"),
          },
          {
            label: tTalent("requestMeetingModal.preferredTime"),
            value: metadata.preferredTime,
          },
          {
            label: tTalent("requestMeetingModal.preferredContactMethod"),
            value:
              metadata.contactMethod &&
              tTalent(
                `requestMeetingModal.contactMethods.${metadata.contactMethod.toLowerCase()}`,
              ),
            isCapitalize: true,
          },
        ].map((item, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-4"
          >
            <span className="text-default-400 text-[11px] sm:text-xs sm:w-36 flex-shrink-0 font-medium">
              {item.label}:
            </span>
            <span
              className={`text-sm font-bold text-default-700 ${
                item.isCapitalize ? "capitalize" : ""
              }`}
            >
              {item.value}
            </span>
          </div>
        ))}

        {metadata.contactInfo && (
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-4">
            <span className="text-default-400 text-[11px] sm:text-xs sm:w-36 flex-shrink-0 font-medium">
              {tTalent("contactInfo")}:
            </span>
            <a
              href={
                metadata.contactInfo.includes("@")
                  ? `mailto:${metadata.contactInfo}`
                  : `tel:${metadata.contactInfo}`
              }
              className="text-sm font-bold text-primary hover:underline underline-offset-4 transition-all break-all"
            >
              {metadata.contactInfo}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
