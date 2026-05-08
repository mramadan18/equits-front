import { TalentsSearchBar } from "@/components/talents/TalentsSearchBar";
import { TalentsGrid } from "@/components/talents/TalentsGrid";
import { TalentsFilters } from "@/components/talents/TalentsFilters";
import { fetchServer } from "@/utils/api-utils";
import { User } from "@/types/api";
import { PaginationData } from "@/types/filters";

export default async function TalentsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const {
    search,
    page = "1",
    userType = "TALENT",
    experienceLevel,
    cityId,
    universityId,
    facultyId,
  } = params;

  // Helper to normalize params to string array or undefined
  const normalizeParam = (val: string | string[] | undefined) => {
    if (!val || val === "all") return undefined;
    if (Array.isArray(val)) return val;
    return val.split(",");
  };

  let allProfiles: User[] = [];
  let pagination: PaginationData = {
    total: 0,
    page: 1,
    limit: 16,
    totalPages: 0,
  };

  try {
    const data = await fetchServer<User[]>("/profile", {
      params: {
        search: Array.isArray(search) ? search[0] : search,
        page: Array.isArray(page) ? page[0] : page,
        userType: userType === "all" ? undefined : userType,
        experienceLevel: normalizeParam(experienceLevel),
        universityId: normalizeParam(universityId),
        facultyId: normalizeParam(facultyId),
        cityId: normalizeParam(cityId),
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
