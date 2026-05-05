"use client";

import { Textarea, TextAreaProps } from "@heroui/react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";

interface FormTextareaProps<T extends FieldValues>
  extends Omit<TextAreaProps, "name"> {
  name: Path<T>;
  control: Control<T>;
  t?: (key: string) => string;
}

export const FormTextarea = <T extends FieldValues>({
  name,
  control,
  t,
  ...props
}: FormTextareaProps<T>) => {
  const safeTranslate = (key: string | undefined) => {
    if (!key) return "";
    if (t && key.startsWith("Validation.")) {
      return t(key);
    }
    return key;
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Textarea
          {...props}
          value={(field.value as string) || ""}
          isInvalid={!!fieldState.error}
          errorMessage={safeTranslate(fieldState.error?.message)}
          onChange={field.onChange}
          onBlur={field.onBlur}
        />
      )}
    />
  );
};
