"use client";

import { useTranslations, useLocale } from "next-intl";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Select, SelectItem } from "@heroui/select";
import { Divider } from "@heroui/divider";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useDeleteMe, useChangePassword } from "@/hooks/api/useAuth";
import { useDisclosure } from "@heroui/modal";
import { ConfirmModal } from "@/components/shared/ConfirmModal";
import { addToast } from "@heroui/toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  getChangePasswordSchema,
  ChangePasswordInput,
} from "@/validations/auth.validation";
import { ApiResponse, SuccessResponse } from "@/types/api";
import { useAuthStore } from "@/stores/useAuthStore";
import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

export default function AccountSettingsPage() {
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

  const [isVisibleCurrent, setIsVisibleCurrent] = useState(false);
  const [isVisibleNew, setIsVisibleNew] = useState(false);
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);

  const toggleVisibilityCurrent = () => setIsVisibleCurrent(!isVisibleCurrent);
  const toggleVisibilityNew = () => setIsVisibleNew(!isVisibleNew);
  const toggleVisibilityConfirm = () => setIsVisibleConfirm(!isVisibleConfirm);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<ChangePasswordInput>({
    resolver: zodResolver(getChangePasswordSchema(validationT)),
    mode: "all",
  });

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale as "en" | "ar" });
  };

  const handlePasswordSubmit = (data: ChangePasswordInput) => {
    changePassword(data, {
      onSuccess: (data: ApiResponse<SuccessResponse>) => {
        addToast({
          title: data.message,
          color: "success",
        });
        window.location.reload();
      },
      onError: (error: any) => {
        addToast({
          title: error.response.data.message || "Failed to update password",
          color: "danger",
        });
      },
    });
  };

  const handleDeleteAccount = () => {
    deleteAccount(undefined, {
      onError: () => {
        addToast({
          title: "Failed to delete account",
          color: "danger",
        });
      },
    });
  };

  return (
    <div className="flex flex-col gap-12">
      {/* Header */}
      <div className="flex flex-col gap-6">
        <h2 className="text-3xl font-semibold text-dark">
          {t("accountForm.title")}
        </h2>
        <p className="text-gray2">{t("accountForm.description")}</p>
      </div>

      <div className="flex flex-col gap-10">
        {/* Password Section */}
        <form
          onSubmit={handleSubmit(handlePasswordSubmit)}
          className="flex flex-col gap-6"
        >
          <h3 className="text-xl font-semibold text-dark">
            {t("accountForm.passwordSection")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label={t("accountForm.currentPassword")}
              type={isVisibleCurrent ? "text" : "password"}
              variant="bordered"
              radius="sm"
              labelPlacement="outside"
              placeholder="••••••••"
              {...register("currentPassword")}
              isInvalid={!!errors.currentPassword}
              errorMessage={errors.currentPassword?.message}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibilityCurrent}
                  aria-label="toggle password visibility"
                >
                  {isVisibleCurrent ? (
                    <IoEyeOffOutline className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <IoEyeOutline className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
            />
            <div className="hidden md:block" /> {/* Spacer */}
            <Input
              label={t("accountForm.newPassword")}
              type={isVisibleNew ? "text" : "password"}
              variant="bordered"
              radius="sm"
              labelPlacement="outside"
              placeholder="••••••••"
              {...register("newPassword")}
              isInvalid={!!errors.newPassword}
              errorMessage={errors.newPassword?.message}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibilityNew}
                  aria-label="toggle password visibility"
                >
                  {isVisibleNew ? (
                    <IoEyeOffOutline className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <IoEyeOutline className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
            />
            <Input
              label={t("accountForm.confirmPassword")}
              type={isVisibleConfirm ? "text" : "password"}
              variant="bordered"
              radius="sm"
              labelPlacement="outside"
              placeholder="••••••••"
              {...register("confirmPassword")}
              isInvalid={!!errors.confirmPassword}
              errorMessage={errors.confirmPassword?.message}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibilityConfirm}
                  aria-label="toggle password visibility"
                >
                  {isVisibleConfirm ? (
                    <IoEyeOffOutline className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <IoEyeOutline className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
            />
          </div>
          <div className="flex justify-start">
            <Button
              color="primary"
              type="submit"
              isLoading={isChangePending}
              isDisabled={!isDirty || isChangePending}
            >
              {t("accountForm.save")}
            </Button>
          </div>
        </form>

        <Divider />

        {/* Email Section */}
        <div className="flex flex-col gap-6">
          <h3 className="text-xl font-semibold text-dark">
            {t("accountForm.emailSection")}
          </h3>
          <div className="max-w-md">
            <Input
              label={t("accountForm.newEmail")}
              type="email"
              variant="bordered"
              radius="sm"
              labelPlacement="outside"
              readOnly
              placeholder="example@email.com"
              value={user?.email}
            />
          </div>
          <div className="flex justify-start">
            <Button color="primary" isDisabled>
              {t("accountForm.save")}
            </Button>
          </div>
        </div>

        <Divider />

        {/* Language Section */}
        <div className="flex flex-col gap-6">
          <h3 className="text-xl font-semibold text-dark">
            {t("accountForm.languageSection")}
          </h3>
          <div className="max-w-md">
            <Select
              label={t("accountForm.language")}
              labelPlacement="outside"
              variant="bordered"
              radius="sm"
              selectedKeys={[locale]}
              onSelectionChange={(keys) => {
                const val = Array.from(keys)[0] as string;
                handleLanguageChange(val);
              }}
            >
              <SelectItem key="en" textValue="English">
                English
              </SelectItem>
              <SelectItem key="ar" textValue="العربية">
                العربية
              </SelectItem>
            </Select>
          </div>
        </div>

        <Divider />

        {/* Danger Zone */}
        <div className="flex flex-col gap-6 p-6 border-2 border-danger/20 rounded-xl bg-danger/5">
          <div className="flex flex-col gap-2">
            {/* <h3 className="text-xl font-semibold text-danger">
              {t("accountForm.dangerZone")}
            </h3> */}
            <p className="text-gray2 text-sm">
              {t("accountForm.deleteAccountDescription")}
            </p>
          </div>
          <div className="flex justify-start">
            <Button color="danger" variant="flat" onPress={onOpen}>
              {t("accountForm.deleteButton")}
            </Button>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title={t("accountForm.deleteAccount")}
        description={t("accountForm.deleteAccountDescription")}
        confirmLabel={t("accountForm.deleteButton")}
        cancelLabel={t("accountForm.cancel")}
        onConfirm={handleDeleteAccount}
        isLoading={isDeletePending}
      />
    </div>
  );
}
