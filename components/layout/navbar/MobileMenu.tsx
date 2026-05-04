"use client";

import { NavbarMenu, NavbarMenuItem } from "@heroui/navbar";
import { Button } from "@heroui/button";
import Link from "next/link";
import { AuthRoutes } from "@/types";
import { ReactNode } from "react";

interface NavItem {
  label: string;
  href: string;
  icon: ReactNode;
}

interface MobileMenuProps {
  items: NavItem[];
  pathname: string;
  t: (key: string) => string;
  onClose: () => void;
  isAuthPage: boolean;
  isLoginPage: boolean;
  isRegisterPage: boolean;
  isUnverified?: boolean;
  onLogout?: () => void;
}

export const MobileMenu = ({
  items,
  pathname,
  t,
  onClose,
  isAuthPage,
  isLoginPage,
  isRegisterPage,
  isUnverified,
  onLogout,
}: MobileMenuProps) => {
  return (
    <NavbarMenu className="pt-6">
      {!isAuthPage &&
        items.map((item, index) => {
          const isActive = pathname === item.href;

          return (
            <NavbarMenuItem key={`${item.label}-${index}`}>
              <Link
                className={`w-full flex items-center gap-4 py-3 text-base ${
                  isActive
                    ? "text-primary font-bold"
                    : "text-gray font-medium hover:text-primary"
                }`}
                href={item.href}
                onClick={onClose}
              >
                {item.icon}
                {item.label}
              </Link>
            </NavbarMenuItem>
          );
        })}
      <div className="mt-8 flex flex-col gap-4">
        {/* <Link
          href={pathname}
          className="text-primary font-bold text-center w-full py-3 border border-primary rounded uppercase"
          onClick={onClose}
        >
          English
        </Link> */}
        {isUnverified && (
          <Button
            onPress={() => {
              onLogout?.();
              onClose();
            }}
            fullWidth
            color="danger"
            variant="flat"
            radius="none"
            size="lg"
            className="font-bold text-lg"
          >
            {t("logout")}
          </Button>
        )}
        {!isUnverified && (!isAuthPage || !isRegisterPage) && (
          <Button
            as={Link}
            href={AuthRoutes.REGISTER}
            variant="bordered"
            fullWidth
            color="primary"
            radius="none"
            size="lg"
            className="text-primary font-bold text-lg"
            onClick={onClose}
          >
            {t("register")}
          </Button>
        )}
        {!isUnverified && (!isAuthPage || !isLoginPage) && (
          <Button
            as={Link}
            href={AuthRoutes.LOGIN}
            fullWidth
            color="primary"
            radius="none"
            size="lg"
            className="font-bold text-lg"
            onClick={onClose}
          >
            {t("login")}
          </Button>
        )}
      </div>
    </NavbarMenu>
  );
};
