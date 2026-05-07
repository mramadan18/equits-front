"use client";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addToast } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import {
  getResetPasswordSchema,
  ResetPasswordInput,
} from "@/validations/auth.validation";
import { useResetPassword } from "@/hooks/api/useAuth";
import { AuthLayout, AuthHeader, AuthSubmitButton } from "@/components/auth";
import { StaggerContainer, StaggerItem } from "@/components/shared/animations";
import { ApiResponse, AuthResponse } from "@/types/api";
import { AuthRoutes } from "@/types";
import { FormInput } from "@/components/ui/form/FormInput";

export default function ResetPasswordPage() {
  const authT = useTranslations("Auth.ResetPassword");
  const validationT = useTranslations("Auth.Validation");
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlOtp = searchParams.get("otp");
  const callbackUrl = searchParams.get("callbackUrl");

  const { mutate: resetPassword, isPending } = useResetPassword();

  const { handleSubmit, control } = useForm<ResetPasswordInput>({
    resolver: zodResolver(getResetPasswordSchema(validationT)),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: ResetPasswordInput) => {
    if (!urlOtp) {
      addToast({
        title: "OTP is missing from URL",
        color: "danger",
      });
      return;
    }

    resetPassword(
      {
        otp: urlOtp,
        password: data.password,
        confirmPassword: data.confirmPassword,
      },
      {
        onSuccess: (response: ApiResponse<AuthResponse>) => {
          addToast({
            title: response.message || authT("resetSuccess"),
            color: "success",
          });
          if (callbackUrl) {
            router.push(
              `${AuthRoutes.LOGIN}?callbackUrl=${encodeURIComponent(callbackUrl)}`,
            );
          } else {
            router.push(AuthRoutes.LOGIN);
          }
        },
      },
    );
  };

  return (
    <AuthLayout
      imageSrc="/images/login.png"
      imageAlt="Reset Password illustration"
    >
      <StaggerContainer delay={0.3} className="flex flex-col gap-6">
        <StaggerItem>
          <AuthHeader title={authT("title")} subtitle={authT("subtitle")} />
        </StaggerItem>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <StaggerItem>
            <FormInput
              name="password"
              control={control}
              type="password"
              placeholder={authT("passwordLabel")}
              variant="bordered"
              radius="sm"
              size="lg"
              classNames={{
                inputWrapper:
                  "border-default-200 bg-transparent text-default-700 shadow-none",
              }}
            />
          </StaggerItem>

          <StaggerItem>
            <FormInput
              name="confirmPassword"
              control={control}
              type="password"
              placeholder={authT("confirmPasswordLabel")}
              variant="bordered"
              radius="sm"
              size="lg"
              classNames={{
                inputWrapper:
                  "border-default-200 bg-transparent text-default-700 shadow-none",
              }}
            />
          </StaggerItem>

          <StaggerItem>
            <AuthSubmitButton className="mt-4" isLoading={isPending}>
              {authT("submit")}
            </AuthSubmitButton>
          </StaggerItem>
        </form>
      </StaggerContainer>
    </AuthLayout>
  );
}
