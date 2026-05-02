import {
  TalentProfileOverview,
  TalentExperiencesList,
  PeopleYouMayNeedSidebar,
} from "@/components/talent-details";
import { ApiResponse, User } from "@/types/api";

export default async function TalentDetailsPage({
  params,
}: {
  params: Promise<{ talentId: string }>;
}) {
  const { talentId } = await params;
  let talent: User | undefined = {} as User;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/profile/${talentId}`,
      {
        cache: "no-store",
      },
    );
    const data: ApiResponse<User> = await res.json();
    talent = data.data;
  } catch {}

  return (
    <div className="w-full bg-slate-50 md:bg-gray-50 pb-16 md:pb-24 pt-8 md:pt-12 min-h-screen">
      <div className="container flex flex-col lg:flex-row gap-8 lg:gap-12 relative">
        {/* Left Content Column */}
        <div className="flex-1 flex flex-col gap-6 w-full">
          <TalentProfileOverview talent={talent} />

          {/* <TalentExperiencesList talent={talent} /> */}
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-[320px] xl:w-[380px] flex-shrink-0 relative">
          <div className="sticky top-24">
            {/* <PeopleYouMayNeedSidebar /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
