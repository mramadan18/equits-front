"use client";

import { useTranslations } from "next-intl";
import { MdOutlineMailOutline } from "react-icons/md";
import { Link, useRouter } from "@/i18n/navigation";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  getRegisterSchema,
  RegisterInput,
} from "@/validations/auth.validation";
import { useRegister, useGoogleLogin } from "@/hooks/api/useAuth";
import { addToast } from "@heroui/toast";
import { useGoogleLogin as useGoogleAuth } from "@react-oauth/google";
import { ApiResponse, AuthResponse } from "@/types/api";
import { ApiError } from "@/types/error";

export default function RegisterPage() {
  const validationT = useTranslations("Auth.Validation");
  const authT = useTranslations("Auth.Register");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterInput>({
    mode: "all",
    resolver: zodResolver(getRegisterSchema(validationT)),
  });

  const { mutate: signUp, isPending } = useRegister();
  const { mutate: googleLogin, isPending: isGooglePending } = useGoogleLogin();

  const handleGoogleLogin = useGoogleAuth({
    flow: "auth-code",
    onSuccess: (codeResponse) => {
      googleLogin(codeResponse.code, {
        onSuccess: (response: ApiResponse<AuthResponse>) => {
          addToast({
            title: response.message || "Logged in with Google successfully",
            color: "success",
          });
          router.push("/");
        },
        onError: (error: ApiError) => {
          addToast({
            title:
              error.response?.data?.message || "Google registration failed",
            color: "danger",
          });
        },
      });
    },
    onError: () => {
      addToast({
        title: "Google Login Failed",
        color: "danger",
      });
    },
  });

  const onSubmit = (data: RegisterInput) => {
    signUp(data, {
      onSuccess: (response: ApiResponse<AuthResponse>) => {
        addToast({
          title: response.message || authT("registerSuccess"),
          color: "success",
        });
        router.push("/verify-email");
      },
      onError: (error: ApiError) => {
        addToast({
          title: error.response?.data?.message || "Registration failed",
          color: "danger",
        });
      },
    });
  };

  return (
    <AuthLayout
      imageSrc="/images/register.png"
      imageAlt="Register illustration"
    >
      <StaggerContainer delay={0.3} className="flex flex-col gap-6">
        <StaggerItem>
          <AuthHeader title={authT("title")} subtitle={authT("subtitle")} />
        </StaggerItem>

        <StaggerItem>
          <SocialButton
            text={authT("continueGoogle")}
            onPress={() => handleGoogleLogin()}
            isLoading={isGooglePending}
          />
        </StaggerItem>

        <StaggerItem>
          <AuthDivider text={authT("or")} />
        </StaggerItem>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <StaggerItem>
            <div className="flex gap-4">
              <AuthInput
                type="text"
                placeholder={authT("firstName")}
                {...register("firstName")}
                isInvalid={!!errors.firstName}
                errorMessage={errors.firstName?.message}
              />
              <AuthInput
                type="text"
                placeholder={authT("lastName")}
                {...register("lastName")}
                isInvalid={!!errors.lastName}
                errorMessage={errors.lastName?.message}
              />
            </div>
          </StaggerItem>

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
            <PasswordField
              placeholder={authT("passwordLabel")}
              {...register("password")}
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
            />
          </StaggerItem>

          <StaggerItem>
            <AuthSubmitButton
              className="mt-4"
              isLoading={isPending}
              isDisabled={!isValid}
            >
              {authT("submit")}
            </AuthSubmitButton>
          </StaggerItem>
        </form>

        <StaggerItem>
          <p className="text-center mt-2 text-dark">
            {authT("hasAccount")}{" "}
            <Link href="/login" className="text-primary hover:underline">
              {authT("loginLink")}
            </Link>
          </p>
        </StaggerItem>
      </StaggerContainer>
    </AuthLayout>
  );
}
