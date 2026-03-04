"use client";

import { useTranslations } from "next-intl";
import { MdOutlineMailOutline } from "react-icons/md";
import { Link } from "@/i18n/navigation";
import {
  AuthLayout,
  AuthHeader,
  SocialButton,
  AuthDivider,
  AuthInput,
  PasswordField,
  AuthSubmitButton,
} from "@/components/auth";

export default function LoginPage() {
  const t = useTranslations("Auth.Login");

  return (
    <AuthLayout imageSrc="/images/login.png" imageAlt="Login illustration">
      <AuthHeader title={t("title")} subtitle={t("subtitle")} />

      <SocialButton text={t("continueGoogle")} />

      <AuthDivider text={t("or")} />

      <form className="flex flex-col gap-4">
        <AuthInput
          type="email"
          placeholder={t("emailLabel")}
          endContent={
            <MdOutlineMailOutline className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
        />

        <PasswordField
          placeholder={t("passwordLabel")}
          forgotPasswordLink={
            <Link
              href="/forgot-password"
              className="text-primary text-sm hover:underline"
            >
              {t("forgotPassword")}
            </Link>
          }
        />

        <AuthSubmitButton className="mt-2">{t("submit")}</AuthSubmitButton>
      </form>

      <p className="text-center mt-2 text-dark">
        {t("noAccount")}{" "}
        <Link href="/register" className="text-primary hover:underline">
          {t("registerLink")}
        </Link>
      </p>
    </AuthLayout>
  );
}
