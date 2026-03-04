import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { useTranslations } from "next-intl";
import { FaHeart, FaStar, FaCommentDots } from "react-icons/fa";

import { CreativeIdea } from "./types";
import { CardImage } from "./components/CardImage";
import { CardHeader } from "./components/CardHeader";
import { AttributeRow } from "./components/AttributeRow";
import { CardInfo } from "./components/CardInfo";
import { Stat } from "./components/Stat";

interface CreativeIdeaCardProps {
  item: CreativeIdea;
}

export const CreativeIdeaCard = ({ item }: CreativeIdeaCardProps) => {
  const t = useTranslations("CreativeIdeas");

  return (
    <Card className="border-none shadow-card hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden bg-white">
      <CardImage image={item.image} title={item.title} />

      <CardBody className="p-4">
        <CardHeader title={item.title} description={item.description} />

        {/* Attributes List */}
        <div className="space-y-4 mb-6">
          <AttributeRow label={t("industry")} items={item.industries} />
          <AttributeRow label={t("type")} items={item.types} />
          <AttributeRow label={t("businessModel")} items={item.businessModel} />
          <AttributeRow label={t("stage")} items={item.stage} />
        </div>

        <CardInfo date={item.date} location={item.location} />

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
