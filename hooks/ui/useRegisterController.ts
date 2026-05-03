"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
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

export const useRegisterController = () => {
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

  return {
    authT,
    control,
    isPending,
    isGooglePending,
    isValid,
    handleSubmit,
    onSubmit,
    handleGoogleLogin,
  };
};
