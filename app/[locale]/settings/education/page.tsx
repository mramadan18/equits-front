"use client";

import { useTranslations } from "next-intl";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { Button } from "@heroui/button";
import { Checkbox } from "@heroui/checkbox";
import { useUniversities, useFaculties } from "@/hooks/api/useLookup";
import { useAuthStore } from "@/stores/useAuthStore";
import { useUpdateEducation } from "@/hooks/api/useProfile";
import { addToast } from "@heroui/toast";
import { EducationDegree } from "@/types/api";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  getUpdateEducationSchema,
  UpdateEducationFormData,
} from "@/validations/profile.validation";
import { useEffect } from "react";
import { IoTrashOutline } from "react-icons/io5";

export default function EducationSettingsPage() {
  const t = useTranslations("Settings");
  const validationT = useTranslations("Auth.Validation");
  const { user, setUser } = useAuthStore();
  const { mutate: updateEducation, isPending } = useUpdateEducation();

  const { data: universitiesRes } = useUniversities();
  const universities = universitiesRes?.data || [];
  const { data: facultiesRes } = useFaculties();
  const faculties = facultiesRes?.data || [];

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors, isDirty },
  } = useForm<UpdateEducationFormData>({
    mode: "all",
    defaultValues: {
      certificates: user?.educationCertificates?.map((cert) => ({
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
          degree: undefined,
          faculty: "",
          programLink: "",
          startDate: "",
          endDate: "",
          present: false,
        },
      ],
    },
    resolver: zodResolver(getUpdateEducationSchema(validationT)),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "certificates",
  });

  const onSubmit = (data: UpdateEducationFormData) => {
    // Clean up endDate if present is true
    const cleanedData = {
      certificates: data.certificates.map((cert) => ({
        ...cert,
        endDate: cert.present ? null : cert.endDate,
      })),
    };

    updateEducation(cleanedData, {
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
        certificates: user.educationCertificates?.map((cert) => ({
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
            degree: undefined,
            faculty: "",
            programLink: "",
            startDate: "",
            endDate: "",
            present: false,
          },
        ],
      });
    }
  };

  useEffect(() => {
    if (user) {
      reset({
        certificates: user.educationCertificates?.map((cert) => ({
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
            degree: undefined,
            faculty: "",
            programLink: "",
            startDate: "",
            endDate: "",
            present: false,
          },
        ],
      });
    }
  }, [user, reset]);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) =>
    (currentYear - i).toString(),
  );

  const degrees = Object.values(EducationDegree);

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-6">
        <h2 className="text-3xl font-semibold text-dark">
          {t("educationForm.title")}
        </h2>
        <p className="text-gray2">{t("educationForm.description")}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-12">
        <div className="flex flex-col gap-12">
          {fields.map((field, index) => {
            const isPresent = watch(`certificates.${index}.present`);

            return (
              <div key={field.id} className="flex flex-col gap-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-dark">
                    {t("educationForm.educationLabel", { index: index + 1 })}
                  </h3>
                  {fields.length > 1 && (
                    <Button
                      isIconOnly
                      variant="light"
                      color="danger"
                      onPress={() => remove(index)}
                      radius="full"
                    >
                      <IoTrashOutline size={20} />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
                  <Controller
                    name={`certificates.${index}.university`}
                    control={control}
                    render={({ field }) => (
                      <Autocomplete
                        label={t("educationForm.university")}
                        labelPlacement="outside"
                        placeholder={t("educationForm.selectPlaceholder")}
                        variant="bordered"
                        radius="sm"
                        selectedKey={field.value}
                        onSelectionChange={(key) => {
                          field.onChange(key);
                        }}
                        isInvalid={!!errors.certificates?.[index]?.university}
                        errorMessage={
                          errors.certificates?.[index]?.university?.message
                        }
                      >
                        {universities.map((uni) => (
                          <AutocompleteItem key={uni.name} textValue={uni.name}>
                            {uni.name}
                          </AutocompleteItem>
                        ))}
                      </Autocomplete>
                    )}
                  />

                  <Controller
                    name={`certificates.${index}.degree`}
                    control={control}
                    render={({ field }) => (
                      <Select
                        label={t("educationForm.degree")}
                        labelPlacement="outside"
                        placeholder={t("educationForm.selectPlaceholder")}
                        variant="bordered"
                        radius="sm"
                        selectedKeys={field.value ? [field.value] : []}
                        onSelectionChange={(keys) => {
                          const value = Array.from(keys)[0] as EducationDegree;
                          field.onChange(value);
                        }}
                        isInvalid={!!errors.certificates?.[index]?.degree}
                        errorMessage={
                          errors.certificates?.[index]?.degree?.message
                        }
                      >
                        {degrees.map((degree) => (
                          <SelectItem
                            key={degree}
                            textValue={t(`educationForm.degrees.${degree}`)}
                          >
                            {t(`educationForm.degrees.${degree}`)}
                          </SelectItem>
                        ))}
                      </Select>
                    )}
                  />

                  <Controller
                    name={`certificates.${index}.faculty`}
                    control={control}
                    render={({ field }) => (
                      <Autocomplete
                        label={t("educationForm.faculty")}
                        labelPlacement="outside"
                        placeholder={t("educationForm.selectPlaceholder")}
                        variant="bordered"
                        radius="sm"
                        selectedKey={field.value}
                        onSelectionChange={(key) => {
                          field.onChange(key);
                        }}
                        isInvalid={!!errors.certificates?.[index]?.faculty}
                        errorMessage={
                          errors.certificates?.[index]?.faculty?.message
                        }
                      >
                        {faculties.map((fac) => (
                          <AutocompleteItem key={fac.name} textValue={fac.name}>
                            {fac.name}
                          </AutocompleteItem>
                        ))}
                      </Autocomplete>
                    )}
                  />

                  <Input
                    label={t("educationForm.programLink")}
                    placeholder={t("educationForm.programLinkPlaceholder")}
                    labelPlacement="outside"
                    variant="bordered"
                    radius="sm"
                    {...register(`certificates.${index}.programLink`)}
                    isInvalid={!!errors.certificates?.[index]?.programLink}
                    errorMessage={
                      errors.certificates?.[index]?.programLink?.message
                    }
                  />

                  <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 place-items-start gap-x-10 gap-y-10">
                    <Controller
                      name={`certificates.${index}.startDate`}
                      control={control}
                      render={({ field }) => (
                        <Select
                          label={t("educationForm.startDate")}
                          labelPlacement="outside"
                          placeholder={t("educationForm.selectPlaceholder")}
                          variant="bordered"
                          radius="sm"
                          selectedKeys={field.value ? [field.value] : []}
                          onSelectionChange={(keys) => {
                            const value = Array.from(keys)[0] as string;
                            field.onChange(value);
                          }}
                          isInvalid={!!errors.certificates?.[index]?.startDate}
                          errorMessage={
                            errors.certificates?.[index]?.startDate?.message
                          }
                        >
                          {years.map((year) => (
                            <SelectItem key={year} textValue={year}>
                              {year}
                            </SelectItem>
                          ))}
                        </Select>
                      )}
                    />

                    <div className="w-full flex flex-col gap-4">
                      <Controller
                        name={`certificates.${index}.endDate`}
                        control={control}
                        render={({ field }) => (
                          <Select
                            label={t("educationForm.endDate")}
                            labelPlacement="outside"
                            placeholder={t("educationForm.selectPlaceholder")}
                            variant="bordered"
                            radius="sm"
                            isDisabled={isPresent}
                            selectedKeys={field.value ? [field.value] : []}
                            onSelectionChange={(keys) => {
                              const value = Array.from(keys)[0] as string;
                              field.onChange(value);
                            }}
                            isInvalid={!!errors.certificates?.[index]?.endDate}
                            errorMessage={
                              errors.certificates?.[index]?.endDate?.message
                            }
                          >
                            {years.map((year) => (
                              <SelectItem key={year} textValue={year}>
                                {year}
                              </SelectItem>
                            ))}
                          </Select>
                        )}
                      />
                      <Controller
                        name={`certificates.${index}.present`}
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            size="sm"
                            isSelected={field.value}
                            onValueChange={field.onChange}
                            className="text-gray2"
                          >
                            {t("educationForm.present")}
                          </Checkbox>
                        )}
                      />
                    </div>
                  </div>
                </div>
                {index < fields.length - 1 && (
                  <hr className="border-gray-200" />
                )}
              </div>
            );
          })}
        </div>

        <div className="flex flex-col gap-10">
          <Button
            variant="bordered"
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
            className="w-full md:w-fit"
          >
            + {t("educationForm.addEducation")}
          </Button>

          <div className="flex justify-end gap-6 mt-12">
            <Button variant="bordered" onPress={handleCancel}>
              {t("educationForm.cancel")}
            </Button>
            <Button
              color="primary"
              type="submit"
              isLoading={isPending}
              isDisabled={isPending || !isDirty}
            >
              {t("educationForm.save")}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
