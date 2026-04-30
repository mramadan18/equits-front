import Hero from "@/components/home/Hero";
import WhatWeDo from "@/components/home/WhatWeDo";
import CreativeIdeas from "@/components/home/CreativeIdeas";
import Talents from "@/components/home/Talents";
import Wisdom from "@/components/home/Wisdom";
import Opinions from "@/components/home/Opinions";
import Faq from "@/components/home/Faq";
import { ApiResponse, Project } from "@/types/api";

export default async function LandingPage() {
  let projects: Project[] = [];

  try {
    const projectsResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects?limit=3`,
      { cache: "no-store" },
    );
    const data: ApiResponse<Project[]> = await projectsResponse.json();
    projects = data.data || [];
  } catch {}
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
