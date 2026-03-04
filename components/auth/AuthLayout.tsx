"use client";

import Image from "next/image";
import { FadeIn } from "../shared/animations";

interface AuthLayoutProps {
  children: React.ReactNode;
  imageSrc: string;
  imageAlt: string;
}

export const AuthLayout = ({
  children,
  imageSrc,
  imageAlt,
}: AuthLayoutProps) => {
  return (
    <div className="container py-8 lg:py-16 flex flex-col md:flex-row justify-center md:justify-between items-center gap-12 lg:gap-24 flex-grow overflow-hidden">
      {/* Form Section */}
      <FadeIn
        x={-50}
        duration={0.7}
        className="w-full md:w-1/2 flex justify-center md:justify-start"
      >
        <div className="w-full max-w-[440px] flex flex-col gap-6">
          {children}
        </div>
      </FadeIn>

      {/* Image Section */}
      <FadeIn
        x={50}
        delay={0.2}
        duration={0.7}
        className="hidden md:flex w-full md:w-1/2 justify-end items-center"
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={600}
          height={600}
          className="object-contain w-full max-w-[500px]"
          priority
        />
      </FadeIn>
    </div>
  );
};
