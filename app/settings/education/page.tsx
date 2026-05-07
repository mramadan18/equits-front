"use client";

import { EducationDegree } from "@/types/api";
import { IoTrashOutline } from "react-icons/io5";
import {
  FormInput,
  FormSelect,
  FormAutocomplete,
  FormCheckbox,
} from "@/components/ui/form";
import { SettingsFormActions } from "@/components/shared/SettingsFormActions";
import { SettingsPageHeader } from "@/components/shared/SettingsPageHeader";
import { AutocompleteItem, Button, SelectItem } from "@heroui/react";
import { useEducationController } from "@/hooks/ui/useEducationController";
import { useWatch } from "react-hook-form";

export default function EducationSettingsPage() {
  const {
    t,
    universities,
    faculties,
    fields,
    remove,
    handleAddMore,
    setValue,
    control,
    onSubmit,
    handleCancel,
    isPending,
    isDirty,
  } = useEducationController();

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1970 + 11 }, (_, i) =>
    (currentYear + 10 - i).toString(),
  );

  const watchCertificates = useWatch({
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
                  onSelectionChange={(key) => {
                    if (key) {
                      const uni = universities.find(
                        (u) => u.id === Number(key),
                      );
                      if (uni) {
                        // @ts-ignore
                        setValue(`certificates.${index}.universityId`, uni.id, {
                          shouldDirty: true,
                          shouldValidate: true,
                        });
                        setValue(`certificates.${index}.university`, uni.name, {
                          shouldDirty: true,
                          shouldValidate: true,
                        });
                      }
                    } else {
                      setValue(`certificates.${index}.universityId`, null, {
                        shouldDirty: true,
                        shouldValidate: true,
                      });
                    }
                  }}
                >
                  {universities.map((uni) => (
                    <AutocompleteItem key={uni.id} textValue={uni.name}>
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
                  onSelectionChange={(key) => {
                    if (key) {
                      const faculty = faculties.find(
                        (f) => f.id === Number(key),
                      );
                      if (faculty) {
                        // @ts-ignore
                        setValue(
                          `certificates.${index}.facultyId`,
                          faculty.id,
                          {
                            shouldDirty: true,
                            shouldValidate: true,
                          },
                        );
                        setValue(
                          `certificates.${index}.faculty`,
                          faculty.name,
                          {
                            shouldDirty: true,
                            shouldValidate: true,
                          },
                        );
                      }
                    } else {
                      setValue(`certificates.${index}.facultyId`, null, {
                        shouldDirty: true,
                        shouldValidate: true,
                      });
                    }
                  }}
                >
                  {faculties.map((faculty) => (
                    <AutocompleteItem key={faculty.id} textValue={faculty.name}>
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
                    <FormSelect
                      name={`certificates.${index}.startDate`}
                      control={control}
                      label={t("educationForm.startDate")}
                      placeholder="YYYY"
                      labelPlacement="outside"
                      variant="bordered"
                      radius="sm"
                    >
                      {years.map((year) => (
                        <SelectItem key={year} textValue={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </FormSelect>
                    <FormSelect
                      name={`certificates.${index}.endDate`}
                      control={control}
                      label={t("educationForm.endDate")}
                      placeholder="YYYY"
                      labelPlacement="outside"
                      variant="bordered"
                      radius="sm"
                      isDisabled={watchCertificates?.[index]?.present}
                    >
                      {years.map((year) => (
                        <SelectItem key={year} textValue={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </FormSelect>
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
          <Button variant="flat" color="primary" onPress={handleAddMore}>
            + {t("educationForm.addMoreBtn")}
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
