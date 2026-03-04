"use client";

import { Button } from "@heroui/button";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { BiRightArrowAlt } from "react-icons/bi";

export default function Talents() {
  const t = useTranslations("Talents");

  return (
    <section className="pt-20 w-full overflow-hidden">
      <div className="container">
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center mb-10">
          <div className="flex items-center gap-2 text-primary">
            <Image
              src="/images/star.png"
              alt="Talents Icon"
              width={20}
              height={20}
            />
            <h2 className="text-lg md:text-xl">{t("section")}</h2>
          </div>
        </div>

        {/* Main Card */}
        <div className="relative w-full rounded-2xl overflow-hidden px-4 min-h-[300px] md:min-h-[400px] flex items-end justify-center text-center pb-10">
          {/* Background Image */}
          <Image
            src="/images/talents_bg.png"
            alt="Talents Background"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />

          {/* Overlay Gradient */}
          <div
            className="absolute inset-0 z-10"
            style={{
              background:
                "linear-gradient(180deg, rgba(0, 82, 155, 0.6) 0%, #003366 100%)",
            }}
          ></div>

          {/* Content */}
          <div className="relative z-20 max-w-5xl">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-6 leading-relaxed">
              {t.rich("title", {
                yellow: (chunks) => (
                  <span className="text-secondary">{chunks}</span>
                ),
              })}
            </h3>

            <p className="text-white text-sm md:text-base lg:text-lg mb-12">
              {t("subtitle")}
            </p>

            <div className="px-10">
              <Button
                fullWidth
                size="lg"
                radius="full"
                className="bg-secondary text-primary font-bold flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-xl mx-auto"
                endContent={
                  <BiRightArrowAlt className="text-2xl md:text-3xl rtl:rotate-180" />
                }
              >
                {t("cta")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
