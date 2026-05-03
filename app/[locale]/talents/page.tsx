import { TalentsSearchBar } from "@/components/talents/TalentsSearchBar";
import { TalentsGrid } from "@/components/talents/TalentsGrid";
import { TalentsFilters } from "@/components/talents/TalentsFilters";
import { fetchServer } from "@/utils/api-utils";
import { PaginationData, User } from "@/types/api";

export default async function TalentsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const params = await searchParams;
  const {
    search,
    page = "1",
    userType = "TALENT",
    experienceLevel,
    location,
    universityId,
    facultyId,
  } = params;

  let allProfiles: User[] = [];
  let pagination: PaginationData = {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  };

  try {
    const data = await fetchServer<User[]>("/profile", {
      params: {
        search,
        page,
        userType: userType === "all" ? undefined : userType,
        experienceLevel:
          experienceLevel === "all" ? undefined : experienceLevel,
        serviceArea: location === "all" ? undefined : location,
        universityId: universityId === "all" ? undefined : universityId,
        facultyId: facultyId === "all" ? undefined : facultyId,
      },
      cache: "no-store",
    });
    allProfiles = data.data || [];
    pagination = data.pagination || pagination;
  } catch (error) {
    console.error("Failed to fetch profiles for talents page:", error);
  }

  return (
    <div className="w-full bg-white pb-16 md:pb-24 pt-8 md:pt-12 min-h-screen">
      <div className="container">
        <TalentsSearchBar />
        <TalentsFilters />
        <TalentsGrid profiles={allProfiles} pagination={pagination} />
      </div>
    </div>
  );
}
