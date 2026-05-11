import {
  TalentProfileOverview,
  TalentProjectsList,
  PeopleYouMayNeedSidebar,
} from "@/components/talent-details";
import { fetchServer } from "@/utils/api-utils";
import { Project, User } from "@/types/api";
import { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ talentId: string }>;
}): Promise<Metadata> {
  const { talentId } = await params;

  if (!talentId || isNaN(Number(talentId)) || Number(talentId) <= 0) {
    return { title: "Talent Not Found | Equits" };
  }

  try {
    const res = await fetchServer<User>(`/profile/${talentId}`);
    const talent = res.data;
    const fullName = `${talent.firstName} ${talent.lastName}`;
    return {
      title: `${fullName} | Talent Profile`,
      description:
        talent.overview ||
        `View ${fullName}'s profile, projects, and expertise on Equits.`,
      openGraph: {
        title: fullName,
        description:
          talent.overview || `${fullName}'s talent profile on Equits`,
        images: talent.avatar ? [talent.avatar] : [],
      },
      alternates: { canonical: `/talents/${talentId}` },
    };
  } catch {
    return { title: "Talent Not Found | Equits" };
  }
}
export default async function TalentDetailsPage({
  params,
}: {
  params: Promise<{ talentId: string }>;
}) {
  const { talentId } = await params;

  if (!talentId || isNaN(Number(talentId)) || Number(talentId) <= 0) {
    notFound();
  }

  const [talentRes, projectsRes, relatedRes] = await Promise.allSettled([
    fetchServer<User>(`/profile/${talentId}`, { cache: "no-store" }),
    fetchServer<Project[]>(`/profile/${talentId}/projects`, {
      cache: "no-store",
    }),
    fetchServer<User[]>(`/profile/${talentId}/related`, {
      params: { limit: 3 },
      cache: "no-store",
    }),
  ]);

  if (talentRes.status === "rejected" || !talentRes.value?.data) {
    notFound();
  }

  const talent = talentRes.value.data;
  const projects =
    projectsRes.status === "fulfilled" ? projectsRes.value.data : [];
  const talents =
    relatedRes.status === "fulfilled" ? relatedRes.value.data : [];

  const talentJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: `${talent.firstName} ${talent.lastName}`,
      description: talent.overview || undefined,
      image: talent.avatar || undefined,
      url: `https://equits.net/talents/${talentId}`,
      jobTitle: talent.jobTitle || undefined,
    },
  };

  return (
    <div className="w-full bg-slate-50 md:bg-gray-50 pb-16 md:pb-24 pt-8 md:pt-12 min-h-screen">
      <JsonLd data={talentJsonLd} />
      <div className="container flex flex-col lg:flex-row gap-8 lg:gap-12 relative">
        {/* Left Content Column */}
        <div className="flex-1 flex flex-col gap-6 w-full">
          <TalentProfileOverview talent={talent} />

          <TalentProjectsList projects={projects} />
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-[320px] xl:w-[380px] flex-shrink-0 relative">
          <div className="sticky top-24">
            <PeopleYouMayNeedSidebar talents={talents} />
          </div>
        </div>
      </div>
    </div>
  );
}
