"use client";

import { Textarea, TextAreaProps } from "@heroui/react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { useSafeTranslate } from "@/hooks/ui/useSafeTranslate";

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
  const safeTranslate = useSafeTranslate(t);

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
