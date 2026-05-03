"use client";

import { Autocomplete, AutocompleteProps } from "@heroui/autocomplete";
import { Controller, Control, FieldValues, Path } from "react-hook-form";

interface FormAutocompleteProps<T extends FieldValues>
  extends Omit<AutocompleteProps, "name" | "children"> {
  name: Path<T>;
  control: Control<T>;
  t?: (key: string) => string;
  children: React.ReactNode;
}

export const FormAutocomplete = <T extends FieldValues>({
  name,
  control,
  t,
  children,
  ...props
}: FormAutocompleteProps<T>) => {
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
        <Autocomplete
          {...props}
          selectedKey={field.value?.toString()}
          isInvalid={!!fieldState.error}
          errorMessage={safeTranslate(fieldState.error?.message)}
          onSelectionChange={(key) => {
            const value = key ? (isNaN(Number(key)) ? key : Number(key)) : null;
            field.onChange(value);
          }}
          onBlur={field.onBlur}
        >
          {children as any}
        </Autocomplete>
      )}
    />
  );
};
