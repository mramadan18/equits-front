"use client";

import React, { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { InputProps } from "@heroui/input";
import { AuthInput } from "./AuthInput";

interface PasswordFieldProps extends InputProps {
  forgotPasswordLink?: React.ReactNode;
}

export const PasswordField = React.forwardRef<
  HTMLInputElement,
  PasswordFieldProps
>(({ forgotPasswordLink, ...props }, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div>
      <AuthInput
        ref={ref}
        type={isVisible ? "text" : "password"}
        {...props}
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <IoEyeOutline className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <IoEyeOffOutline className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
      />
      {forgotPasswordLink && (
        <div className="flex justify-end mt-2">{forgotPasswordLink}</div>
      )}
    </div>
  );
});

PasswordField.displayName = "PasswordField";
