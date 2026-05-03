"use client";

import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Select, SelectItem } from "@heroui/select";
import { Divider } from "@heroui/divider";
import { ConfirmModal } from "@/components/shared/ConfirmModal";
import { FormInput } from "@/components/ui/form/FormInput";
import { useAccountSettingsController } from "@/hooks/ui/useAccountSettingsController";

export default function AccountSettingsPage() {
  const {
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
  } = useAccountSettingsController();

  const {
    handleSubmit,
    control,
    formState: { isDirty },
  } = form;

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
            <FormInput
              name="currentPassword"
              control={control}
              label={t("accountForm.currentPassword")}
              type="password"
              variant="bordered"
              radius="sm"
              labelPlacement="outside"
              placeholder="••••••••"
            />
            <div className="hidden md:block" /> {/* Spacer */}
            <FormInput
              name="newPassword"
              control={control}
              label={t("accountForm.newPassword")}
              type="password"
              variant="bordered"
              radius="sm"
              labelPlacement="outside"
              placeholder="••••••••"
            />
            <FormInput
              name="confirmPassword"
              control={control}
              label={t("accountForm.confirmPassword")}
              type="password"
              variant="bordered"
              radius="sm"
              labelPlacement="outside"
              placeholder="••••••••"
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
              value={user?.email || ""}
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
