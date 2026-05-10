"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Button,
  Badge,
} from "@heroui/react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { PiOpenAiLogoThin } from "react-icons/pi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import Link from "next/link";
import { MainRoutes } from "@/types";
import { User } from "@/types/api";
import { FaRegBookmark } from "react-icons/fa";

interface UserMenuProps {
  user: User | null;
  t: (key: string) => string;
  onLogout: () => void;
  onPitchPress: () => void;
  isCreatingProject: boolean;
}

export const UserMenu = ({
  user,
  t,
  onLogout,
  onPitchPress,
  isCreatingProject,
}: UserMenuProps) => {
  return (
    <div className="flex items-center gap-4">
      <Button
        className="bg-[#E9EAEB] text-black font-semibold rounded-full px-4 py-3"
        endContent={<FiPlus size={20} />}
        onPress={onPitchPress}
        isLoading={isCreatingProject}
      >
        {t("pitch")}
      </Button>

      <div className="flex items-center gap-3">
        <Badge content="2" color="danger" className="w-5 h-5 text-[10px]">
          <div className="w-10 h-10 bg-[#E9EAEB] rounded-full flex items-center justify-center">
            <IoMdNotificationsOutline size={24} className="text-black" />
          </div>
        </Badge>

        <Badge
          as={Link}
          href={MainRoutes.SAVED}
          content={user?.wishlistIds?.length || 0}
          color="danger"
          className="w-5 h-5 text-[10px]"
        >
          <Button
            as={Link}
            href={MainRoutes.SAVED}
            isIconOnly
            radius="full"
            className="w-10 h-10 bg-[#E9EAEB]"
          >
            <FaRegBookmark size={18} className="text-black" />
          </Button>
        </Badge>

        <Badge content="Soon" color="primary" className="px-1 text-[10px]">
          <div className="w-10 h-10 bg-[#E9EAEB] rounded-full flex items-center justify-center">
            <PiOpenAiLogoThin size={24} className="text-black" />
          </div>
        </Badge>
      </div>

      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <div className="flex items-center gap-2 cursor-pointer">
            <Avatar
              src={user?.avatar || undefined}
              isBordered
              className="transition-transform"
              color="primary"
              showFallback
              size="sm"
            />
            <div className="flex items-center gap-1">
              <span className="font-semibold text-sm">{t("me")}</span>
              <MdOutlineKeyboardArrowDown />
            </div>
          </div>
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem
            key="profile"
            as={Link}
            href={`${MainRoutes.TALENTS}/${user?.id}`}
            className="h-14 gap-2"
          >
            <p className="font-semibold">{t("profile")}</p>
            <p className="font-semibold text-primary">
              {user?.firstName} {user?.lastName}
            </p>
          </DropdownItem>
          <DropdownItem
            key="settings"
            as={Link}
            href={MainRoutes.SETTINGS_OVERVIEW}
          >
            {t("settings")}
          </DropdownItem>
          <DropdownItem key="logout" color="danger" onClick={onLogout}>
            {t("logout")}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
