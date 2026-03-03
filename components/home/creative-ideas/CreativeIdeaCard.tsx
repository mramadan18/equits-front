import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Button } from "@heroui/button";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { IoCalendarOutline, IoLocationOutline } from "react-icons/io5";
import { FaHeart, FaStar, FaCommentDots } from "react-icons/fa";
import { CreativeIdea } from "./types";

interface CreativeIdeaCardProps {
  item: CreativeIdea;
}

export const CreativeIdeaCard = ({ item }: CreativeIdeaCardProps) => {
  const t = useTranslations("CreativeIdeas");

  return (
    <Card className="border-none shadow-card hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden bg-white">
      {/* Image Container */}
      <div className="relative w-full h-[220px]">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, (max-width: 1536px) 33vw, 25vw"
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
          <AttributeRow label={t("industry")} items={item.industries} />
          <AttributeRow label={t("type")} items={item.types} />
          <AttributeRow label={t("businessModel")} items={item.businessModel} />
          <AttributeRow label={t("stage")} items={item.stage} />
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
          <Stat
            icon={<FaHeart className="text-red-500" />}
            value={item.likes}
          />
          <Stat
            icon={<FaCommentDots className="text-green-500 text-lg" />}
            value={item.comments}
          />
          <Stat
            icon={<FaStar className="text-orange-400" />}
            value={item.rating}
          />
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
  );
};

const AttributeRow = ({ label, items }: { label: string; items: string[] }) => (
  <div className="flex items-start gap-1">
    <span className="text-xs text-gray2">{label}</span>
    <div className="flex flex-wrap gap-1">
      {items.map((text, idx) => (
        <Chip
          key={idx}
          size="sm"
          className="bg-gray3 text-dark2 font-medium text-xs"
        >
          {text}
        </Chip>
      ))}
    </div>
  </div>
);

const Stat = ({ icon, value }: { icon: React.ReactNode; value: number }) => (
  <div className="flex items-center gap-1.5">
    {icon}
    <span className="text-gray2">{value}</span>
  </div>
);
