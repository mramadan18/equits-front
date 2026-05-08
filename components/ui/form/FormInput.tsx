"use client";

import { Input, InputProps } from "@heroui/react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useSafeTranslate } from "@/hooks/ui/useSafeTranslate";

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
  const [isVisible, setIsVisible] = useState(false);
  const isPassword = props.type === "password";

  const toggleVisibility = () => setIsVisible(!isVisible);

  const safeTranslate = useSafeTranslate(t);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Input
          {...props}
          type={isPassword && isVisible ? "text" : props.type}
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
          endContent={
            isPassword ? (
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
                aria-label="toggle password visibility"
              >
                {isVisible ? (
                  <IoEyeOffOutline className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <IoEyeOutline className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            ) : (
              props.endContent
            )
          }
        />
      )}
    />
  );
};
