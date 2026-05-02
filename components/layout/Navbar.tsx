"use client";

import { useAuthStore } from "@/stores/useAuthStore";

import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { BiHomeAlt2 } from "react-icons/bi";
import { IoTelescopeOutline } from "react-icons/io5";
import { TiGroupOutline } from "react-icons/ti";
import { SiHubspot } from "react-icons/si";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { LuMenu } from "react-icons/lu";
import { AuthRoutes, MainRoutes } from "@/types";
import { useLogout } from "@/hooks/api/useAuth";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Avatar } from "@heroui/avatar";
import { IoMdNotificationsOutline } from "react-icons/io";
import { PiOpenAiLogoThin } from "react-icons/pi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Badge } from "@heroui/badge";
import { useDisclosure } from "@heroui/modal";
import { PitchModal } from "./PitchModal";
import { FiPlus } from "react-icons/fi";
import { useCreateProject } from "@/hooks/api/useProject";

const authRoutes = [
  AuthRoutes.REGISTER,
  AuthRoutes.LOGIN,
  AuthRoutes.FORGOT_PASSWORD,
  AuthRoutes.RESET_PASSWORD,
  AuthRoutes.VERIFY_EMAIL,
  AuthRoutes.VERIFY_RESET_OTP,
];

export const Navbar = ({
  session,
  isVerified,
}: {
  session: string | undefined;
  isVerified: boolean;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("Navbar");
  const { user } = useAuthStore();

  const { mutate: logout } = useLogout();
  const {
    isOpen: isPitchOpen,
    onOpen: onPitchOpen,
    onOpenChange: onPitchOpenChange,
  } = useDisclosure();
  const router = useRouter();
  const { mutate: createProject, isPending: isCreatingProject } =
    useCreateProject();

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

  const isAuthPage = authRoutes.includes(pathname as AuthRoutes);
  const isLoginPage = pathname === AuthRoutes.LOGIN;
  const isRegisterPage = pathname === AuthRoutes.REGISTER;

  const isLoggedIn = !!session && isVerified;

  const navItems = [
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
    // {
    //   label: isLoggedIn ? t("services") : t("boost"),
    //   href: "/services",
    //   icon: <MdOutlineDesignServices size={24} />,
    // },
  ];

  return (
    <>
      <PitchModal
        isOpen={isPitchOpen}
        onOpenChange={onPitchOpenChange}
        user={user || null}
      />
      <HeroUINavbar
        onMenuOpenChange={setIsMenuOpen}
        maxWidth="full"
        className="bg-white shadow-sm h-20"
        classNames={{
          item: [
            "flex",
            "relative",
            "h-full",
            "items-center",
            "px-2",
            "data-[active=true]:after:content-['']",
            "data-[active=true]:after:absolute",
            "data-[active=true]:after:bottom-0",
            "data-[active=true]:after:left-0",
            "data-[active=true]:after:right-0",
            "data-[active=true]:after:h-0.5",
            "data-[active=true]:after:bg-primary",
          ],
          wrapper: "h-full container max-w-auto",
        }}
      >
        <NavbarContent justify="start" className="max-w-fit">
          <NavbarBrand className="mr-4">
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt={t("logoAlt")}
                width={120}
                height={30}
                style={{ width: "auto", height: "auto" }}
                priority
              />
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden lg:flex gap-12 ms-10" justify="start">
          {!isAuthPage &&
            navItems.map((item, index) => {
              const isActive = pathname === item.href;

              return (
                <NavbarItem
                  key={`${item.label}-${index}`}
                  isActive={isActive}
                  className="h-full text-base"
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-2 h-full font-bold transition-colors ${isActive ? "text-primary font-bold" : "text-gray hover:text-primary font-medium"}`}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                </NavbarItem>
              );
            })}
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex items-center gap-6">
            <Link
              href={pathname as string}
              locale={locale === "en" ? "ar" : "en"}
              className="text-primary font-bold text-sm hover:opacity-80 transition-opacity uppercase"
            >
              {locale === "en" ? "عربي" : "EN"}
            </Link>

            {session && isVerified ? (
              <div className="flex items-center gap-4">
                <Button
                  className="bg-[#E9EAEB] text-black font-semibold rounded-full px-4 py-3"
                  endContent={<FiPlus size={20} />}
                  onPress={handlePitchPress}
                  isLoading={isCreatingProject}
                >
                  Pitch
                </Button>

                <div className="flex items-center gap-3">
                  <Badge
                    content="2"
                    color="danger"
                    className="w-5 h-5 text-[10px]"
                  >
                    <div className="w-10 h-10 bg-[#E9EAEB] rounded-full flex items-center justify-center">
                      <IoMdNotificationsOutline
                        size={24}
                        className="text-black"
                      />
                    </div>
                  </Badge>

                  <Badge
                    content="Soon"
                    color="primary"
                    className="px-1 text-[10px]"
                  >
                    <div className="w-10 h-10 bg-[#E9EAEB] rounded-full flex items-center justify-center">
                      <PiOpenAiLogoThin size={24} className="text-black" />
                    </div>
                  </Badge>
                </div>

                <Dropdown placement="bottom-end">
                  <DropdownTrigger>
                    <div className="flex items-center gap-2 cursor-pointer">
                      <Avatar
                        fallback={
                          <div className="flex items-center gap-1">
                            <span>{user?.firstName?.charAt(0)}</span>
                            <span>{user?.lastName?.charAt(0)}</span>
                          </div>
                        }
                        src={`${user?.avatar}`}
                        name={user?.firstName}
                        isBordered
                        className="transition-transform"
                        color="primary"
                        size="sm"
                      />
                      <div className="flex items-center gap-1">
                        <span className="font-semibold text-sm">Me</span>
                        <MdOutlineKeyboardArrowDown />
                      </div>
                    </div>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Profile Actions" variant="flat">
                    <DropdownItem key="profile" className="h-14 gap-2">
                      <p className="font-semibold">{t("profile")}</p>
                      <p className="font-semibold text-primary">
                        {user?.firstName} {user?.lastName}
                      </p>
                    </DropdownItem>
                    <DropdownItem key="settings" as={Link} href="/settings">
                      {t("settings")}
                    </DropdownItem>
                    <DropdownItem
                      key="logout"
                      color="danger"
                      onClick={() => logout()}
                    >
                      {t("logout")}
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            ) : (
              <>
                {(!isAuthPage || !isRegisterPage) && (
                  <Button
                    as={Link}
                    href={AuthRoutes.REGISTER}
                    variant="bordered"
                    radius="sm"
                    color="primary"
                    className="text-primary font-bold px-8"
                  >
                    {t("register")}
                  </Button>
                )}
                {(!isAuthPage || !isLoginPage) && (
                  <Button
                    as={Link}
                    href={AuthRoutes.LOGIN}
                    radius="sm"
                    color="primary"
                    className="font-bold px-8"
                  >
                    {t("login")}
                  </Button>
                )}
              </>
            )}
          </NavbarItem>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? t("closeMenu") : t("openMenu")}
            className="lg:hidden text-gray w-14 h-10"
            icon={<LuMenu size={36} />}
          />
        </NavbarContent>

        <NavbarMenu className="pt-6">
          {!isAuthPage &&
            navItems.map((item, index) => {
              const isActive = pathname === item.href;

              return (
                <NavbarMenuItem key={`${item.label}-${index}`}>
                  <Link
                    className={`w-full flex items-center gap-4 py-3 text-base ${isActive ? "text-primary font-bold" : "text-gray font-medium hover:text-primary"}`}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                </NavbarMenuItem>
              );
            })}
          <div className="mt-8 flex flex-col gap-4">
            <Link
              href={pathname as string}
              locale={locale === "en" ? "ar" : "en"}
              className="text-primary font-bold text-center w-full py-3 border border-primary rounded uppercase"
            >
              {locale === "en" ? "عربي" : "English"}
            </Link>
            {(!isAuthPage || !isRegisterPage) && (
              <Button
                as={Link}
                href={AuthRoutes.REGISTER}
                variant="bordered"
                fullWidth
                color="primary"
                radius="none"
                size="lg"
                className="text-primary font-bold text-lg"
              >
                {t("register")}
              </Button>
            )}
            {(!isAuthPage || !isLoginPage) && (
              <Button
                as={Link}
                href={AuthRoutes.LOGIN}
                fullWidth
                color="primary"
                radius="none"
                size="lg"
                className="font-bold text-lg"
              >
                {t("login")}
              </Button>
            )}
          </div>
        </NavbarMenu>
      </HeroUINavbar>
    </>
  );
};
