"use client";

import { useTranslations } from "next-intl";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addToast } from "@heroui/toast";
import { useRouter } from "@/i18n/navigation";
import {
  getVerifyEmailSchema,
  VerifyEmailInput,
} from "@/validations/auth.validation";
import { useVerifyEmail } from "@/hooks/api/useAuth";
import { AuthLayout, AuthHeader, AuthSubmitButton } from "@/components/auth";
import { StaggerContainer, StaggerItem } from "@/components/shared/animations";
import { InputOtp } from "@heroui/input-otp";
import { ApiResponse, SuccessResponse } from "@/types/api";
import { ApiError } from "@/types/error";

export default function VerifyEmailPage() {
  const authT = useTranslations("Auth.VerifyEmail");
  const validationT = useTranslations("Auth.Validation");
  const router = useRouter();

  const { mutate: verifyEmail, isPending } = useVerifyEmail();

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
        router.push("/login");
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
                    }}
                  />
                )}
              />
            </div>
            {errors.otp && (
              <p className="text-tiny text-danger mt-2">{errors.otp.message}</p>
            )}
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
              className="text-primary hover:underline bg-transparent border-none cursor-pointer"
            >
              {authT("resendCode")}
            </button>
          </p>
        </StaggerItem>
      </StaggerContainer>
    </AuthLayout>
  );
}
