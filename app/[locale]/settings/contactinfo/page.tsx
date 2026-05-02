"use client";
import { useTranslations } from "next-intl";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import {
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  getUpdateContactSchema,
  UpdateContactFormData,
} from "@/validations/profile.validation";
import { useAuthStore } from "@/stores/useAuthStore";
import { useUpdateContact } from "@/hooks/api/useProfile";
import { addToast } from "@heroui/toast";
import { useEffect } from "react";

export default function ContactInfoSettingsPage() {
  const t = useTranslations("Settings");
  const validationT = useTranslations("Auth.Validation");
  const { user, setUser } = useAuthStore();
  const { mutate: updateContact, isPending } = useUpdateContact();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<UpdateContactFormData>({
    mode: "all",
    defaultValues: {
      contactEmail: user?.contactEmail || "",
      phone: user?.phone || "",
      address: user?.address || "",
      facebookUrl: user?.facebookUrl || "",
      linkedinUrl: user?.linkedinUrl || "",
      instagramUrl: user?.instagramUrl || "",
      youtubeUrl: user?.youtubeUrl || "",
    },
    resolver: zodResolver(getUpdateContactSchema(validationT)),
  });

  const onSubmit = (data: UpdateContactFormData) => {
    updateContact(data, {
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
        contactEmail: user.contactEmail || "",
        phone: user.phone || "",
        address: user.address || "",
        facebookUrl: user.facebookUrl || "",
        linkedinUrl: user.linkedinUrl || "",
        instagramUrl: user.instagramUrl || "",
        youtubeUrl: user.youtubeUrl || "",
      });
    }
  };

  useEffect(() => {
    if (user) {
      reset({
        contactEmail: user.contactEmail || "",
        phone: user.phone || "",
        address: user.address || "",
        facebookUrl: user.facebookUrl || "",
        linkedinUrl: user.linkedinUrl || "",
        instagramUrl: user.instagramUrl || "",
        youtubeUrl: user.youtubeUrl || "",
      });
    }
  }, [user, reset]);

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-6">
        <h2 className="text-3xl font-semibold text-dark">
          {t("contactInfoForm.title")}
        </h2>
        <p className="text-gray2">{t("contactInfoForm.description")}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <Input
            label={t("contactInfoForm.contactEmail")}
            placeholder={t("contactInfoForm.contactEmailPlaceholder")}
            labelPlacement="outside"
            variant="bordered"
            radius="sm"
            {...register("contactEmail")}
            isInvalid={!!errors.contactEmail}
            errorMessage={errors.contactEmail?.message}
          />
          <Input
            label={t("contactInfoForm.whatsapp")}
            placeholder={t("contactInfoForm.whatsappPlaceholder")}
            labelPlacement="outside"
            variant="bordered"
            radius="sm"
            {...register("phone")}
            isInvalid={!!errors.phone}
            errorMessage={errors.phone?.message}
          />
          <Input
            label={t("contactInfoForm.address")}
            placeholder={t("contactInfoForm.addressPlaceholder")}
            labelPlacement="outside"
            variant="bordered"
            radius="sm"
            {...register("address")}
            isInvalid={!!errors.address}
            errorMessage={errors.address?.message}
          />
        </div>

        <div className="flex flex-col gap-6 mt-4">
          <p className="text-gray2 text-sm">
            {t("contactInfoForm.socialMedia")}
          </p>

          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 flex items-center justify-center bg-[#0077b5] rounded-lg text-white text-2xl shrink-0">
                <FaLinkedinIn />
              </div>
              <Input
                placeholder={t("contactInfoForm.linkedinPlaceholder")}
                variant="bordered"
                radius="sm"
                className="w-full"
                {...register("linkedinUrl")}
                isInvalid={!!errors.linkedinUrl}
                errorMessage={errors.linkedinUrl?.message}
              />
            </div>

            <div className="flex items-center gap-6">
              <div className="w-12 h-12 flex items-center justify-center bg-[#1877f2] rounded-lg text-white text-2xl shrink-0">
                <FaFacebookF />
              </div>
              <Input
                placeholder={t("contactInfoForm.facebookPlaceholder")}
                variant="bordered"
                radius="sm"
                className="w-full"
                {...register("facebookUrl")}
                isInvalid={!!errors.facebookUrl}
                errorMessage={errors.facebookUrl?.message}
              />
            </div>

            <div className="flex items-center gap-6">
              <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] rounded-lg text-white text-2xl shrink-0">
                <FaInstagram />
              </div>
              <Input
                placeholder={t("contactInfoForm.instagramPlaceholder")}
                variant="bordered"
                radius="sm"
                className="w-full"
                {...register("instagramUrl")}
                isInvalid={!!errors.instagramUrl}
                errorMessage={errors.instagramUrl?.message}
              />
            </div>

            <div className="flex items-center gap-6">
              <div className="w-12 h-12 flex items-center justify-center bg-[#ff0000] rounded-lg text-white text-2xl shrink-0">
                <FaYoutube />
              </div>
              <Input
                placeholder={t("contactInfoForm.youtubePlaceholder")}
                variant="bordered"
                radius="sm"
                className="w-full"
                {...register("youtubeUrl")}
                isInvalid={!!errors.youtubeUrl}
                errorMessage={errors.youtubeUrl?.message}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-6 mt-12">
          <Button variant="bordered" onPress={handleCancel}>
            {t("contactInfoForm.cancel")}
          </Button>
          <Button
            color="primary"
            type="submit"
            isLoading={isPending}
            isDisabled={!isDirty || isPending}
          >
            {t("contactInfoForm.save")}
          </Button>
        </div>
      </form>
    </div>
  );
}
