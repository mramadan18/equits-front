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
import {
  getRegisterSchema,
  RegisterInput,
} from "@/validations/auth.validation";
import { useRegister, useGoogleLogin } from "@/hooks/api/useAuth";
import { addToast } from "@heroui/toast";
import { useGoogleLogin as useGoogleAuth } from "@react-oauth/google";
import { ApiResponse, AuthResponse } from "@/types/api";
import { AuthRoutes, MainRoutes } from "@/types";
import { FormInput } from "@/components/ui/form/FormInput";

export default function RegisterPage() {
  const validationT = useTranslations("Auth.Validation");
  const authT = useTranslations("Auth.Register");
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { isValid },
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
          router.push(MainRoutes.HOME);
        },
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
        router.push(AuthRoutes.VERIFY_EMAIL);
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
              <FormInput
                name="firstName"
                control={control}
                type="text"
                placeholder={authT("firstName")}
                variant="bordered"
                radius="sm"
                size="lg"
                classNames={{
                  inputWrapper:
                    "border-default-200 bg-transparent text-default-700 shadow-none",
                }}
              />
              <FormInput
                name="lastName"
                control={control}
                type="text"
                placeholder={authT("lastName")}
                variant="bordered"
                radius="sm"
                size="lg"
                classNames={{
                  inputWrapper:
                    "border-default-200 bg-transparent text-default-700 shadow-none",
                }}
              />
            </div>
          </StaggerItem>

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
            <Link
              href={AuthRoutes.LOGIN}
              className="text-primary hover:underline"
            >
              {authT("loginLink")}
            </Link>
          </p>
        </StaggerItem>
      </StaggerContainer>
    </AuthLayout>
  );
}
