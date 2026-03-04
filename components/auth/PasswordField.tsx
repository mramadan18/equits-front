"use client";

import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { AuthInput } from "./AuthInput";

interface PasswordFieldProps {
  placeholder: string;
  forgotPasswordLink?: React.ReactNode;
}

export const PasswordField = ({
  placeholder,
  forgotPasswordLink,
}: PasswordFieldProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div>
      <AuthInput
        type={isVisible ? "text" : "password"}
        placeholder={placeholder}
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
};
