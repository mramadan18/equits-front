"use client";

import { RadioGroup, RadioGroupProps } from "@heroui/react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { useSafeTranslate } from "@/hooks/ui/useSafeTranslate";

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
  const safeTranslate = useSafeTranslate(t);

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
