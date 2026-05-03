"use client";

import { useTranslations } from "next-intl";
import { MdOutlineMailOutline } from "react-icons/md";
import { Link, useRouter } from "@/i18n/navigation";
import {
  AuthLayout,
  AuthHeader,
  SocialButton,
  AuthDivider,
  AuthSubmitButton,
} from "@/components/auth";
import { StaggerContainer, StaggerItem } from "@/components/shared/animations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getLoginSchema, LoginInput } from "@/validations/auth.validation";
import { useLogin, useGoogleLogin } from "@/hooks/api/useAuth";
import { addToast } from "@heroui/toast";
import { useGoogleLogin as useGoogleAuth } from "@react-oauth/google";
import { ApiResponse, AuthResponse } from "@/types/api";
import { AuthRoutes, MainRoutes } from "@/types";
import { FormInput, FormCheckbox } from "@/components/ui/form";

export default function LoginPage() {
  const validationT = useTranslations("Auth.Validation");
  const authT = useTranslations("Auth.Login");
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<LoginInput>({
    mode: "all",
    resolver: zodResolver(getLoginSchema(validationT)),
  });

  const { mutate: login, isPending } = useLogin();
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
          router.push(MainRoutes.HOME);
        },
      });
    },
  });

  const onSubmit = (data: LoginInput) => {
    login(data, {
      onSuccess: (response: ApiResponse<AuthResponse>) => {
        addToast({
          title: response.message || authT("loginSuccess"),
          color: "success",
        });
        router.push(MainRoutes.HOME);
      },
    });
  };

  return (
    <AuthLayout imageSrc="/images/login.png" imageAlt="Login illustration">
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
            <div className="flex items-center justify-between">
              <FormCheckbox
                name="rememberMe"
                control={control}
                size="sm"
                color="primary"
                classNames={{ label: "text-default-600" }}
              >
                {authT("rememberMe", { fallback: "تذكرني" })}
              </FormCheckbox>
              <Link
                href={AuthRoutes.FORGOT_PASSWORD}
                className="text-primary text-sm hover:underline"
              >
                {authT("forgotPassword")}
              </Link>
            </div>
          </StaggerItem>

          <StaggerItem>
            <AuthSubmitButton
              className="mt-2"
              isLoading={isPending}
              isDisabled={!isValid}
            >
              {authT("submit")}
            </AuthSubmitButton>
          </StaggerItem>
        </form>

        <StaggerItem>
          <p className="text-center mt-2 text-dark">
            {authT("noAccount")}{" "}
            <Link
              href={AuthRoutes.REGISTER}
              className="text-primary hover:underline"
            >
              {authT("registerLink")}
            </Link>
          </p>
        </StaggerItem>
      </StaggerContainer>
    </AuthLayout>
  );
}
