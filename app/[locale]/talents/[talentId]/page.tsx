"use client";

import {
  TalentProfileOverview,
  TalentExperiencesList,
  PeopleYouMayNeedSidebar,
  MOCK_TALENT_DETAILS,
} from "@/components/talent-details";

export default function TalentDetailsPage() {
  const talent = MOCK_TALENT_DETAILS;

  return (
    <div className="w-full bg-slate-50 md:bg-gray-50 pb-16 md:pb-24 pt-8 md:pt-12 min-h-screen">
      <div className="container flex flex-col lg:flex-row gap-8 lg:gap-12 relative">
        {/* Left Content Column */}
        <div className="flex-1 flex flex-col gap-6 w-full">
          <TalentProfileOverview talent={talent} />

          <TalentExperiencesList experiences={talent.experiences} />
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-[320px] xl:w-[380px] flex-shrink-0 relative">
          <div className="sticky top-24">
            <PeopleYouMayNeedSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
