"use client";

import { FileUploader, FileUploaderProps } from "@/components/ui/FileUploader";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { useSafeTranslate } from "@/hooks/ui/useSafeTranslate";

interface FormFileUploaderProps<T extends FieldValues>
  extends Omit<FileUploaderProps, "value" | "onChange"> {
  name: Path<T>;
  control: Control<T>;
  t?: (key: string) => string;
}

export const FormFileUploader = <T extends FieldValues>({
  name,
  control,
  t,
  label,
  ...props
}: FormFileUploaderProps<T>) => {
  const safeTranslate = useSafeTranslate(t);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FileUploader
          label={label}
          {...props}
          value={field.value as string}
          onChange={field.onChange}
          isInvalid={!!fieldState.error}
          errorMessage={safeTranslate(fieldState.error?.message)}
        />
      )}
    />
  );
};
