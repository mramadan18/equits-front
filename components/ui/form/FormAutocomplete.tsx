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
          {...(props.allowsCustomValue
            ? { inputValue: field.value || "" }
            : { selectedKey: field.value?.toString() || null })}
          isInvalid={!!fieldState.error}
          errorMessage={safeTranslate(fieldState.error?.message)}
          onInputChange={(value) => {
            if (props.allowsCustomValue) {
              field.onChange(value);
            }
            props.onInputChange?.(value);
          }}
          onSelectionChange={(key) => {
            let value: any = key;
            if (key !== null && !isNaN(Number(key))) {
              value = Number(key);
            }

            const finalValue =
              key !== null
                ? value
                : props.allowsCustomValue
                  ? field.value
                  : null;

            field.onChange(finalValue);
            props.onSelectionChange?.(key);
          }}
          onBlur={field.onBlur}
        >
          {children as any}
        </Autocomplete>
      )}
    />
  );
};
