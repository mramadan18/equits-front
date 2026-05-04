"use client";

import { Button } from "@heroui/button";
import Link from "next/link";
import { AuthRoutes } from "@/types";

interface AuthButtonsProps {
  t: (key: string) => string;
  isAuthPage: boolean;
  isLoginPage: boolean;
  isRegisterPage: boolean;
}

export const AuthButtons = ({
  t,
  isAuthPage,
  isLoginPage,
  isRegisterPage,
}: AuthButtonsProps) => {
  return (
    <>
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
