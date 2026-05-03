import {
  TalentProfileOverview,
  TalentProjectsList,
  PeopleYouMayNeedSidebar,
} from "@/components/talent-details";
import { fetchServer } from "@/utils/api-utils";
import { Project, User } from "@/types/api";

export default async function TalentDetailsPage({
  params,
}: {
  params: Promise<{ talentId: string }>;
}) {
  const { talentId } = await params;

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

  const talent =
    talentRes.status === "fulfilled" ? talentRes.value.data : ({} as User);
  const projects =
    projectsRes.status === "fulfilled" ? projectsRes.value.data : [];
  const talents =
    relatedRes.status === "fulfilled" ? relatedRes.value.data : [];

  return (
    <div className="w-full bg-slate-50 md:bg-gray-50 pb-16 md:pb-24 pt-8 md:pt-12 min-h-screen">
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
