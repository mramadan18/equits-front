"use client";
import Link from "next/link";
import { Button } from "@heroui/button";
import { useTranslations } from "next-intl";
import { MainRoutes } from "@/types";
import { FaArrowRight } from "react-icons/fa6";

const SeeMoreButton = () => {
  const t = useTranslations("CreativeIdeas");
  return (
    <Button
      as={Link}
      href={MainRoutes.EXPLORE}
      color="primary"
      className="font-semibold flex items-center gap-2 min-w-60 md:min-w-96"
      radius="full"
      endContent={<FaArrowRight className="text-sm rtl:rotate-180" />}
    >
      {t("seeMore")}
    </Button>
  );
};

export default SeeMoreButton;
