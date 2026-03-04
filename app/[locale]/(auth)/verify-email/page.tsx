"use client";

import { useTranslations } from "next-intl";
import { AuthLayout, AuthHeader, AuthSubmitButton } from "@/components/auth";
import { StaggerContainer, StaggerItem } from "@/components/shared/animations";
import { InputOtp } from "@heroui/input-otp";

export default function VerifyEmailPage() {
  const t = useTranslations("Auth.VerifyEmail");

  return (
    <AuthLayout
      imageSrc="/images/login.png"
      imageAlt="Verify Email illustration"
    >
      <StaggerContainer delay={0.3} className="flex flex-col gap-6">
        <StaggerItem>
          <AuthHeader title={t("title")} subtitle={t("subtitle")} />
        </StaggerItem>

        <form className="flex flex-col gap-6 items-center w-full">
          <StaggerItem className="w-full flex justify-center">
            <div className="flex justify-center w-full" dir="ltr">
              <InputOtp
                length={6}
                size="lg"
                classNames={{
                  segmentWrapper: "gap-2 sm:gap-4",
                  segment:
                    "w-10 h-10 sm:w-14 sm:h-14 text-lg border-default-200",
                }}
              />
            </div>
          </StaggerItem>

          <StaggerItem className="w-full">
            <AuthSubmitButton className="mt-2 w-full">
              {t("submit")}
            </AuthSubmitButton>
          </StaggerItem>
        </form>

        <StaggerItem>
          <p className="text-center mt-2 text-dark">
            <button
              type="button"
              className="text-primary hover:underline bg-transparent border-none cursor-pointer"
            >
              {t("resendCode")}
            </button>
          </p>
        </StaggerItem>
      </StaggerContainer>
    </AuthLayout>
  );
}
