"use client";

import { useTranslations } from "next-intl";
import {
  AuthLayout,
  AuthHeader,
  PasswordField,
  AuthSubmitButton,
} from "@/components/auth";
import { StaggerContainer, StaggerItem } from "@/components/shared/animations";

export default function ResetPasswordPage() {
  const t = useTranslations("Auth.ResetPassword");

  return (
    <AuthLayout
      imageSrc="/images/login.png"
      imageAlt="Reset Password illustration"
    >
      <StaggerContainer delay={0.3} className="flex flex-col gap-6">
        <StaggerItem>
          <AuthHeader title={t("title")} subtitle={t("subtitle")} />
        </StaggerItem>

        <form className="flex flex-col gap-4">
          <StaggerItem>
            <PasswordField placeholder={t("passwordLabel")} />
          </StaggerItem>

          <StaggerItem>
            <PasswordField placeholder={t("confirmPasswordLabel")} />
          </StaggerItem>

          <StaggerItem>
            <AuthSubmitButton className="mt-4">{t("submit")}</AuthSubmitButton>
          </StaggerItem>
        </form>
      </StaggerContainer>
    </AuthLayout>
  );
}
