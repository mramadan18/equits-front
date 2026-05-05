"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Avatar,
  Button,
} from "@heroui/react";
import Link from "next/link";
import {
  LuUser,
  LuBookmark,
  LuCircleHelp,
  LuLogOut,
  LuShieldCheck,
  LuBriefcase,
  LuGraduationCap,
  LuMail,
  LuX,
} from "react-icons/lu";
import { MainRoutes, AuthRoutes } from "@/types";
import { User } from "@/types/api";

interface MobileMenuProps {
  t: (key: string) => string;
  onClose: () => void;
  isAuthPage: boolean;
  isLoginPage: boolean;
  isRegisterPage: boolean;
  isUnverified?: boolean;
  isLoggedIn?: boolean;
  user: User | null;
  isOpen: boolean;
  onLogout?: () => void;
}

export const MobileMenu = ({
  t,
  onClose,
  isAuthPage,
  isLoginPage,
  isRegisterPage,
  isUnverified,
  isLoggedIn,
  user,
  isOpen,
  onLogout,
}: MobileMenuProps) => {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      placement="right"
      size="xs"
      hideCloseButton
      radius="sm"
      classNames={{
        base: "overflow-visible max-w-10/12",
      }}
    >
      <DrawerContent>
        {(onClose) => (
          <>
            <button
              onClick={onClose}
              className="absolute -left-8 top-2 w-10 h-10 flex items-center justify-center bg-white text-dark rounded-full transition-colors z-50 lg:hidden"
              aria-label="Close menu"
            >
              <LuX size={24} />
            </button>
            <DrawerHeader className="pt-4 pb-2 flex justify-center">
              <h2 className="text-2xl font-bold">{t("openMenu")}</h2>
            </DrawerHeader>
            <DrawerBody className="py-4 px-4">
              <div className="flex flex-col gap-2">
                {isLoggedIn && user && (
                  <>
                    {/* Profile Section */}
                    <div className="mb-4">
                      <Link
                        className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-50 transition-colors"
                        href={`${MainRoutes.TALENTS}/${user?.id}`}
                        onClick={onClose}
                      >
                        <Avatar
                          src={`${user?.avatar}`}
                          name={`${user?.firstName} ${user?.lastName}`}
                          size="md"
                          className="w-10 h-10"
                          showFallback
                        />
                        <div className="flex flex-col">
                          <span className="font-bold text-gray-700">
                            {t("profile")}
                          </span>
                          <span className="text-xs text-primary">
                            {user?.firstName} {user?.lastName}
                          </span>
                        </div>
                      </Link>

                      <Link
                        className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-50 transition-colors"
                        href={MainRoutes.SAVED}
                        onClick={onClose}
                      >
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                          <LuBookmark size={20} />
                        </div>
                        <span className="font-bold text-gray-700">
                          {t("saved")}
                        </span>
                      </Link>
                    </div>

                    {/* Edit Profile Section */}
                    <div className="mb-4">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-2">
                        {t("editProfile")}
                      </p>
                      <div className="flex flex-col gap-1">
                        <Link
                          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-50 transition-colors"
                          href={MainRoutes.SETTINGS_OVERVIEW}
                          onClick={onClose}
                        >
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                            <LuUser size={20} />
                          </div>
                          <span className="font-bold text-gray-700">
                            {t("overview")}
                          </span>
                        </Link>
                        <Link
                          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-50 transition-colors"
                          href={MainRoutes.SETTINGS_JOB_TITLE}
                          onClick={onClose}
                        >
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                            <LuBriefcase size={20} />
                          </div>
                          <span className="font-bold text-gray-700">
                            {t("jobTitle")}
                          </span>
                        </Link>
                        <Link
                          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-50 transition-colors"
                          href={MainRoutes.SETTINGS_EDUCATION}
                          onClick={onClose}
                        >
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                            <LuGraduationCap size={20} />
                          </div>
                          <span className="font-bold text-gray-700">
                            {t("education")}
                          </span>
                        </Link>
                        <Link
                          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-50 transition-colors"
                          href={MainRoutes.SETTINGS_CONTACT_INFO}
                          onClick={onClose}
                        >
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                            <LuMail size={20} />
                          </div>
                          <span className="font-bold text-gray-700">
                            {t("contactInfo")}
                          </span>
                        </Link>
                      </div>
                    </div>

                    {/* Settings Section */}
                    <div className="mb-4">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-2">
                        {t("settings")}
                      </p>
                      <div className="flex flex-col gap-1">
                        <Link
                          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-50 transition-colors"
                          href={MainRoutes.SETTINGS_ACCOUNT}
                          onClick={onClose}
                        >
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                            <LuShieldCheck size={20} />
                          </div>
                          <span className="font-bold text-gray-700">
                            {t("account")}
                          </span>
                        </Link>
                      </div>
                    </div>

                    {/* Help & Logout Section */}
                    <div className="mt-auto pt-4 border-t border-gray-100">
                      <Link
                        className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-50 transition-colors mb-2"
                        href={MainRoutes.HELP}
                        onClick={onClose}
                      >
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                          <LuCircleHelp size={20} />
                        </div>
                        <span className="font-bold text-gray-700">
                          {t("help")}
                        </span>
                      </Link>

                      {(isLoggedIn || isUnverified) && (
                        <Button
                          onPress={() => {
                            onLogout?.();
                            onClose();
                          }}
                          fullWidth
                          color="danger"
                          variant="flat"
                          className="font-bold h-12 rounded-xl"
                          startContent={<LuLogOut size={20} />}
                        >
                          {t("logout")}
                        </Button>
                      )}
                    </div>
                  </>
                )}

                {!isLoggedIn && !isUnverified && (
                  <div className="flex flex-col gap-4 pt-2">
                    <Link
                      className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-50 transition-colors"
                      href={MainRoutes.HELP}
                      onClick={onClose}
                    >
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                        <LuCircleHelp size={20} />
                      </div>
                      <span className="font-bold text-gray-700">
                        {t("help")}
                      </span>
                    </Link>

                    <div className="grid grid-cols-2 gap-3">
                      {(!isAuthPage || !isLoginPage) && (
                        <Button
                          as={Link}
                          href={AuthRoutes.LOGIN}
                          variant="flat"
                          color="primary"
                          className="font-bold h-12 rounded-xl"
                          onClick={onClose}
                        >
                          {t("login")}
                        </Button>
                      )}
                      {(!isAuthPage || !isRegisterPage) && (
                        <Button
                          as={Link}
                          href={AuthRoutes.REGISTER}
                          color="primary"
                          className="font-bold h-12 rounded-xl"
                          onClick={onClose}
                        >
                          {t("register")}
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </DrawerBody>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};
