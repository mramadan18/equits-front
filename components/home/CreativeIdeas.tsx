"use client";

import { useTranslations } from "next-intl";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import Image from "next/image";
import { IoCalendarOutline, IoLocationOutline } from "react-icons/io5";
import { FaHeart, FaStar, FaArrowRight, FaCommentDots } from "react-icons/fa";

const MOCK_DATA = [
  {
    id: 1,
    image: "/images/idea-1.png",
    title: "Academic Social Media",
    description:
      "Erazon is the new generation of academic social media — a space where learning meets connection — that gives educators all the tools to build a complete online learning environment with courses, content sharing, chats, discussions, and an academic e-commerce marketplace for selling educ...",
    industries: ["Education", "Communication"],
    types: ["Software (SAAS)", "Web App", "Mobile App"],
    businessModel: ["Commission Marketplace"],
    stage: ["MVP (Minimum Viable Product)"],
    date: "23 / 10 / 2025",
    location: "Egypt, Cairo",
    likes: 68,
    comments: 27,
    rating: 4.8,
  },
  {
    id: 2,
    image: "/images/idea-2.png",
    title: "Transportations and logistics system",
    description:
      "Transportation and Logistics System streamlines how educational materials and equipment move between institutions, instructors, and learners — ensuring fast, reliable, and transparent delivery. From managing orders to tracking shipments, it connects all stakeholders in one smart, efficient network bu...",
    industries: ["Education", "Communication"],
    types: ["Software (SAAS)", "Web App", "Mobile App"],
    businessModel: ["Commission Marketplace"],
    stage: ["MVP (Minimum Viable Product)"],
    date: "23 / 10 / 2025",
    location: "Egypt, Cairo",
    likes: 68,
    comments: 27,
    rating: 4.8,
  },
  {
    id: 3,
    image: "/images/idea-3.png",
    title: "Virtual GYM",
    description:
      "Virtual GYM brings fitness to the digital world — an interactive space where users can join live or recorded workouts, track their progress, and connect with professional trainers. It's not just exercise; it's a complete virtual fitness experience that motivates, measures, and maximizes your performance any...",
    industries: ["Education", "Communication"],
    types: ["Software (SAAS)", "Web App", "Mobile App"],
    businessModel: ["Commission Marketplace"],
    stage: ["MVP (Minimum Viable Product)"],
    date: "23 / 10 / 2025",
    location: "Egypt, Cairo",
    likes: 68,
    comments: 27,
    rating: 4.8,
  },
  {
    id: 4,
    image: "/images/idea-2.png",
    title: "Transportations and logistics system",
    description:
      "Transportation and Logistics System streamlines how educational materials and equipment move between institutions, instructors, and learners — ensuring fast, reliable, and transparent delivery. From managing orders to tracking shipments, it connects all stakeholders in one smart, efficient network bu...",
    industries: ["Education", "Communication"],
    types: ["Software (SAAS)", "Web App", "Mobile App"],
    businessModel: ["Commission Marketplace"],
    stage: ["MVP (Minimum Viable Product)"],
    date: "23 / 10 / 2025",
    location: "Egypt, Cairo",
    likes: 68,
    comments: 27,
    rating: 4.8,
  },
];

export const CreativeIdeas = () => {
  const t = useTranslations("CreativeIdeas");

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-extrabold text-dark2 mb-4 relative inline-block">
            {t.rich("title", {
              underline: (chunks) => (
                <span className="inline-block">{chunks}</span>
              ),
            })}

            <Image
              src="/images/line2.png"
              alt="underline"
              width={250}
              height={5}
              className="absolute -bottom-5 left-0 w-[calc(100%-100px)] h-auto object-fill"
            />
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {MOCK_DATA.map((item) => (
            <Card
              key={item.id}
              className="border-none shadow-card hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden bg-white"
            >
              {/* Image Container */}
              <div className="relative w-full h-[220px]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              <CardBody className="p-4">
                <h3 className="text-base font-semibold text-dark2 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray2 text-sm leading-relaxed mb-6 line-clamp-4">
                  {item.description}
                </p>

                {/* Attributes List */}
                <div className="space-y-4 mb-6">
                  {/* Industry */}
                  <div className="flex items-start gap-1">
                    <span className="text-xs text-gray2">{t("industry")}</span>
                    <div className="flex flex-wrap gap-1">
                      {item.industries.map((ind, idx) => (
                        <Chip
                          key={idx}
                          size="sm"
                          className="bg-gray3 text-dark2 font-medium text-xs"
                        >
                          {ind}
                        </Chip>
                      ))}
                    </div>
                  </div>

                  {/* Type */}
                  <div className="flex items-start gap-1">
                    <span className="text-xs text-gray2">{t("type")}</span>
                    <div className="flex flex-wrap gap-1">
                      {item.types.map((type, idx) => (
                        <Chip
                          key={idx}
                          size="sm"
                          className="bg-gray3 text-dark2 font-medium text-xs"
                        >
                          {type}
                        </Chip>
                      ))}
                    </div>
                  </div>

                  {/* Business Model */}
                  <div className="flex items-start gap-1">
                    <span className="text-xs text-gray2">
                      {t("businessModel")}
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {item.businessModel.map((bm, idx) => (
                        <Chip
                          key={idx}
                          size="sm"
                          className="bg-gray3 text-dark2 font-medium text-xs"
                        >
                          {bm}
                        </Chip>
                      ))}
                    </div>
                  </div>

                  {/* Stage */}
                  <div className="flex items-start gap-1">
                    <span className="text-xs text-gray2">{t("stage")}</span>
                    <div className="flex flex-wrap gap-1">
                      {item.stage.map((st, idx) => (
                        <Chip
                          key={idx}
                          size="sm"
                          className="bg-gray3 text-dark2 font-medium text-xs"
                        >
                          {st}
                        </Chip>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Date & Location */}
                <div className="flex items-center gap-6 mb-6 text-sm text-gray2 font-medium">
                  <div className="flex items-center gap-2">
                    <IoCalendarOutline className="text-gray2 text-lg" />
                    <span>{item.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IoLocationOutline className="text-gray2 text-lg" />
                    <span>{item.location}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6 mb-8 text-sm font-semibold">
                  <div className="flex items-center gap-1.5">
                    <FaHeart className="text-red-500" />
                    <span className="text-gray2">{item.likes}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FaCommentDots className="text-green-500 text-lg" />
                    <span className="text-gray2">{item.comments}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FaStar className="text-orange-400" />
                    <span className="text-gray2">{item.rating}</span>
                  </div>
                </div>

                {/* Action Button */}
                <Button
                  variant="bordered"
                  color="primary"
                  fullWidth
                  className="font-semibold"
                  size="md"
                  radius="sm"
                >
                  {t("viewDetails")}
                </Button>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* See More Button */}
        <div className="flex justify-center mt-28">
          <Button
            color="primary"
            className="font-semibold flex items-center gap-2 min-w-60 md:min-w-96"
            radius="full"
            endContent={<FaArrowRight className="text-sm rtl:rotate-180" />}
          >
            {t("seeMore")}
          </Button>
        </div>
      </div>
    </section>
  );
};
