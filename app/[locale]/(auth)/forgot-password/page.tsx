"use client";

import { useTranslations } from "next-intl";
import { MdOutlineMailOutline } from "react-icons/md";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addToast } from "@heroui/toast";
import { Link } from "@/i18n/navigation";
import {
  getForgotPasswordSchema,
  ForgotPasswordInput,
} from "@/validations/auth.validation";
import { useForgotPassword } from "@/hooks/api/useAuth";
import {
  AuthLayout,
  AuthHeader,
  AuthInput,
  AuthSubmitButton,
} from "@/components/auth";
import { StaggerContainer, StaggerItem } from "@/components/shared/animations";
import { ApiResponse, SuccessResponse } from "@/types/api";
import { ApiError } from "@/types/error";

export default function ForgotPasswordPage() {
  const authT = useTranslations("Auth.ForgotPassword");
  const validationT = useTranslations("Auth.Validation");

  const { mutate: forgotPassword, isPending } = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(getForgotPasswordSchema(validationT)),
  });

  const onSubmit = (data: ForgotPasswordInput) => {
    forgotPassword(data.email, {
      onSuccess: (response: ApiResponse<SuccessResponse>) => {
        addToast({
          title: response.message || authT("resetSent"),
          color: "success",
        });
      },
      onError: (error: ApiError) => {
        addToast({
          title: error.response?.data?.message || "Operation failed",
          color: "danger",
        });
      },
    });
  };

  return (
    <AuthLayout
      imageSrc="/images/login.png"
      imageAlt="Forgot Password illustration"
    >
      <StaggerContainer delay={0.3} className="flex flex-col gap-6">
        <StaggerItem>
          <AuthHeader title={authT("title")} subtitle={authT("subtitle")} />
        </StaggerItem>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <StaggerItem>
            <AuthInput
              type="email"
              placeholder={authT("emailLabel")}
              {...register("email")}
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
              endContent={
                <MdOutlineMailOutline className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
            />
          </StaggerItem>

          <StaggerItem>
            <AuthSubmitButton className="mt-4" isLoading={isPending}>
              {authT("submit")}
            </AuthSubmitButton>
          </StaggerItem>
        </form>

        <StaggerItem>
          <p className="text-center mt-2 text-dark">
            <Link href="/login" className="text-primary hover:underline">
              {authT("backToLogin")}
            </Link>
          </p>
        </StaggerItem>
      </StaggerContainer>
    </AuthLayout>
  );
}
