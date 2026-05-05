"use client";

import { Select, SelectProps } from "@heroui/react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";

interface FormSelectProps<T extends FieldValues>
  extends Omit<SelectProps, "name" | "children"> {
  name: Path<T>;
  control: Control<T>;
  t?: (key: string) => string;
  children: React.ReactNode;
}

export const FormSelect = <T extends FieldValues>({
  name,
  control,
  t,
  children,
  ...props
}: FormSelectProps<T>) => {
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
        <Select
          {...props}
          selectedKeys={
            props.selectionMode === "multiple"
              ? new Set((field.value as any[])?.map(String) || [])
              : field.value
                ? [String(field.value)]
                : []
          }
          isInvalid={!!fieldState.error}
          errorMessage={safeTranslate(fieldState.error?.message)}
          onSelectionChange={(selection) => {
            if (props.selectionMode === "multiple") {
              field.onChange(
                Array.from(selection).map((val) =>
                  isNaN(Number(val)) ? val : Number(val),
                ),
              );
            } else {
              const value = Array.from(selection)[0];
              field.onChange(
                isNaN(Number(value)) ? value : value ? Number(value) : null,
              );
            }
          }}
          onBlur={field.onBlur}
        >
          {children as any}
        </Select>
      )}
    />
  );
};
