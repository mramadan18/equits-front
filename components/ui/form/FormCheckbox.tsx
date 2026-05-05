"use client";

import { Checkbox, CheckboxProps } from "@heroui/react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";

interface FormCheckboxProps<T extends FieldValues>
  extends Omit<CheckboxProps, "name" | "children"> {
  name: Path<T>;
  control: Control<T>;
  t?: (key: string) => string;
  children?: React.ReactNode;
}

export const FormCheckbox = <T extends FieldValues>({
  name,
  control,
  children,
  ...props
}: FormCheckboxProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Checkbox
          {...props}
          isSelected={field.value}
          onValueChange={field.onChange}
          isInvalid={!!fieldState.error}
        >
          {children}
        </Checkbox>
      )}
    />
  );
};
