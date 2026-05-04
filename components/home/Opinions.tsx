"use client";

import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Avatar } from "@heroui/avatar";
import { Card, CardBody } from "@heroui/card";
import { FadeIn } from "@/components/shared/animations";

export default function Opinions() {
  const t = useTranslations("Opinions");

  const baseOpinions = [
    {
      id: "ahmed",
      avatar: "",
    },
    {
      id: "jena",
      avatar: "",
    },
    {
      id: "alaa",
      avatar: "",
    },
  ];

  return (
    <section className="py-20 w-full overflow-hidden bg-white">
      <div className="container">
        <FadeIn y={30} duration={0.6}>
          <SectionHeader title={t("title")} />
        </FadeIn>

        <FadeIn
          y={40}
          amount={0.1}
          duration={0.7}
          delay={0.2}
          className="mt-8 px-2 md:px-10"
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            centeredSlides={true}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              bulletActiveClass:
                "swiper-pagination-bullet-active !bg-primary !opacity-100",
            }}
            className="pb-24 h-[300px] md:h-[340px] !flex transition-all duration-300 [&>.swiper-wrapper]:items-center [&_.swiper-pagination]:!bottom-0 [&_.swiper-pagination-bullet]:!w-2 [&_.swiper-pagination-bullet]:!h-[3px] [&_.swiper-pagination-bullet]:!rounded-none [&_.swiper-pagination-bullet]:!bg-primary/30 [&_.swiper-pagination-bullet]:!opacity-100 [&_.swiper-pagination-bullet-active]:!bg-primary"
          >
            {baseOpinions.map((opinion, idx) => {
              return (
                <SwiperSlide
                  key={idx}
                  className="!h-auto !flex transition-all duration-500 scale-90 opacity-50 [&.swiper-slide-active]:scale-100 md:[&.swiper-slide-active]:scale-110 [&.swiper-slide-active]:opacity-100 [&.swiper-slide-active]:z-10 [&.swiper-slide-duplicate-active]:scale-100 md:[&.swiper-slide-duplicate-active]:scale-110 [&.swiper-slide-duplicate-active]:opacity-100 [&.swiper-slide-duplicate-active]:z-10"
                >
                  <Card className="w-full border border-primary/50 shadow-none rounded-2xl p-2 md:p-4 hover:shadow-lg transition-shadow bg-white flex flex-col">
                    <CardBody className="flex flex-col gap-6">
                      {/* Check if translation has the key before rendering */}
                      {(() => {
                        const hasOrg =
                          opinion.id === "jena" || opinion.id === "alaa";
                        return (
                          <div className="flex items-center gap-4">
                            <Avatar
                              src={opinion.avatar}
                              name={t(`cards.${opinion.id}.name`)}
                              showFallback
                              size="lg"
                              className="shrink-0 w-16 h-16 text-large"
                            />
                            <div className="flex flex-col">
                              <h4 className="font-bold text-dark2 text-lg">
                                {t(`cards.${opinion.id}.name`)}
                              </h4>
                              <p className="font-medium text-sm">
                                {t(`cards.${opinion.id}.role`)}
                              </p>
                              {hasOrg && (
                                <p className="text-default-500 text-xs font-semibold">
                                  {t(`cards.${opinion.id}.org`)}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })()}
                      <p className="text-dark2 font-medium text-sm md:text-base leading-relaxed flex-1">
                        {t(`cards.${opinion.id}.quote`)}
                      </p>
                    </CardBody>
                  </Card>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </FadeIn>
      </div>
    </section>
  );
}
