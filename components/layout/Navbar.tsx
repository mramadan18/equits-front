"use client";

import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
} from "@heroui/navbar";
import Link from "next/link";
import Image from "next/image";
import { LuMenu } from "react-icons/lu";
import { MainRoutes } from "@/types";
import { PitchModal } from "./PitchModal";
import { useNavbarController } from "@/hooks/ui/useNavbarController";

// Sub-components
import { NavItems } from "./navbar/NavItems";
import { UserMenu } from "./navbar/UserMenu";
import { AuthButtons } from "./navbar/AuthButtons";
import { MobileMenu } from "./navbar/MobileMenu";

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
  } = useNavbarController(session, isVerified);

  return (
    <>
      <PitchModal
        isOpen={isPitchOpen}
        onOpenChange={onPitchOpenChange}
        user={user || null}
      />
      <HeroUINavbar
        onMenuOpenChange={setIsMenuOpen}
        isMenuOpen={isMenuOpen}
        maxWidth="full"
        className="bg-white shadow-sm h-20"
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
                width={120}
                height={30}
                style={{ width: "auto", height: "auto" }}
                priority
              />
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden lg:flex gap-12 ms-10" justify="start">
          {!isAuthPage && <NavItems items={navItems} pathname={pathname} />}
        </NavbarContent>

        <NavbarContent justify="end">
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
          <NavbarMenuToggle
            aria-label={isMenuOpen ? t("closeMenu") : t("openMenu")}
            className="lg:hidden text-gray w-14 h-10"
            icon={<LuMenu size={36} />}
          />
        </NavbarContent>

        <MobileMenu
          items={navItems}
          pathname={pathname}
          t={t}
          onClose={() => setIsMenuOpen(false)}
          isAuthPage={isAuthPage}
          isLoginPage={isLoginPage}
          isRegisterPage={isRegisterPage}
          isUnverified={isUnverified}
          onLogout={logout}
        />
      </HeroUINavbar>
    </>
  );
};
