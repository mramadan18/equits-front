"use client";

import { TalentsSearchBar } from "@/components/talents/TalentsSearchBar";
import { TalentsFilters } from "@/components/talents/TalentsFilters";
import { TalentsGrid } from "@/components/talents/TalentsGrid";

export default function TalentsPage() {
  return (
    <div className="w-full bg-white pb-16 md:pb-24 pt-8 md:pt-12 min-h-screen">
      <div className="container">
        <TalentsSearchBar />
        <TalentsFilters />
        <TalentsGrid />
      </div>
    </div>
  );
}
