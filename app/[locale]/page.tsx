import Hero from "@/components/home/Hero";
import WhatWeDo from "@/components/home/WhatWeDo";
import CreativeIdeas from "@/components/home/CreativeIdeas";
import Talents from "@/components/home/Talents";
import Wisdom from "@/components/home/Wisdom";
import Opinions from "@/components/home/Opinions";
import Faq from "@/components/home/Faq";
import { fetchServer } from "@/utils/api-utils";
import { Project } from "@/types/api";

export default async function LandingPage() {
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
    <>
      <Hero />
      <WhatWeDo />
      <CreativeIdeas projects={projects} />
      <Wisdom />
      <Talents />
      <Opinions />
      <Faq />
    </>
  );
}
