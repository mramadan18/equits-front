"use client";

import { useTranslations } from "next-intl";
import { Input, Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { RadioGroup, Radio } from "@heroui/radio";
import { useAuthStore } from "@/stores/useAuthStore";
import { useUpdateOverview } from "@/hooks/api/useProfile";
import { addToast } from "@heroui/toast";
import { UserType } from "@/types/api";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  getUpdateOverviewSchema,
  UpdateOverviewFormData,
} from "@/validations/profile.validation";
import { useEffect } from "react";

export default function OverviewSettingsPage() {
  const t = useTranslations("Settings");
  const validationT = useTranslations("Auth.Validation");
  const { user, setUser } = useAuthStore();
  const { mutate: updateOverview, isPending } = useUpdateOverview();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isDirty },
  } = useForm<UpdateOverviewFormData>({
    mode: "all",
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      userType: user?.userType as UserType,
      overview: user?.overview || "",
      videoLink: user?.videoLink || "",
    },
    resolver: zodResolver(getUpdateOverviewSchema(validationT)),
  });

  const onSubmit = (data: UpdateOverviewFormData) => {
    updateOverview(data, {
      onSuccess: (response) => {
        setUser(response.data);
        addToast({
          title:
            t("overviewForm.saveSuccess") || "Profile updated successfully",
          color: "success",
        });
      },
      onError: () => {
        addToast({
          title: t("overviewForm.saveError") || "Failed to update profile",
          color: "danger",
        });
      },
    });
  };

  const handleCancel = () => {
    if (user) {
      reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        userType: user.userType as UserType,
        overview: user.overview || "",
        videoLink: user.videoLink || "",
      });
    }
  };

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        userType: user.userType as UserType,
        overview: user.overview || "",
        videoLink: user.videoLink || "",
      });
    }
  }, [user, reset]);

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-6">
        <h2 className="text-3xl font-semibold text-dark">
          {t("overviewForm.title")}
        </h2>
        <div className="flex flex-col gap-2">
          <p className="text-gray2">{t("overviewForm.description")}</p>
          <ul className="list-disc list-inside text-gray2 text-sm ml-2">
            <li>{t("overviewForm.bullet1")}</li>
            <li>{t("overviewForm.bullet2")}</li>
            <li>{t("overviewForm.bullet3")}</li>
          </ul>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label={t("overviewForm.firstName")}
            placeholder={t("overviewForm.firstNamePlaceholder")}
            labelPlacement="outside"
            variant="bordered"
            size="lg"
            radius="sm"
            {...register("firstName")}
            isInvalid={!!errors.firstName}
            errorMessage={errors.firstName?.message}
          />
          <Input
            label={t("overviewForm.lastName")}
            placeholder={t("overviewForm.lastNamePlaceholder")}
            labelPlacement="outside"
            variant="bordered"
            size="lg"
            radius="sm"
            {...register("lastName")}
            isInvalid={!!errors.lastName}
            errorMessage={errors.lastName?.message}
          />
        </div>

        <Controller
          name="userType"
          control={control}
          render={({ field }) => (
            <RadioGroup
              label={t("overviewForm.userType")}
              orientation="horizontal"
              value={field.value}
              onValueChange={field.onChange}
              isInvalid={!!errors.userType}
              errorMessage={errors.userType?.message}
            >
              <Radio value={UserType.TALENT}>{t("overviewForm.talent")}</Radio>
              <Radio value={UserType.INVESTOR}>
                {t("overviewForm.investor")}
              </Radio>
            </RadioGroup>
          )}
        />

        <Textarea
          label={t("overviewForm.overview")}
          placeholder={t("overviewForm.overviewPlaceholder")}
          labelPlacement="outside"
          variant="bordered"
          size="lg"
          radius="sm"
          minRows={6}
          {...register("overview")}
          isInvalid={!!errors.overview}
          errorMessage={errors.overview?.message}
        />

        <Input
          label={t("overviewForm.videoLink")}
          placeholder={t("overviewForm.videoLinkPlaceholder")}
          labelPlacement="outside"
          variant="bordered"
          size="lg"
          radius="sm"
          {...register("videoLink")}
          isInvalid={!!errors.videoLink}
          errorMessage={errors.videoLink?.message}
        />

        <div className="flex justify-end gap-6 mt-12">
          <Button variant="bordered" onClick={handleCancel}>
            {t("overviewForm.cancel")}
          </Button>
          <Button
            color="primary"
            type="submit"
            isLoading={isPending}
            isDisabled={isPending || !isDirty}
          >
            {t("overviewForm.save")}
          </Button>
        </div>
      </form>
    </div>
  );
}
