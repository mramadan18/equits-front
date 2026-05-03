"use client";

import { Button } from "@heroui/button";
import { Link } from "@/i18n/navigation";
import { AuthRoutes } from "@/types";

interface AuthButtonsProps {
  t: (key: string) => string;
  locale: string;
  pathname: string;
  isAuthPage: boolean;
  isLoginPage: boolean;
  isRegisterPage: boolean;
}

export const AuthButtons = ({
  t,
  locale,
  pathname,
  isAuthPage,
  isLoginPage,
  isRegisterPage,
}: AuthButtonsProps) => {
  return (
    <>
      <Link
        href={pathname}
        locale={locale === "en" ? "ar" : "en"}
        className="text-primary font-bold text-sm hover:opacity-80 transition-opacity uppercase mr-4"
      >
        {locale === "en" ? "عربي" : "EN"}
      </Link>

      {(!isAuthPage || !isRegisterPage) && (
        <Button
          as={Link}
          href={AuthRoutes.REGISTER}
          variant="bordered"
          radius="sm"
          color="primary"
          className="text-primary font-bold px-8 mr-4"
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
  );
};
