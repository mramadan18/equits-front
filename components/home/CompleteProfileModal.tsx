"use client";

import { ModalContent } from "@heroui/modal";
import { Button } from "@heroui/button";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { IoCheckmarkCircle } from "react-icons/io5";
import { MdRadioButtonUnchecked } from "react-icons/md";
import { Divider } from "@heroui/divider";
import { useProfileStatus } from "@/hooks/api/useProfile";
import { Spinner } from "@heroui/spinner";
import { useAuthStore } from "@/stores/useAuthStore";
import { User } from "@/types/api";
import Link from "next/link";

// --- Sub-components ---

const ProgressSection = ({
  user,
  progress,
}: {
  user: User | null;
  progress: number;
}) => {
  const t = useTranslations("CompleteProfileModal");
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="hidden md:flex w-[35%] bg-gray3 flex-col items-center justify-center p-8 relative">
      <div className="relative w-48 h-48 flex items-center justify-center mb-8">
        <svg
          className="w-full h-full transform -rotate-90 absolute top-0 left-0"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke="#E5E7EB"
            strokeWidth="6"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke="#00469B"
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="relative w-[82%] h-[82%] rounded-full border-[6px] border-white bg-gray-100 overflow-hidden shadow-sm">
          <Image
            src={`${user?.avatar}`}
            alt={`${user?.firstName} ${user?.lastName}`}
            fill
            className="object-cover"
          />
        </div>
      </div>
      <p className="text-gray2 font-medium mb-2 text-base">
        {t("progressText", { progress })}
      </p>
      <h3 className="text-xl font-semibold text-dark text-center">
        {t("wayText")}
      </h3>
    </div>
  );
};

const TaskItem = ({
  title,
  description,
  isCompleted = false,
}: {
  title: string;
  description: string;
  isCompleted?: boolean;
}) => (
  <div className="flex items-start gap-4 group">
    {isCompleted ? (
      <IoCheckmarkCircle
        size={28}
        className="text-primary mt-0.5 flex-shrink-0"
      />
    ) : (
      <MdRadioButtonUnchecked
        size={28}
        className="text-gray4 mt-0.5 flex-shrink-0"
      />
    )}
    <div className="flex-1 pb-5">
      <h4
        className={`mb-0.5 text-dark group-hover:underline ${isCompleted ? "font-semibold" : "font-medium "}`}
      >
        {title}
      </h4>
      <p className="text-xs text-gray2">{description}</p>
    </div>
  </div>
);

// --- Main Component ---

export const CompleteProfileModal = () => {
  const t = useTranslations("CompleteProfileModal");
  const { user } = useAuthStore();
  const { data: statusResponse, isLoading } = useProfileStatus();
  const status = statusResponse?.data;

  if (!user) return null;

  const progress = status?.progress || 0;

  const tasks = [
    {
      key: "profilePictures",
      href: "/settings/overview",
      isCompleted: status?.checklist.profilePictures || false,
    },
    {
      key: "overview",
      href: "/settings/overview",
      isCompleted: status?.checklist.overview || false,
    },
    {
      key: "jobTitle",
      href: "/settings/jobtitle",
      isCompleted: status?.checklist.jobTitle || false,
    },
    {
      key: "education",
      href: "/settings/education",
      isCompleted: status?.checklist.education || false,
    },
    {
      key: "contactInfo",
      href: "/settings/contactinfo",
      isCompleted: status?.checklist.contactInfo || false,
    },
  ];

  return (
    <ModalContent className="p-0">
      {(onClose) => (
        <div className="flex w-full min-h-[550px]">
          <ProgressSection user={user} progress={progress} />

          <div className="w-full md:w-[65%] p-10 flex flex-col relative bg-white">
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-primary mb-2">
                {t("title")}
              </h2>
              <p className="text-gray2 text-xs">{t("subtitle")}</p>
            </div>

            <div className="flex flex-col gap-6 flex-1">
              {isLoading ? (
                <div className="flex justify-center items-center h-full">
                  <Spinner color="primary" />
                </div>
              ) : (
                tasks.map((task) => (
                  <Link key={task.key} href={task.href}>
                    <TaskItem
                      title={t(`tasks.${task.key}.title`)}
                      description={t(`tasks.${task.key}.description`)}
                      isCompleted={task.isCompleted}
                    />
                    <Divider className="mt-0 bg-gray2" />
                  </Link>
                ))
              )}
            </div>

            <div className="flex justify-end mt-8">
              <Button color="primary" onPress={onClose}>
                {t("close")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </ModalContent>
  );
};
