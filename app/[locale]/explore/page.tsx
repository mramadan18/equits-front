"use client";

import { ExploreSearchBar } from "@/components/explore/ExploreSearchBar";
import { ExploreFilters } from "@/components/explore/ExploreFilters";
import { ExploreGrid } from "@/components/explore/ExploreGrid";

export default function ExplorePage() {
  return (
    <div className="w-full bg-white pb-16 md:pb-24 pt-8 md:pt-12 min-h-screen">
      <div className="container">
        <ExploreSearchBar />
        <ExploreFilters />
        <ExploreGrid />
      </div>
    </div>
  );
}
