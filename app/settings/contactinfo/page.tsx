"use client";
import {
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { AutocompleteItem } from "@heroui/autocomplete";
import { FormInput, FormAutocomplete } from "@/components/ui/form";
import { SettingsFormActions } from "@/components/shared/SettingsFormActions";
import { SettingsPageHeader } from "@/components/shared/SettingsPageHeader";
import { useContactInfoController } from "@/hooks/ui/useContactInfoController";
import { Country, City } from "@/types/api";

export default function ContactInfoSettingsPage() {
  const {
    t,
    control,
    onSubmit,
    handleCancel,
    isPending,
    isDirty,
    countries,
    cities,
    isCountriesLoading,
    isCitiesLoading,
    setValue,
  } = useContactInfoController();

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
          <FormAutocomplete
            name="countryId"
            control={control}
            label={t("contactInfoForm.country")}
            placeholder={t("contactInfoForm.countryPlaceholder")}
            labelPlacement="outside"
            variant="bordered"
            radius="sm"
            isLoading={isCountriesLoading}
            onSelectionChange={() => {
              setValue("cityId", null);
            }}
          >
            {countries.map((country: Country) => (
              <AutocompleteItem key={country.id} textValue={country.name}>
                {country.name}
              </AutocompleteItem>
            ))}
          </FormAutocomplete>

          <FormAutocomplete
            name="cityId"
            control={control}
            label={t("contactInfoForm.city")}
            placeholder={t("contactInfoForm.cityPlaceholder")}
            labelPlacement="outside"
            variant="bordered"
            radius="sm"
            isLoading={isCitiesLoading}
            isDisabled={!cities.length && !isCitiesLoading}
          >
            {cities.map((city: City) => (
              <AutocompleteItem key={city.id} textValue={city.name}>
                {city.name}
              </AutocompleteItem>
            ))}
          </FormAutocomplete>
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
