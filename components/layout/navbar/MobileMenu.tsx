"use client";

import { NavbarMenu, NavbarMenuItem } from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Link } from "@/i18n/navigation";
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
  locale: string;
  isAuthPage: boolean;
  isLoginPage: boolean;
  isRegisterPage: boolean;
}

export const MobileMenu = ({
  items,
  pathname,
  t,
  onClose,
  locale,
  isAuthPage,
  isLoginPage,
  isRegisterPage,
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
        <Link
          href={pathname}
          locale={locale === "en" ? "ar" : "en"}
          className="text-primary font-bold text-center w-full py-3 border border-primary rounded uppercase"
          onClick={onClose}
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
            onClick={onClose}
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
            onClick={onClose}
          >
            {t("login")}
          </Button>
        )}
      </div>
    </NavbarMenu>
  );
};
