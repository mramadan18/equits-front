"use client";

import { useState, useMemo } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useAuthStore } from "@/stores/useAuthStore";
import { useLogout } from "@/hooks/api/useAuth";
import { useDisclosure } from "@heroui/modal";
import { useCreateProject } from "@/hooks/api/useProject";
import { AuthRoutes, MainRoutes } from "@/types";
import { BiHomeAlt2 } from "react-icons/bi";
import { IoTelescopeOutline } from "react-icons/io5";
import { TiGroupOutline } from "react-icons/ti";
import { SiHubspot } from "react-icons/si";
import React from "react";

const authRoutes = [
  AuthRoutes.REGISTER,
  AuthRoutes.LOGIN,
  AuthRoutes.FORGOT_PASSWORD,
  AuthRoutes.RESET_PASSWORD,
  AuthRoutes.VERIFY_EMAIL,
  AuthRoutes.VERIFY_RESET_OTP,
];

export const useNavbarController = (
  session: string | undefined,
  isVerified: boolean,
) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("Navbar");
  const { user } = useAuthStore();
  const router = useRouter();

  const { mutate: logout } = useLogout();
  const {
    isOpen: isPitchOpen,
    onOpen: onPitchOpen,
    onOpenChange: onPitchOpenChange,
  } = useDisclosure();
  const { mutate: createProject, isPending: isCreatingProject } =
    useCreateProject();

  const isLoggedIn = !!session && isVerified;
  const isAuthPage = authRoutes.includes(pathname as AuthRoutes);
  const isLoginPage = pathname === AuthRoutes.LOGIN;
  const isRegisterPage = pathname === AuthRoutes.REGISTER;

  const handlePitchPress = () => {
    if (user?.hasDraftProjects) {
      onPitchOpen();
    } else {
      createProject(undefined, {
        onSuccess: (response) => {
          router.push(`${MainRoutes.NEW_PROJECT}?id=${response.data.id}`);
        },
      });
    }
  };

  const navItems = useMemo(
    () => [
      {
        label: t("home"),
        href: isLoggedIn ? MainRoutes.HOME : MainRoutes.LANDING,
        icon: <BiHomeAlt2 size={24} />,
      },
      {
        label: isLoggedIn ? t("repo") : t("explore"),
        href: isLoggedIn ? MainRoutes.REPO : MainRoutes.EXPLORE,
        icon: isLoggedIn ? (
          <SiHubspot size={24} />
        ) : (
          <IoTelescopeOutline size={24} />
        ),
      },
      {
        label: t("talents"),
        href: MainRoutes.TALENTS,
        icon: <TiGroupOutline size={24} />,
      },
    ],
    [t, isLoggedIn],
  );

  return {
    isMenuOpen,
    setIsMenuOpen,
    pathname,
    locale,
    t,
    user,
    logout,
    isPitchOpen,
    onPitchOpenChange,
    isCreatingProject,
    isLoggedIn,
    isAuthPage,
    isLoginPage,
    isRegisterPage,
    handlePitchPress,
    navItems,
  };
};
