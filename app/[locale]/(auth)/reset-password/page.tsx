"use client";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addToast } from "@heroui/toast";
import { useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import {
  getResetPasswordSchema,
  ResetPasswordInput,
} from "@/validations/auth.validation";
import { useResetPassword } from "@/hooks/api/useAuth";
import {
  AuthLayout,
  AuthHeader,
  PasswordField,
  AuthSubmitButton,
} from "@/components/auth";
import { StaggerContainer, StaggerItem } from "@/components/shared/animations";
import { ApiResponse, AuthResponse } from "@/types/api";
import { ApiError } from "@/types/error";

export default function ResetPasswordPage() {
  const authT = useTranslations("Auth.ResetPassword");
  const validationT = useTranslations("Auth.Validation");
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const { mutate: resetPassword, isPending } = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(getResetPasswordSchema(validationT)),
  });

  const onSubmit = (data: ResetPasswordInput) => {
    if (!token) {
      addToast({
        title: "Reset token is missing from URL",
        color: "danger",
      });
      return;
    }

    resetPassword(
      { ...data, token },
      {
        onSuccess: (response: ApiResponse<AuthResponse>) => {
          addToast({
            title: response.message || authT("resetSuccess"),
            color: "success",
          });
          router.push("/login");
        },
        onError: (error: ApiError) => {
          addToast({
            title: error.response?.data?.message || "Reset password failed",
            color: "danger",
          });
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
            <PasswordField
              placeholder={authT("passwordLabel")}
              {...register("password")}
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
            />
          </StaggerItem>

          <StaggerItem>
            <PasswordField
              placeholder={authT("confirmPasswordLabel")}
              {...register("confirmPassword")}
              isInvalid={!!errors.confirmPassword}
              errorMessage={errors.confirmPassword?.message}
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
