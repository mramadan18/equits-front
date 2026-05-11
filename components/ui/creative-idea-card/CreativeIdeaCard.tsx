"use client";
import { Card, CardBody, Button, Chip } from "@heroui/react";
import { useTranslations } from "next-intl";
import { FaHeart, FaStar, FaCommentDots } from "react-icons/fa";
import Link from "next/link";
import dayjs from "dayjs";
import { MainRoutes } from "@/types";
import { Project } from "@/types/api";
import { Stat } from "../Stat";
import Image from "next/image";
import { formatEnum } from "@/utils/formatters";

const AttributeRow = ({ label, items }: { label: string; items?: any[] }) => (
  <div className="flex items-center gap-1">
    <span className="text-xs text-gray2">{label}</span>
    <div className="flex flex-wrap gap-1">
      {items?.map((item, idx) => (
        <Chip
          key={idx}
          size="sm"
          className="bg-gray3 text-dark2 font-medium text-xs"
        >
          {item?.name}
        </Chip>
      ))}
    </div>
  </div>
);

const CardImage = ({
  projectId,
  image,
  title,
}: {
  projectId: number | string;
  image: string;
  title: string;
}) => (
  <div className="relative h-48 w-full group-hover:opacity-90 transition-opacity">
    <Link href={`${MainRoutes.PROJECTS}/${projectId}`}>
      <Image src={image} alt={title} fill className="object-cover" />
    </Link>
  </div>
);

const CardHeader = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <>
    <h3 className="text-base font-semibold text-dark2 mb-3">{title}</h3>
    <p className="text-gray2 text-sm leading-relaxed mb-6 line-clamp-4">
      {description}
    </p>
  </>
);

const CardInfo = ({ date, location }: { date: string; location: string }) => (
  <div className="flex items-center justify-between text-xs text-gray2 mb-4">
    <span>{dayjs(date).format("DD / MM / YYYY")}</span>
    {location ? <span>{location}</span> : null}
  </div>
);

export const CreativeIdeaCard = ({ item }: { item: Project }) => {
  const t = useTranslations("CreativeIdeas");

  return (
    <Card className="border-none shadow-card hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden bg-white">
      <CardImage projectId={item.id} image={item?.cover} title={item.title} />

      <CardBody className="p-4">
        <CardHeader title={item.title} description={item.elevatorPitch} />

        {/* Attributes List */}
        <div className="space-y-4 mb-6">
          <AttributeRow
            label={t("industry")}
            items={[
              { name: item?.industry?.name },
              ...(item?.subIndustries?.map((sub) => ({ name: sub?.name })) ||
                []),
            ]}
          />
          <AttributeRow
            label={t("type")}
            items={item.projectTypes.map((type) => ({
              name: formatEnum(type),
            }))}
          />
          <AttributeRow
            label={t("businessModel")}
            items={[{ name: formatEnum(item?.revenueModel) }]}
          />
          <AttributeRow
            label={t("stage")}
            items={[{ name: formatEnum(item?.stage) }]}
          />
        </div>

        <CardInfo
          date={item.createdAt}
          location={formatEnum(item.serviceArea as string)}
        />

        {/* Stats */}
        <div className="flex items-center gap-6 mb-8 text-sm font-semibold">
          <Stat
            icon={<FaHeart className="text-red-500" />}
            value={item.likesCount || 0}
          />
          <Stat
            icon={<FaCommentDots className="text-green-500 text-lg" />}
            value={item.commentsCount || 0}
          />
          <Stat
            icon={<FaStar className="text-orange-400" />}
            value={item.rating || 0}
          />
        </div>

        {/* Action Button */}
        <Button
          as={Link}
          href={`${MainRoutes.PROJECTS}/${item.id}`}
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
