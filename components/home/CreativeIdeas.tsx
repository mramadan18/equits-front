import { CreativeIdeaCard } from "@/components/shared/creative-idea-card";
import { SectionHeader } from "@/components/shared/SectionHeader";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/shared/animations";
import { Project } from "@/types/api";
import SeeMoreButton from "./SeeMoreButton";
import { fetchServer } from "@/utils/api-utils";
import { getTranslations } from "next-intl/server";

export default async function CreativeIdeas() {
  const t = await getTranslations("CreativeIdeas");
  let projects: Project[] = [];

  try {
    const data = await fetchServer<Project[]>("/projects", {
      params: { limit: 3 },
      cache: "no-store",
    });
    projects = data.data || [];
  } catch (error) {
    console.error("Failed to fetch projects for landing page:", error);
  }

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
          {projects.map((item) => (
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
          <SeeMoreButton />
        </FadeIn>
      </div>
    </section>
  );
}
