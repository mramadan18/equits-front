"use client";

import { useTranslations } from "next-intl";
import { SelectItem } from "@heroui/select";
import { AutocompleteItem } from "@heroui/autocomplete";
import { useUniversities, useFaculties } from "@/hooks/api/useLookup";
import { useUpdateEducation } from "@/hooks/api/useProfile";
import { EducationDegree } from "@/types/api";
import { useFieldArray } from "react-hook-form";
import {
  getUpdateEducationSchema,
  UpdateEducationFormData,
} from "@/validations/profile.validation";
import { IoTrashOutline } from "react-icons/io5";
import { useSettingsForm } from "@/hooks/ui/useSettingsForm";
import {
  FormInput,
  FormSelect,
  FormAutocomplete,
  FormCheckbox,
} from "@/components/ui/form";
import { SettingsFormActions } from "@/components/shared/SettingsFormActions";
import { SettingsPageHeader } from "@/components/shared/SettingsPageHeader";
import { Button } from "@heroui/button";

export default function EducationSettingsPage() {
  const t = useTranslations("Settings");
  const validationT = useTranslations("Auth.Validation");
  const updateMutation = useUpdateEducation();

  const { data: universitiesRes } = useUniversities();
  const universities = universitiesRes?.data || [];
  const { data: facultiesRes } = useFaculties();
  const faculties = facultiesRes?.data || [];

  const { control, onSubmit, handleCancel, isPending, isDirty } =
    useSettingsForm<UpdateEducationFormData>({
      schema: getUpdateEducationSchema(validationT),
      mutation: updateMutation,
      successMessage: t("overviewForm.saveSuccess"),
      userToForm: (user) => ({
        certificates: user?.educationCertificates?.map((cert: any) => ({
          university: cert.university,
          degree: cert.degree,
          faculty: cert.faculty,
          programLink: cert.programLink || "",
          startDate: cert.startDate ? cert.startDate.split("-")[0] : "",
          endDate: cert.endDate ? cert.endDate.split("-")[0] : "",
          present: cert.present,
        })) || [
          {
            university: "",
            degree: undefined as any,
            faculty: "",
            programLink: "",
            startDate: "",
            endDate: "",
            present: false,
          },
        ],
      }),
      prepareData: (data) => ({
        certificates: data.certificates.map((cert) => ({
          ...cert,
          endDate: cert.present ? null : cert.endDate,
        })),
      }),
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "certificates",
  });

  return (
    <div className="flex flex-col gap-12">
      <SettingsPageHeader
        title={t("educationForm.title")}
        description={t("educationForm.description")}
      />

      <form onSubmit={onSubmit} className="flex flex-col gap-16">
        <div className="flex flex-col gap-12">
          {fields.map((field, index) => (
            <div key={field.id} className="relative flex flex-col gap-10">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-dark">
                  {t("educationForm.certificate")}{" "}
                  {fields.length > 1 && index + 1}
                </h3>
                {fields.length > 1 && (
                  <Button
                    isIconOnly
                    variant="light"
                    color="danger"
                    onPress={() => remove(index)}
                  >
                    <IoTrashOutline size={20} />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <FormAutocomplete
                  name={`certificates.${index}.university`}
                  control={control}
                  label={t("educationForm.university")}
                  placeholder={t("educationForm.university")}
                  labelPlacement="outside"
                  variant="bordered"
                  radius="sm"
                  allowsCustomValue
                >
                  {universities.map((uni) => (
                    <AutocompleteItem key={uni.name} textValue={uni.name}>
                      {uni.name}
                    </AutocompleteItem>
                  ))}
                </FormAutocomplete>

                <FormSelect
                  name={`certificates.${index}.degree`}
                  control={control}
                  label={t("educationForm.degree")}
                  placeholder={t("educationForm.degreePlaceholder")}
                  labelPlacement="outside"
                  variant="bordered"
                  radius="sm"
                >
                  {Object.values(EducationDegree).map((degree) => (
                    <SelectItem
                      key={degree}
                      textValue={t(`educationForm.degrees.${degree}`)}
                    >
                      {t(`educationForm.degrees.${degree}`)}
                    </SelectItem>
                  ))}
                </FormSelect>

                <FormAutocomplete
                  name={`certificates.${index}.faculty`}
                  control={control}
                  label={t("educationForm.faculty")}
                  placeholder={t("educationForm.faculty")}
                  labelPlacement="outside"
                  variant="bordered"
                  radius="sm"
                  allowsCustomValue
                >
                  {faculties.map((faculty) => (
                    <AutocompleteItem
                      key={faculty.name}
                      textValue={faculty.name}
                    >
                      {faculty.name}
                    </AutocompleteItem>
                  ))}
                </FormAutocomplete>

                <FormInput
                  name={`certificates.${index}.programLink`}
                  control={control}
                  label={t("educationForm.programLink")}
                  placeholder={t("educationForm.programLinkPlaceholder")}
                  labelPlacement="outside"
                  variant="bordered"
                  radius="sm"
                />

                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormInput
                      name={`certificates.${index}.startDate`}
                      control={control}
                      label={t("educationForm.startDate")}
                      placeholder="YYYY"
                      labelPlacement="outside"
                      variant="bordered"
                      radius="sm"
                    />
                    <FormInput
                      name={`certificates.${index}.endDate`}
                      control={control}
                      label={t("educationForm.endDate")}
                      placeholder="YYYY"
                      labelPlacement="outside"
                      variant="bordered"
                      radius="sm"
                      isDisabled={fields[index].present}
                    />
                  </div>
                  <FormCheckbox
                    name={`certificates.${index}.present`}
                    control={control}
                  >
                    {t("educationForm.present")}
                  </FormCheckbox>
                </div>
              </div>
              {index < fields.length - 1 && (
                <hr className="border-gray-100 mt-4" />
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-start">
          <Button
            variant="flat"
            color="primary"
            onPress={() =>
              append({
                university: "",
                degree: undefined as any,
                faculty: "",
                programLink: "",
                startDate: "",
                endDate: "",
                present: false,
              })
            }
          >
            + {t("educationForm.addMore")}
          </Button>
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
