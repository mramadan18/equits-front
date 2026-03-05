"use client";

import { Divider } from "@heroui/divider";
import {
  IdeaHeader,
  IdeaVideoHero,
  IdeaEngagement,
  IdeaElevatorPitch,
  IdeaClassifications,
  IdeaTeam,
  IdeaBusinessPlan,
  IdeaActionSidebar,
} from "@/components/explore-details";

export default function IdeaDetailsPage() {
  return (
    <div className="w-full bg-white pb-16 md:pb-24 pt-8 md:pt-12 min-h-screen">
      <div className="container flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Left Content Column */}
        <div className="flex-1 flex flex-col gap-6">
          <IdeaHeader />
          <IdeaVideoHero />
          <IdeaEngagement />
          <IdeaElevatorPitch />

          <Divider className="my-1 sm:my-3 bg-gray-200" />
          <IdeaClassifications />

          <Divider className="my-1 sm:my-3 bg-gray-200" />
          <IdeaTeam />

          <Divider className="my-1 sm:my-3 bg-gray-200" />
          <IdeaBusinessPlan />
        </div>

        {/* Right Sidebar */}
        <IdeaActionSidebar />
      </div>
    </div>
  );
}
