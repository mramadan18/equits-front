"use client";

import { useTranslations } from "next-intl";
import { MdOutlineMailOutline } from "react-icons/md";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addToast } from "@heroui/react";
import Link from "next/link";
import {
  getForgotPasswordSchema,
  ForgotPasswordInput,
} from "@/validations/auth.validation";
import { useForgotPassword } from "@/hooks/api/useAuth";
import { AuthLayout, AuthHeader, AuthSubmitButton } from "@/components/auth";
import { StaggerContainer, StaggerItem } from "@/components/ui/animations";
import { ApiResponse, SuccessResponse } from "@/types/api";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthRoutes } from "@/types";
import { FormInput } from "@/components/ui/form/FormInput";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const authT = useTranslations("Auth.ForgotPassword");
  const validationT = useTranslations("Auth.Validation");

  const { mutate: forgotPassword, isPending } = useForgotPassword();

  const { handleSubmit, control } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(getForgotPasswordSchema(validationT)),
  });

  const onSubmit = (data: ForgotPasswordInput) => {
    forgotPassword(data.email, {
      onSuccess: (response: ApiResponse<SuccessResponse>) => {
        addToast({
          title: response.message || authT("resetSent"),
          color: "success",
        });
        const queryParams = new URLSearchParams({ email: data.email });
        if (callbackUrl) queryParams.set("callbackUrl", callbackUrl);
        router.push(`${AuthRoutes.VERIFY_RESET_OTP}?${queryParams.toString()}`);
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
            <FormInput
              name="email"
              control={control}
              type="email"
              placeholder={authT("emailLabel")}
              endContent={
                <MdOutlineMailOutline className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
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

        <StaggerItem>
          <p className="text-center mt-2 text-dark">
            <Link
              href={`${AuthRoutes.LOGIN}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`}
              className="text-primary hover:underline"
            >
              {authT("backToLogin")}
            </Link>
          </p>
        </StaggerItem>
      </StaggerContainer>
    </AuthLayout>
  );
}
