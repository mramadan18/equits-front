"use client";

import { useTranslations } from "next-intl";
import { MdOutlineMailOutline } from "react-icons/md";
import { Link } from "@/i18n/navigation";
import {
  AuthLayout,
  AuthHeader,
  AuthInput,
  AuthSubmitButton,
} from "@/components/auth";
import { StaggerContainer, StaggerItem } from "@/components/shared/animations";

export default function ForgotPasswordPage() {
  const t = useTranslations("Auth.ForgotPassword");

  return (
    <AuthLayout
      imageSrc="/images/login.png"
      imageAlt="Forgot Password illustration"
    >
      <StaggerContainer delay={0.3} className="flex flex-col gap-6">
        <StaggerItem>
          <AuthHeader title={t("title")} subtitle={t("subtitle")} />
        </StaggerItem>

        <form className="flex flex-col gap-4">
          <StaggerItem>
            <AuthInput
              type="email"
              placeholder={t("emailLabel")}
              endContent={
                <MdOutlineMailOutline className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
            />
          </StaggerItem>

          <StaggerItem>
            <AuthSubmitButton className="mt-4">{t("submit")}</AuthSubmitButton>
          </StaggerItem>
        </form>

        <StaggerItem>
          <p className="text-center mt-2 text-dark">
            <Link href="/login" className="text-primary hover:underline">
              {t("backToLogin")}
            </Link>
          </p>
        </StaggerItem>
      </StaggerContainer>
    </AuthLayout>
  );
}
