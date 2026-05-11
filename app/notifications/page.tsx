"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Card,
  CardBody,
  Button,
  Tabs,
  Tab,
  Spinner,
  Divider,
} from "@heroui/react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import {
  useNotifications,
  useUnreadCount,
  useMarkAsRead,
  useMarkAllRead,
  useDeleteNotification,
} from "@/hooks/api/useNotification";
import { useAuthStore } from "@/stores/useAuthStore";
import { useUpdateMeetingStatus } from "@/hooks/api/useMeeting";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/en";
import "dayjs/locale/ar";
import { NotificationItem } from "@/components/notifications/NotificationItem";
import { EmptyNotifications } from "@/components/notifications/EmptyNotifications";

dayjs.extend(relativeTime);

export default function NotificationsPage() {
  const t = useTranslations("Notifications");
  const { isAuthenticated } = useAuthStore();
  const { data: notificationsData, isLoading: loading } = useNotifications({
    enabled: isAuthenticated,
  });
  const { data: unreadData } = useUnreadCount({ enabled: isAuthenticated });
  const { mutate: markAsReadMutate } = useMarkAsRead();
  const { mutate: markAllReadMutate } = useMarkAllRead();
  const { mutate: deleteNotificationMutate } = useDeleteNotification();
  const { mutate: updateStatus } = useUpdateMeetingStatus();

  const [activeTab, setActiveTab] = useState("all");

  const notifications = notificationsData?.data || [];
  const unreadCount = unreadData?.data.count || 0;

  const handleMarkAsRead = (id: number) => markAsReadMutate(id);
  const handleMarkAllRead = () => markAllReadMutate();
  const handleDelete = (id: number) => deleteNotificationMutate(id);
  const handleStatusUpdate = (meetingId: number, status: string) => {
    updateStatus({ id: meetingId, status });
  };

  const filteredNotifications =
    activeTab === "unread"
      ? notifications.filter((n) => !n.isRead)
      : notifications;

  if (loading && notifications.length === 0) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Spinner size="lg" label="Loading notifications..." />
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto py-10 px-4">
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">{t("title")}</h1>
          <p className="text-default-500">
            {unreadCount > 0
              ? `You have ${unreadCount} unread notifications`
              : "You're all caught up!"}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button
            variant="flat"
            color="primary"
            startContent={<IoMdCheckmarkCircleOutline size={20} />}
            onPress={handleMarkAllRead}
            className="font-semibold"
          >
            {t("markAllRead")}
          </Button>
        )}
      </div>

      <Card className="shadow-sm border border-default-100">
        <CardBody className="p-0">
          <Tabs
            aria-label="Notification filters"
            variant="underlined"
            classNames={{
              tabList:
                "gap-6 w-full relative rounded-none border-b border-divider px-6",
              cursor: "w-full bg-primary",
              tab: "max-w-fit px-0 h-14",
              tabContent:
                "group-data-[selected=true]:text-primary font-semibold",
            }}
            selectedKey={activeTab}
            onSelectionChange={(key) => setActiveTab(key as string)}
          >
            <Tab
              key="all"
              title={
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <span>{t("all")}</span>
                  <span className="text-xs bg-default-100 px-2 py-0.5 rounded-full">
                    {notifications.length}
                  </span>
                </div>
              }
            />
            <Tab
              key="unread"
              title={
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <span>{t("unread")}</span>
                  <span className="text-xs bg-danger-50 text-danger px-2 py-0.5 rounded-full">
                    {unreadCount}
                  </span>
                </div>
              }
            />
          </Tabs>

          <div className="flex flex-col">
            {filteredNotifications.length === 0 ? (
              <EmptyNotifications />
            ) : (
              filteredNotifications.map((notification, index) => (
                <div key={notification.id}>
                  <NotificationItem
                    notification={notification}
                    onMarkAsRead={handleMarkAsRead}
                    onDelete={handleDelete}
                    onStatusUpdate={handleStatusUpdate}
                  />
                  {index < filteredNotifications.length - 1 && <Divider />}
                </div>
              ))
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
