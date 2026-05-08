"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useDeleteMe, useChangePassword } from "@/hooks/api/useAuth";
import { useDisclosure, addToast } from "@heroui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  getChangePasswordSchema,
  ChangePasswordInput,
} from "@/validations/auth.validation";
import { ApiResponse, SuccessResponse } from "@/types/api";
import { useAuthStore } from "@/stores/useAuthStore";

export const useAccountSettingsController = () => {
  const t = useTranslations("Settings");
  const validationT = useTranslations("Auth.Validation");
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { user } = useAuthStore();
  const { mutate: deleteAccount, isPending: isDeletePending } = useDeleteMe();
  const { mutate: changePassword, isPending: isChangePending } =
    useChangePassword();

  const form = useForm<ChangePasswordInput>({
    resolver: zodResolver(getChangePasswordSchema(validationT)),
    mode: "all",
  });

  const handlePasswordSubmit = (data: ChangePasswordInput) => {
    changePassword(data, {
      onSuccess: (response: ApiResponse<SuccessResponse>) => {
        addToast({
          title: response.message,
          color: "success",
        });
        form.reset();
        router.refresh();
      },
    });
  };

  const handleDeleteAccount = () => {
    deleteAccount();
  };

  return {
    t,
    user,
    isOpen,
    onOpen,
    onOpenChange,
    isDeletePending,
    isChangePending,
    form,
    handlePasswordSubmit,
    handleDeleteAccount,
  };
};
