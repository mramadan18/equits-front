"use client";

import { IoMdNotificationsOutline } from "react-icons/io";
import { useTranslations } from "next-intl";

export const EmptyNotifications = () => {
  const t = useTranslations("Notifications");

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-4">
      <div className="w-16 h-16 bg-default-100 rounded-full flex items-center justify-center mb-4">
        <IoMdNotificationsOutline size={32} className="text-default-400" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{t("empty")}</h3>
      <p className="text-default-400 max-w-xs">
        When you receive notifications, they will appear here.
      </p>
    </div>
  );
};
