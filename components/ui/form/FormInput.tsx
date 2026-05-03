"use client";

import { Input, InputProps } from "@heroui/input";
import { Controller, Control, FieldValues, Path } from "react-hook-form";

interface FormInputProps<T extends FieldValues>
  extends Omit<InputProps, "name"> {
  name: Path<T>;
  control: Control<T>;
  t?: (key: string) => string;
}

export const FormInput = <T extends FieldValues>({
  name,
  control,
  t,
  ...props
}: FormInputProps<T>) => {
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
        <Input
          {...props}
          value={field.value?.toString() || ""}
          isInvalid={!!fieldState.error}
          errorMessage={safeTranslate(fieldState.error?.message)}
          onChange={(e) => {
            if (props.type === "number") {
              const val = e.target.value === "" ? null : Number(e.target.value);
              field.onChange(val);
            } else {
              field.onChange(e);
            }
          }}
          onBlur={field.onBlur}
        />
      )}
    />
  );
};
