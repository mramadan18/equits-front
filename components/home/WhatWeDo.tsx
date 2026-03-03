import { useTranslations } from "next-intl";
import { Button } from "@heroui/button";
import { SectionHeader } from "@/components/shared/SectionHeader";

export default function WhatWeDo() {
  const t = useTranslations("WhatWeDo");

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-0 w-full">
          {/* Text Content */}
          <div className="w-full lg:w-[45%] flex flex-col items-center text-center order-2 lg:order-1 px-4 lg:px-0">
            <SectionHeader
              title={t("title")}
              className="mb-6"
              titleClassName="text-gray-900"
              underlineImage="/images/line.png"
              underlineClassName="absolute -bottom-2 left-0 w-36 h-auto"
            />

            <p className="text-gray-700 text-sm md:text-base font-medium leading-relaxed mb-10 w-full">
              {t.rich("description", {
                br: () => <br className="hidden lg:block" />,
              })}
            </p>

            <Button
              className="bg-primary text-white font-bold h-12 px-10 rounded-lg text-lg"
              fullWidth
            >
              {t("startNow")}
            </Button>
          </div>

          {/* Video Content */}
          <div className="w-full lg:w-[50%] order-1 lg:order-2 rounded-2xl overflow-hidden shadow-xl aspect-video bg-gray-100 relative">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/ipV29s_yN_U?autoplay=0&rel=0"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full object-cover"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
