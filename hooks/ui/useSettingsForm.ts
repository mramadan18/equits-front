"use client";

import { useEffect } from "react";
import { useForm, DefaultValues, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@/stores/useAuthStore";
import { addToast } from "@heroui/toast";
import { ApiResponse } from "@/types/api";

interface UseSettingsFormOptions<T extends FieldValues> {
  schema: any;
  userToForm: (user: any) => DefaultValues<T>;
  mutation: any;
  successMessage?: string;
  prepareData?: (data: T) => any;
}

export const useSettingsForm = <T extends FieldValues>({
  schema,
  userToForm,
  mutation,
  successMessage,
  prepareData,
}: UseSettingsFormOptions<T>) => {
  const { user, setUser } = useAuthStore();
  const { mutate, isPending } = mutation;

  const form = useForm<T>({
    mode: "all",
    resolver: zodResolver(schema),
    defaultValues: user ? userToForm(user) : undefined,
  });

  const { reset, handleSubmit } = form;

  useEffect(() => {
    if (user) {
      reset(userToForm(user));
    }
  }, [user, reset, userToForm]);

  const onSubmit = (data: T) => {
    const finalData = prepareData ? prepareData(data) : data;
    mutate(finalData, {
      onSuccess: (response: ApiResponse<any>) => {
        setUser(response.data);
        addToast({
          title: successMessage || "Settings updated successfully",
          color: "success",
        });
      },
    });
  };

  const handleCancel = () => {
    if (user) {
      reset(userToForm(user));
    }
  };

  return {
    ...form,
    onSubmit: handleSubmit(onSubmit),
    handleCancel,
    isPending,
    isDirty: form.formState.isDirty,
    isValid: form.formState.isValid,
    user,
  };
};
