"use client";

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
import { Link, usePathname } from "@/i18n/navigation";
import { BiHomeAlt2 } from "react-icons/bi";
import { IoTelescopeOutline } from "react-icons/io5";
import { TiGroupOutline } from "react-icons/ti";
import { MdOutlineDesignServices } from "react-icons/md";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { LuMenu } from "react-icons/lu";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("Navbar");

  const isLoginPage = pathname === "/login";
  const isRegisterPage = pathname === "/register";
  const isAuthPage = isLoginPage || isRegisterPage;

  const navItems = [
    {
      label: t("home"),
      href: "/",
      icon: <BiHomeAlt2 size={24} />,
    },
    {
      label: t("explore"),
      href: "/explore",
      icon: <IoTelescopeOutline size={24} />,
    },
    {
      label: t("talents"),
      href: "/talents",
      icon: <TiGroupOutline size={24} />,
    },
    {
      label: t("services"),
      href: "/services",
      icon: <MdOutlineDesignServices size={24} />,
    },
  ];

  return (
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
      <NavbarContent justify="start">
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

      <NavbarContent className="hidden lg:flex gap-4" justify="center">
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
          {isLoginPage && (
            <Button
              as={Link}
              href="/register"
              variant="bordered"
              radius="sm"
              color="primary"
              className="text-primary font-bold px-8"
            >
              {t("register")}
            </Button>
          )}
          {isRegisterPage && (
            <Button
              as={Link}
              href="/login"
              radius="sm"
              color="primary"
              className="font-bold px-8"
            >
              {t("login")}
            </Button>
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
          {isLoginPage && (
            <Button
              as={Link}
              href="/register"
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
          {isRegisterPage && (
            <Button
              as={Link}
              href="/login"
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
  );
};
