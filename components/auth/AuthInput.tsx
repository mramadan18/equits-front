import { Input, InputProps } from "@heroui/react";
import { forwardRef } from "react";

export const AuthInput = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    return (
      <Input
        ref={ref}
        variant="bordered"
        radius="sm"
        size="lg"
        {...props}
        classNames={{
          inputWrapper:
            "border-default-200 bg-transparent text-default-700 shadow-none",
          ...props.classNames,
        }}
      />
    );
  },
);

AuthInput.displayName = "AuthInput";
