"use client";

import { useTranslations } from "next-intl";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const t = useTranslations("Auth.Register");
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="container py-8 lg:py-16 flex flex-col md:flex-row justify-center md:justify-between items-center gap-12 lg:gap-24 flex-grow">
      {/* Form Section */}
      <div className="w-full md:w-1/2 flex justify-center md:justify-start">
        <div className="w-full max-w-[440px] flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-bold text-black dark:text-white leading-tight">
              {t("title")}
            </h1>
            <p className="text-gray2 mt-1">{t("subtitle")}</p>
          </div>

          <Button
            variant="bordered"
            size="lg"
            radius="sm"
            className="w-full relative border-default-200 bg-transparent font-medium"
          >
            <FcGoogle className="text-xl absolute start-4" />
            <span className="font-bold text-gray text-sm select-none">
              {t("continueGoogle")}
            </span>
          </Button>

          <div className="flex items-center gap-4 text-default-400 text-sm py-2">
            <div className="flex-1 h-px bg-gray2"></div>
            <span className="select-none">{t("or")}</span>
            <div className="flex-1 h-px bg-gray2"></div>
          </div>

          <form className="flex flex-col gap-4">
            <div className="flex gap-4">
              <Input
                type="text"
                placeholder={t("firstName")}
                variant="bordered"
                radius="sm"
                size="lg"
                classNames={{
                  inputWrapper:
                    "border-default-200 bg-transparent text-default-700 shadow-none",
                }}
              />
              <Input
                type="text"
                placeholder={t("lastName")}
                variant="bordered"
                radius="sm"
                size="lg"
                classNames={{
                  inputWrapper:
                    "border-default-200 bg-transparent text-default-700 shadow-none",
                }}
              />
            </div>

            <Input
              type="email"
              placeholder={t("emailLabel")}
              variant="bordered"
              radius="sm"
              size="lg"
              classNames={{
                inputWrapper:
                  "border-default-200 bg-transparent text-default-700 shadow-none",
              }}
              endContent={
                <MdOutlineMailOutline className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
            />

            <Input
              type={isVisible ? "text" : "password"}
              placeholder={t("passwordLabel")}
              variant="bordered"
              radius="sm"
              size="lg"
              classNames={{
                inputWrapper:
                  "border-default-200 bg-transparent text-default-700 shadow-none",
              }}
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

            <Button
              className="font-bold mt-4"
              fullWidth
              color="primary"
              size="lg"
              radius="sm"
            >
              {t("submit")}
            </Button>
          </form>

          <p className="text-center font-medium mt-2 text-dark">
            {t("hasAccount")}{" "}
            <Link href="/login" className="text-primary hover:underline">
              {t("loginLink")}
            </Link>
          </p>
        </div>
      </div>

      {/* Image Section */}
      <div className="hidden md:flex w-full md:w-1/2 justify-end items-center">
        <Image
          src="/images/register.png"
          alt="Register illustration"
          width={600}
          height={600}
          className="object-contain w-full max-w-[500px]"
          priority
        />
      </div>
    </div>
  );
}
