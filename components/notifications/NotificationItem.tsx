"use client";

import { Avatar, Button } from "@heroui/react";
import { IoMdNotificationsOutline, IoMdTrash } from "react-icons/io";
import dayjs from "dayjs";
import { MeetingRequestDetails } from "./MeetingRequestDetails";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { MainRoutes, NotificationType, MeetingStatus } from "@/types";

interface NotificationItemProps {
  notification: any;
  onMarkAsRead: (id: number) => void;
  onDelete: (id: number) => void;
  onStatusUpdate: (id: number, status: string) => void;
}

export const NotificationItem = ({
  notification,
  onMarkAsRead,
  onDelete,
  onStatusUpdate,
}: NotificationItemProps) => {
  const t = useTranslations("Notifications");

  return (
    <div
      className={`flex items-start gap-3 sm:gap-4 p-4 sm:p-6 transition-colors hover:bg-default-50/50 ${
        !notification.isRead ? "bg-primary-50/20" : ""
      }`}
    >
      <Avatar
        icon={<IoMdNotificationsOutline size={24} />}
        className={`hidden sm:flex flex-shrink-0 ${
          !notification.isRead
            ? "bg-primary text-white"
            : "bg-default-100 text-default-500"
        }`}
      />
      <div className="flex-grow min-w-0">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="min-w-0">
            <h4
              className={`font-bold text-base leading-tight mb-0.5 ${
                !notification.isRead ? "text-primary" : "text-default-700"
              }`}
            >
              {notification.title}
            </h4>
            <span className="text-[11px] sm:text-xs text-default-400">
              {dayjs(notification.createdAt).fromNow()}
            </span>
          </div>
          <Button
            isIconOnly
            size="sm"
            variant="light"
            color="danger"
            onPress={() => onDelete(notification.id)}
            className="flex-shrink-0 -mt-1 -me-2"
            aria-label={t("delete")}
            title={t("delete")}
          >
            <IoMdTrash size={18} />
          </Button>
        </div>
        <div className="text-default-600 text-sm mb-4 leading-relaxed">
          {(() => {
            const { type, metadata, message } = notification;
            if (!metadata) return message;

            if (type === NotificationType.MEETING_REQUEST) {
              const parts = message.split(metadata.senderName);
              const afterSender = parts[1] || "";
              const projectParts = afterSender.split(metadata.projectName);

              return (
                <p>
                  {parts[0]}
                  <Link
                    href={`${MainRoutes.TALENTS}/${metadata.senderId}`}
                    className="font-bold text-primary hover:underline"
                  >
                    {metadata.senderName}
                  </Link>
                  {projectParts[0]}
                  {metadata.projectName && (
                    <Link
                      href={`${MainRoutes.PROJECTS}/${metadata.projectId}`}
                      className="font-bold text-primary hover:underline"
                    >
                      {metadata.projectName}
                    </Link>
                  )}
                  {projectParts[1]}
                </p>
              );
            }

            if (
              type === NotificationType.MEETING_ACCEPTED ||
              type === NotificationType.MEETING_DECLINED
            ) {
              const name = metadata.receiverName;
              const projectName = metadata.projectName;
              const parts = message.split(name);
              const afterName = parts[1] || "";
              const projectParts = projectName
                ? afterName.split(projectName)
                : [afterName];

              return (
                <p>
                  {parts[0]}
                  <Link
                    href={`${MainRoutes.TALENTS}/${metadata.receiverId}`}
                    className="font-bold text-primary hover:underline"
                  >
                    {name}
                  </Link>
                  {projectParts[0]}
                  {projectName && (
                    <Link
                      href={`${MainRoutes.PROJECTS}/${metadata.projectId}`}
                      className="font-bold text-primary hover:underline"
                    >
                      {projectName}
                    </Link>
                  )}
                  {projectParts[1]}
                </p>
              );
            }

            return message;
          })()}
        </div>

        {notification.type === NotificationType.MEETING_REQUEST &&
          notification.metadata && (
            <MeetingRequestDetails metadata={notification.metadata} />
          )}

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {notification.type === NotificationType.MEETING_REQUEST &&
            notification.metadata?.meetingRequestId && (
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                {notification.metadata?.status === MeetingStatus.PENDING ||
                !notification.metadata?.status ? (
                  <>
                    <Button
                      size="sm"
                      color="primary"
                      className="font-bold flex-grow sm:flex-grow-0 px-4 sm:px-6"
                      onPress={() =>
                        onStatusUpdate(
                          notification.metadata.meetingRequestId,
                          MeetingStatus.ACCEPTED,
                        )
                      }
                    >
                      {t("accept")}
                    </Button>
                    <Button
                      size="sm"
                      variant="flat"
                      color="danger"
                      className="font-bold flex-grow sm:flex-grow-0 px-4 sm:px-6"
                      onPress={() => {
                        onStatusUpdate(
                          notification.metadata.meetingRequestId,
                          MeetingStatus.DECLINED,
                        );
                      }}
                    >
                      {t("decline")}
                    </Button>
                  </>
                ) : (
                  <div
                    className={`text-xs font-bold px-3 py-1.5 rounded-md text-center flex-grow sm:flex-grow-0 ${
                      notification.metadata.status === MeetingStatus.ACCEPTED
                        ? "bg-success-50 text-success border border-success-200"
                        : "bg-danger-50 text-danger border border-danger-200"
                    }`}
                  >
                    {notification.metadata.status === "ACCEPTED"
                      ? t("types.MEETING_ACCEPTED")
                      : t("types.MEETING_DECLINED")}
                  </div>
                )}
              </div>
            )}
          {!notification.isRead && (
            <Button
              size="sm"
              variant="light"
              color="primary"
              onPress={() => onMarkAsRead(notification.id)}
              className="font-semibold h-8 ms-auto sm:ms-auto"
            >
              {t("markRead")}
            </Button>
          )}
        </div>
      </div>
      {!notification.isRead && (
        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
      )}
    </div>
  );
};
