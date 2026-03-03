import { useTranslations } from "next-intl";
import { Button } from "@heroui/button";
import { FaArrowRight } from "react-icons/fa";
import { MOCK_DATA } from "./constants";
import { CreativeIdeaCard } from "./CreativeIdeaCard";
import { SectionHeader } from "@/components/shared/SectionHeader";

export default function CreativeIdeas() {
  const t = useTranslations("CreativeIdeas");

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="container">
        <SectionHeader title={t("title")} />

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {MOCK_DATA.map((item) => (
            <CreativeIdeaCard key={item.id} item={item} />
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
}
