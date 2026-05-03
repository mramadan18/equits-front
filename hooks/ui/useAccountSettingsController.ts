"use client";

import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useDeleteMe, useChangePassword } from "@/hooks/api/useAuth";
import { useDisclosure } from "@heroui/modal";
import { addToast } from "@heroui/toast";
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
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { user } = useAuthStore();
  const { mutate: deleteAccount, isPending: isDeletePending } = useDeleteMe();
  const { mutate: changePassword, isPending: isChangePending } =
    useChangePassword();

  const form = useForm<ChangePasswordInput>({
    resolver: zodResolver(getChangePasswordSchema(validationT)),
    mode: "all",
  });

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale as "en" | "ar" });
  };

  const handlePasswordSubmit = (data: ChangePasswordInput) => {
    changePassword(data, {
      onSuccess: (response: ApiResponse<SuccessResponse>) => {
        addToast({
          title: response.message,
          color: "success",
        });
        window.location.reload();
      },
    });
  };

  const handleDeleteAccount = () => {
    deleteAccount();
  };

  return {
    t,
    locale,
    user,
    isOpen,
    onOpen,
    onOpenChange,
    isDeletePending,
    isChangePending,
    form,
    handleLanguageChange,
    handlePasswordSubmit,
    handleDeleteAccount,
  };
};
