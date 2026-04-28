import { ExploreSearchBar } from "@/components/explore/ExploreSearchBar";
import { ExploreFilters } from "@/components/explore/ExploreFilters";
import { FeedGrid } from "@/components/home/FeedGrid";
import { FeedProfileCard } from "@/components/home/FeedProfileCard";
import { PeopleYouMayNeedSidebar } from "@/components/talent-details";
import { MOCK_TALENT_DETAILS } from "@/components/talent-details/mockData";

export default function HomePage() {
  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Feed */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <ExploreSearchBar />
          <ExploreFilters />
          <FeedGrid />
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <FeedProfileCard talent={MOCK_TALENT_DETAILS} />
          <PeopleYouMayNeedSidebar />
        </div>
      </div>
    </div>
  );
}
