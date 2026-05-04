"use client";

import { MdOutlineMailOutline } from "react-icons/md";
import Link from "next/link";
import {
  AuthLayout,
  AuthHeader,
  SocialButton,
  AuthDivider,
  AuthSubmitButton,
} from "@/components/auth";
import { StaggerContainer, StaggerItem } from "@/components/shared/animations";
import { AuthRoutes } from "@/types";
import { FormInput, FormCheckbox } from "@/components/ui/form";
import { useLoginController } from "@/hooks/ui/useLoginController";

export default function LoginPage() {
  const {
    authT,
    control,
    isPending,
    isGooglePending,
    isValid,
    handleSubmit,
    onSubmit,
    handleGoogleLogin,
  } = useLoginController();

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
