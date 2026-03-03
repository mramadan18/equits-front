import Image from "next/image";
import React from "react";

interface SectionHeaderProps {
  title: React.ReactNode;
  className?: string;
  titleClassName?: string;
  underlineImage?: string;
  underlineClassName?: string;
  showUnderline?: boolean;
}

export const SectionHeader = ({
  title,
  className = "mb-16",
  titleClassName = "text-dark2",
  underlineImage = "/images/line2.png",
  underlineClassName = "absolute -bottom-5 left-0 w-[calc(100%-100px)] h-auto object-fill",
  showUnderline = true,
}: SectionHeaderProps) => {
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      <h2
        className={`text-2xl md:text-3xl font-extrabold mb-4 relative inline-block ${titleClassName}`}
      >
        {title}

        {showUnderline && (
          <Image
            src={underlineImage}
            alt="underline"
            width={250}
            height={5}
            className={underlineClassName}
          />
        )}
      </h2>
    </div>
  );
};
