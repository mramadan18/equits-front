"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import { AuthRoutes } from "@/types";

interface AuthButtonsProps {
  t: (key: string) => string;
  isAuthPage: boolean;
  isLoginPage: boolean;
  isRegisterPage: boolean;
  isUnverified?: boolean;
  onLogout?: () => void;
}

export const AuthButtons = ({
  t,
  isAuthPage,
  isLoginPage,
  isRegisterPage,
  isUnverified,
  onLogout,
}: AuthButtonsProps) => {
  return (
    <>
      {isUnverified && (
        <Button
          onPress={onLogout}
          variant="light"
          radius="sm"
          color="danger"
          className="font-bold px-8"
        >
          {t("logout")}
        </Button>
      )}
      {!isUnverified && (!isAuthPage || !isRegisterPage) && (
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
      {!isUnverified && (!isAuthPage || !isLoginPage) && (
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
