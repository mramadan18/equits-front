"use client";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { useTranslations } from "next-intl";
import { FaHeart, FaStar, FaCommentDots } from "react-icons/fa";
import { CardImage } from "./components/CardImage";
import { CardHeader } from "./components/CardHeader";
import { AttributeRow } from "./components/AttributeRow";
import { CardInfo } from "./components/CardInfo";
import { Stat } from "./components/Stat";
import Link from "next/link";
import { MainRoutes } from "@/types";
import { Project } from "@/types/api";

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
            items={item.projectTypes.map((type) => ({ name: type }))}
          />
          <AttributeRow
            label={t("businessModel")}
            items={[{ name: item?.revenueModel }]}
          />
          <AttributeRow label={t("stage")} items={[{ name: item?.stage }]} />
        </div>

        <CardInfo date={item.createdAt} location={`${item.serviceArea}`} />

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
