"use client";
// Force rebuild to resolve hydration mismatch after logo size update
import { useState, useEffect } from "react";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Badge,
} from "@heroui/react";
import Link from "next/link";
import Image from "next/image";
import { IoMdNotificationsOutline } from "react-icons/io";
import { PiOpenAiLogoThin } from "react-icons/pi";
import { MainRoutes } from "@/types";
import { PitchModal } from "./PitchModal";
import { AuthRequiredModal } from "./AuthRequiredModal";
import { useNavbarController } from "@/hooks/ui/useNavbarController";
import { useUnreadCount } from "@/hooks/api/useNotification";

// Sub-components
import { NavItems } from "./navbar/NavItems";
import { UserMenu } from "./navbar/UserMenu";
import { AuthButtons } from "./navbar/AuthButtons";
import { MobileMenu } from "./navbar/MobileMenu";
import { BottomNav } from "./navbar/BottomNav";

export const Navbar = ({
  session,
  isVerified,
}: {
  session: string | undefined;
  isVerified: boolean;
}) => {
  const {
    isMenuOpen,
    setIsMenuOpen,
    pathname,
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
    isUnverified,
    handlePitchPress,
    navItems,
    isAuthRequiredOpen,
    onAuthRequiredOpenChange,
  } = useNavbarController(session, isVerified);

  const { data: unreadData } = useUnreadCount({ enabled: isLoggedIn });
  const unreadCount = unreadData?.data.count || 0;

  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <>
      <PitchModal
        isOpen={isPitchOpen}
        onOpenChange={onPitchOpenChange}
        user={user || null}
      />
      <AuthRequiredModal
        isOpen={isAuthRequiredOpen}
        onOpenChange={onAuthRequiredOpenChange}
      />
      <HeroUINavbar
        maxWidth="full"
        shouldHideOnScroll={mounted && isMobile}
        className="bg-white shadow-sm h-16 lg:h-20"
        classNames={{
          item: "flex relative h-full items-center px-2 data-[active=true]:after:content-[''] data-[active=true]:after:absolute data-[active=true]:after:bottom-0 data-[active=true]:after:left-0 data-[active=true]:after:right-0 data-[active=true]:after:h-0.5 data-[active=true]:after:bg-primary",
          wrapper: "h-full container max-w-auto",
        }}
      >
        <NavbarContent justify="start" className="max-w-fit">
          <NavbarBrand className="mr-4">
            <Link href={MainRoutes.LANDING}>
              <Image
                src="/images/logo.png"
                alt={t("logoAlt")}
                width={170}
                height={30}
                className="w-36 lg:w-[170px] h-auto"
                priority
              />
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden lg:flex gap-12 ms-10" justify="start">
          {!isAuthPage && <NavItems items={navItems} pathname={pathname} />}
        </NavbarContent>

        <NavbarContent justify="end">
          <div className="flex lg:hidden items-center gap-3">
            <Badge
              content="Soon"
              color="primary"
              className="px-1 text-[8px]"
              size="sm"
            >
              <div className="w-8 h-8 bg-[#E9EAEB] rounded-full flex items-center justify-center">
                <PiOpenAiLogoThin size={18} className="text-black" />
              </div>
            </Badge>

            {isLoggedIn && (
              <Badge
                content={unreadCount > 0 ? unreadCount : undefined}
                color="danger"
                className="w-4 h-4 text-[8px]"
                size="sm"
                isInvisible={unreadCount === 0}
              >
                <Link
                  href={MainRoutes.NOTIFICATIONS}
                  className="w-8 h-8 bg-[#E9EAEB] rounded-full flex items-center justify-center"
                >
                  <IoMdNotificationsOutline size={18} className="text-black" />
                </Link>
              </Badge>
            )}
          </div>

          <NavbarItem className="hidden lg:flex items-center gap-6">
            {isLoggedIn ? (
              <UserMenu
                user={user || null}
                t={t}
                onLogout={logout}
                onPitchPress={handlePitchPress}
                isCreatingProject={isCreatingProject}
              />
            ) : (
              <AuthButtons
                t={t}
                isAuthPage={isAuthPage}
                isLoginPage={isLoginPage}
                isRegisterPage={isRegisterPage}
                isUnverified={isUnverified}
                onLogout={logout}
              />
            )}
          </NavbarItem>
        </NavbarContent>
      </HeroUINavbar>
      <MobileMenu
        isOpen={isMenuOpen}
        t={t}
        onClose={() => setIsMenuOpen(false)}
        isAuthPage={isAuthPage}
        isLoginPage={isLoginPage}
        isRegisterPage={isRegisterPage}
        isUnverified={isUnverified}
        isLoggedIn={isLoggedIn}
        user={user}
        onLogout={logout}
      />
      <BottomNav
        items={navItems}
        pathname={pathname}
        isAuthPage={isAuthPage}
        onPitchPress={handlePitchPress}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        t={t}
      />
    </>
  );
};
