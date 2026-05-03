"use client";

import { useRef } from "react";
import Image from "next/image";
import { HiOutlineCloudArrowUp } from "react-icons/hi2";
import { useUploadSingle } from "@/hooks/api/useUpload";
import { addToast } from "@heroui/toast";
import { Spinner } from "@heroui/spinner";
import { FiFile } from "react-icons/fi";
import { useTranslations } from "next-intl";

export interface FileUploaderProps {
  label: string;
  subLabel?: string;
  placeholder?: string;
  value?: string;
  onChange: (url: string) => void;
  isInvalid?: boolean;
  errorMessage?: string;
  accept?: string;
}

export const FileUploader = ({
  label,
  subLabel,
  placeholder,
  value,
  onChange,
  isInvalid,
  errorMessage,
  accept = "image/*",
}: FileUploaderProps) => {
  const t = useTranslations("FileUploader");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: upload, isPending } = useUploadSingle();

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      upload(
        { file, folder: "projects" },
        {
          onSuccess: (response) => {
            onChange(response.data.url);
          },
          onError: () => {
            addToast({
              title: t("errorTitle"),
              description: t("errorDescription"),
              color: "danger",
            });
          },
        },
      );
    }
  };

  const isPdf = value?.toLowerCase().endsWith(".pdf");

  return (
    <div className="space-y-1 flex-1">
      <div className="flex items-center gap-1">
        <span className="text-sm text-dark">{label}</span>
        {subLabel && <span className="text-sm text-gray-400">{subLabel}</span>}
      </div>
      <div
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={`relative group h-32 w-full bg-[#F3F4F6] rounded-xl border cursor-pointer flex flex-col items-center justify-center gap-2 transition-all overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${isInvalid ? "border-danger" : "border-transparent hover:border-foreground"}`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept={accept}
        />
        {isPending ? (
          <Spinner size="sm" />
        ) : value ? (
          isPdf ? (
            <div className="flex flex-col items-center justify-center">
              <FiFile className="w-8 h-8 text-primary" />
              <span className="text-xs mt-2 text-dark font-medium">
                {value.split("/").pop()}
              </span>
            </div>
          ) : (
            <Image
              src={value}
              alt={label}
              fill
              className="object-cover"
              unoptimized
            />
          )
        ) : (
          <div className="flex flex-col items-center justify-center pt-5 pb-6 group">
            <HiOutlineCloudArrowUp className="w-8 h-8 mb-4 text-gray2 group-hover:text-dark transition-colors" />
            <p className="mb-2 text-sm text-gray2 group-hover:text-dark transition-colors">
              <span className="font-semibold text-gray2 group-hover:text-dark transition-colors">
                {placeholder || t("browse")}
              </span>
            </p>
          </div>
        )}
      </div>
      {isInvalid && errorMessage && (
        <span className="text-xs text-danger">{errorMessage}</span>
      )}
    </div>
  );
};
