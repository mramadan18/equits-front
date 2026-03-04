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

export default function RegisterPage() {
  const t = useTranslations("Auth.Register");

  return (
    <AuthLayout
      imageSrc="/images/register.png"
      imageAlt="Register illustration"
    >
      <AuthHeader title={t("title")} subtitle={t("subtitle")} />

      <SocialButton text={t("continueGoogle")} />

      <AuthDivider text={t("or")} />

      <form className="flex flex-col gap-4">
        <div className="flex gap-4">
          <AuthInput type="text" placeholder={t("firstName")} />
          <AuthInput type="text" placeholder={t("lastName")} />
        </div>

        <AuthInput
          type="email"
          placeholder={t("emailLabel")}
          endContent={
            <MdOutlineMailOutline className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
        />

        <PasswordField placeholder={t("passwordLabel")} />

        <AuthSubmitButton className="mt-4">{t("submit")}</AuthSubmitButton>
      </form>

      <p className="text-center font-medium mt-2 text-dark">
        {t("hasAccount")}{" "}
        <Link href="/login" className="text-primary hover:underline">
          {t("loginLink")}
        </Link>
      </p>
    </AuthLayout>
  );
}
