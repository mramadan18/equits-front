"use client";

import { useTranslations } from "next-intl";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addToast } from "@heroui/toast";
import { useRouter } from "@/i18n/navigation";
import { useState, useEffect } from "react";
import {
  getVerifyEmailSchema,
  VerifyEmailInput,
} from "@/validations/auth.validation";
import { useVerifyEmail, useResendVerifyEmail } from "@/hooks/api/useAuth";
import { AuthLayout, AuthHeader, AuthSubmitButton } from "@/components/auth";
import { StaggerContainer, StaggerItem } from "@/components/shared/animations";
import { InputOtp } from "@heroui/input-otp";
import { ApiResponse, SuccessResponse } from "@/types/api";
import { ApiError } from "@/types/error";
import { AuthRoutes } from "@/types";

export default function VerifyEmailPage() {
  const authT = useTranslations("Auth.VerifyEmail");
  const validationT = useTranslations("Auth.Validation");
  const router = useRouter();

  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const { mutate: verifyEmail, isPending } = useVerifyEmail();
  const { mutate: resendEmail, isPending: isResending } =
    useResendVerifyEmail();

  const handleResend = () => {
    if (timeLeft > 0) return;
    resendEmail(undefined, {
      onSuccess: (response) => {
        addToast({
          title: response.message || authT("resendSuccess"),
          color: "success",
        });
        setTimeLeft(30);
      },
      onError: (error: ApiError) => {
        addToast({
          title: error.response?.data?.message || "Resend failed",
          color: "danger",
        });
      },
    });
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyEmailInput>({
    resolver: zodResolver(getVerifyEmailSchema(validationT)),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = (data: VerifyEmailInput) => {
    verifyEmail(data.otp, {
      onSuccess: (response: ApiResponse<SuccessResponse>) => {
        addToast({
          title: response.message || authT("verifySuccess"),
          color: "success",
        });
        router.push(AuthRoutes.LOGIN);
      },
      onError: (error: ApiError) => {
        addToast({
          title: error.response?.data?.message || "Verification failed",
          color: "danger",
        });
      },
    });
  };

  return (
    <AuthLayout
      imageSrc="/images/login.png"
      imageAlt="Verify Email illustration"
    >
      <StaggerContainer delay={0.3} className="flex flex-col gap-6">
        <StaggerItem>
          <AuthHeader title={authT("title")} subtitle={authT("subtitle")} />
        </StaggerItem>

        <form
          className="flex flex-col gap-6 items-center w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <StaggerItem className="w-full flex flex-col items-center">
            <div className="flex justify-center w-full" dir="ltr">
              <Controller
                name="otp"
                control={control}
                render={({ field }) => (
                  <InputOtp
                    length={6}
                    size="lg"
                    errorMessage={errors.otp?.message}
                    isInvalid={!!errors.otp}
                    {...field}
                    classNames={{
                      segmentWrapper: "gap-2 sm:gap-4",
                      segment:
                        "w-10 h-10 sm:w-14 sm:h-14 text-lg border-default-200",
                      errorMessage: "text-end",
                    }}
                  />
                )}
              />
            </div>
          </StaggerItem>

          <StaggerItem className="w-full">
            <AuthSubmitButton className="mt-2 w-full" isLoading={isPending}>
              {authT("submit")}
            </AuthSubmitButton>
          </StaggerItem>
        </form>

        <StaggerItem>
          <p className="text-center mt-2 text-dark">
            <button
              type="button"
              onClick={handleResend}
              disabled={timeLeft > 0 || isResending}
              className={`text-primary hover:underline bg-transparent border-none cursor-pointer disabled:text-default-400 disabled:no-underline disabled:cursor-not-allowed`}
            >
              {timeLeft > 0
                ? `${authT("resendCode")} (${timeLeft}s)`
                : authT("resendCode")}
            </button>
          </p>
        </StaggerItem>
      </StaggerContainer>
    </AuthLayout>
  );
}
