"use client";

import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  getRegisterSchema,
  RegisterInput,
} from "@/validations/auth.validation";
import { useRegister, useGoogleLogin } from "@/hooks/api/useAuth";
import { addToast } from "@heroui/react";
import { useGoogleLogin as useGoogleAuth } from "@react-oauth/google";
import { ApiResponse, AuthResponse } from "@/types/api";
import { AuthRoutes, MainRoutes } from "@/types";

export const useRegisterController = () => {
  const validationT = useTranslations("Auth.Validation");
  const authT = useTranslations("Auth.Register");
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<RegisterInput>({
    mode: "all",
    resolver: zodResolver(getRegisterSchema(validationT)),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
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
          if (response.data.isNewUser) {
            router.push(MainRoutes.INTERESTS);
          } else {
            router.push(callbackUrl || MainRoutes.HOME);
          }
          router.refresh();
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
        if (callbackUrl) {
          router.push(
            `${AuthRoutes.VERIFY_EMAIL}?callbackUrl=${encodeURIComponent(callbackUrl)}`,
          );
        } else {
          router.push(AuthRoutes.VERIFY_EMAIL);
        }
        router.refresh();
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
    searchParamsStr: searchParams.toString(),
  };
};
