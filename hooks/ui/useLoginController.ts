"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getLoginSchema, LoginInput } from "@/validations/auth.validation";
import { useLogin, useGoogleLogin } from "@/hooks/api/useAuth";
import { addToast } from "@heroui/react";
import { useGoogleLogin as useGoogleAuth } from "@react-oauth/google";
import { ApiResponse, AuthResponse } from "@/types/api";
import { MainRoutes } from "@/types";

export const useLoginController = () => {
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
