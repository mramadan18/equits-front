import { useTranslations } from "next-intl";
import { Button } from "@heroui/button";
import { FaArrowRight } from "react-icons/fa";
import { MOCK_DATA } from "@/constants/mockData";
import { CreativeIdeaCard } from "@/components/shared/creative-idea-card";
import { SectionHeader } from "@/components/shared/SectionHeader";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/shared/animations";

export default function CreativeIdeas() {
  const t = useTranslations("CreativeIdeas");

  return (
    <section className="w-full bg-white py-16 md:py-24 overflow-hidden">
      <div className="container">
        <FadeIn y={30} duration={0.6}>
          <SectionHeader title={t("title")} />
        </FadeIn>

        {/* Cards Grid */}
        <StaggerContainer
          staggerDelay={0.15}
          amount={0.1}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
        >
          {MOCK_DATA.map((item) => (
            <StaggerItem key={item.id} y={30}>
              <CreativeIdeaCard item={item} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* See More Button */}
        <FadeIn
          y={20}
          duration={0.6}
          delay={0.4}
          amount={0.5}
          className="flex justify-center mt-28"
        >
          <Button
            color="primary"
            className="font-semibold flex items-center gap-2 min-w-60 md:min-w-96"
            radius="full"
            endContent={<FaArrowRight className="text-sm rtl:rotate-180" />}
          >
            {t("seeMore")}
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
