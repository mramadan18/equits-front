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
import { StaggerContainer, StaggerItem } from "@/components/shared/animations";

export default function RegisterPage() {
  const t = useTranslations("Auth.Register");

  return (
    <AuthLayout
      imageSrc="/images/register.png"
      imageAlt="Register illustration"
    >
      <StaggerContainer delay={0.3} className="flex flex-col gap-6">
        <StaggerItem>
          <AuthHeader title={t("title")} subtitle={t("subtitle")} />
        </StaggerItem>

        <StaggerItem>
          <SocialButton text={t("continueGoogle")} />
        </StaggerItem>

        <StaggerItem>
          <AuthDivider text={t("or")} />
        </StaggerItem>

        <form className="flex flex-col gap-4">
          <StaggerItem>
            <div className="flex gap-4">
              <AuthInput type="text" placeholder={t("firstName")} />
              <AuthInput type="text" placeholder={t("lastName")} />
            </div>
          </StaggerItem>

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
            <PasswordField placeholder={t("passwordLabel")} />
          </StaggerItem>

          <StaggerItem>
            <AuthSubmitButton className="mt-4">{t("submit")}</AuthSubmitButton>
          </StaggerItem>
        </form>

        <StaggerItem>
          <p className="text-center mt-2 text-dark">
            {t("hasAccount")}{" "}
            <Link href="/login" className="text-primary hover:underline">
              {t("loginLink")}
            </Link>
          </p>
        </StaggerItem>
      </StaggerContainer>
    </AuthLayout>
  );
}
