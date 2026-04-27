"use client";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addToast } from "@heroui/toast";
import {
  getChangePasswordSchema,
  ChangePasswordInput,
} from "@/validations/auth.validation";
import {
  AuthLayout,
  AuthHeader,
  PasswordField,
  AuthSubmitButton,
} from "@/components/auth";
import { StaggerContainer, StaggerItem } from "@/components/shared/animations";
import { ApiResponse, SuccessResponse } from "@/types/api";
import { ApiError } from "@/types/error";
import { useChangePassword } from "@/hooks/api/useAuth";

export default function ChangePasswordPage() {
  const authT = useTranslations("Auth.ChangePassword");
  const validationT = useTranslations("Auth.Validation");

  const { mutate: changePassword, isPending } = useChangePassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordInput>({
    resolver: zodResolver(getChangePasswordSchema(validationT)),
  });

  const onSubmit = (data: ChangePasswordInput) => {
    changePassword(data, {
      onSuccess: (response: ApiResponse<SuccessResponse>) => {
        addToast({
          title: response.message || authT("passwordUpdated"),
          color: "success",
        });
      },
      onError: (error: ApiError) => {
        addToast({
          title: error.response?.data?.message || "Password update failed",
          color: "danger",
        });
      },
    });
  };

  return (
    <AuthLayout
      imageSrc="/images/login.png"
      imageAlt="Change Password illustration"
    >
      <StaggerContainer delay={0.3} className="flex flex-col gap-6">
        <StaggerItem>
          <AuthHeader title={authT("title")} subtitle={authT("subtitle")} />
        </StaggerItem>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <StaggerItem>
            <PasswordField
              placeholder={authT("oldPasswordLabel")}
              {...register("oldPassword")}
              isInvalid={!!errors.oldPassword}
              errorMessage={errors.oldPassword?.message}
            />
          </StaggerItem>

          <StaggerItem>
            <PasswordField
              placeholder={authT("newPasswordLabel")}
              {...register("newPassword")}
              isInvalid={!!errors.newPassword}
              errorMessage={errors.newPassword?.message}
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
