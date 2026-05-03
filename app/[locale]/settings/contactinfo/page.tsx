import {
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { FormInput } from "@/components/ui/form";
import { SettingsFormActions } from "@/components/shared/SettingsFormActions";
import { SettingsPageHeader } from "@/components/shared/SettingsPageHeader";
import { useContactInfoController } from "@/hooks/ui/useContactInfoController";

export default function ContactInfoSettingsPage() {
  const { t, control, onSubmit, handleCancel, isPending, isDirty } =
    useContactInfoController();

  return (
    <div className="flex flex-col gap-12">
      <SettingsPageHeader
        title={t("contactInfoForm.title")}
        description={t("contactInfoForm.description")}
      />

      <form onSubmit={onSubmit} className="flex flex-col gap-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <FormInput
            name="contactEmail"
            control={control}
            label={t("contactInfoForm.contactEmail")}
            placeholder={t("contactInfoForm.contactEmailPlaceholder")}
            labelPlacement="outside"
            variant="bordered"
            radius="sm"
          />
          <FormInput
            name="phone"
            control={control}
            label={t("contactInfoForm.whatsapp")}
            placeholder={t("contactInfoForm.whatsappPlaceholder")}
            labelPlacement="outside"
            variant="bordered"
            radius="sm"
          />
          <FormInput
            name="address"
            control={control}
            label={t("contactInfoForm.address")}
            placeholder={t("contactInfoForm.addressPlaceholder")}
            labelPlacement="outside"
            variant="bordered"
            radius="sm"
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
              <FormInput
                name="linkedinUrl"
                control={control}
                placeholder={t("contactInfoForm.linkedinPlaceholder")}
                variant="bordered"
                radius="sm"
                className="w-full"
              />
            </div>

            <div className="flex items-center gap-6">
              <div className="w-12 h-12 flex items-center justify-center bg-[#1877f2] rounded-lg text-white text-2xl shrink-0">
                <FaFacebookF />
              </div>
              <FormInput
                name="facebookUrl"
                control={control}
                placeholder={t("contactInfoForm.facebookPlaceholder")}
                variant="bordered"
                radius="sm"
                className="w-full"
              />
            </div>

            <div className="flex items-center gap-6">
              <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] rounded-lg text-white text-2xl shrink-0">
                <FaInstagram />
              </div>
              <FormInput
                name="instagramUrl"
                control={control}
                placeholder={t("contactInfoForm.instagramPlaceholder")}
                variant="bordered"
                radius="sm"
                className="w-full"
              />
            </div>

            <div className="flex items-center gap-6">
              <div className="w-12 h-12 flex items-center justify-center bg-[#ff0000] rounded-lg text-white text-2xl shrink-0">
                <FaYoutube />
              </div>
              <FormInput
                name="youtubeUrl"
                control={control}
                placeholder={t("contactInfoForm.youtubePlaceholder")}
                variant="bordered"
                radius="sm"
                className="w-full"
              />
            </div>
          </div>
        </div>

        <SettingsFormActions
          isPending={isPending}
          isDirty={isDirty}
          onCancel={handleCancel}
        />
      </form>
    </div>
  );
}
