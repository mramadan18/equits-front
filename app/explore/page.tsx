import { Metadata } from "next";
import { fetchServer } from "@/utils/api-utils";
import ExploreClient from "./ExploreClient";
import { Project } from "@/types/api";

export const metadata: Metadata = {
  title: "Explore Projects",
  description:
    "Browse innovative startup ideas and projects on Equits. Filter by industry, stage, funding, and more.",
  alternates: { canonical: "/explore" },
};

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;

  const filters = {
    search: (resolvedParams.search as string) || undefined,
    industryId: (resolvedParams.industryId as string) || undefined,
    stage: (resolvedParams.stage as string) || undefined,
    fundingAsk: (resolvedParams.fundingAsk as string) || undefined,
    isAcademic: (resolvedParams.isAcademic as string) || undefined,
    rating: (resolvedParams.rating as string) || undefined,
    projectType: (resolvedParams.projectType as string) || undefined,
    revenueModel: (resolvedParams.revenueModel as string) || undefined,
    marketFocus: (resolvedParams.marketFocus as string) || undefined,
    currentTraction: (resolvedParams.currentTraction as string) || undefined,
    fundingStage: (resolvedParams.fundingStage as string) || undefined,
    serviceArea: (resolvedParams.serviceArea as string) || undefined,
    equityStake: (resolvedParams.equityStake as string) || undefined,
    universityId: (resolvedParams.universityId as string) || undefined,
    facultyId: (resolvedParams.facultyId as string) || undefined,
    sortBy: (resolvedParams.sortBy as string) || undefined,
    sortOrder: (resolvedParams.sortOrder as string) || undefined,
    limit: 15,
  };

  const initialData = await fetchServer<Project[]>("/projects", {
    params: filters,
  });

  return <ExploreClient initialData={initialData} />;
}
