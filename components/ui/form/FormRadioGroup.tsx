"use client";

import { RadioGroup, RadioGroupProps } from "@heroui/radio";
import { Controller, Control, FieldValues, Path } from "react-hook-form";

interface FormRadioGroupProps<T extends FieldValues>
  extends Omit<RadioGroupProps, "name" | "children"> {
  name: Path<T>;
  control: Control<T>;
  t?: (key: string) => string;
  children: React.ReactNode;
}

export const FormRadioGroup = <T extends FieldValues>({
  name,
  control,
  t,
  children,
  ...props
}: FormRadioGroupProps<T>) => {
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
        <RadioGroup
          {...props}
          value={field.value}
          onValueChange={field.onChange}
          isInvalid={!!fieldState.error}
          errorMessage={safeTranslate(fieldState.error?.message)}
        >
          {children}
        </RadioGroup>
      )}
    />
  );
};
