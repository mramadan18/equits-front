import { TalentsSearchBar } from "@/components/talents/TalentsSearchBar";
import { TalentsGrid } from "@/components/talents/TalentsGrid";
import { ApiResponse, PaginationData, User } from "@/types/api";
import { TalentsFilters } from "@/components/talents/TalentsFilters";

export default async function TalentsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const params = await searchParams;
  const search = params.search || "";
  const page = params.page || "1";

  let allProfiles: User[] = [];
  let pagination: PaginationData = {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  };

  try {
    const queryParams = new URLSearchParams();
    if (search) queryParams.append("search", search);
    if (page) queryParams.append("page", page);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/profile?${queryParams.toString()}`,
    );
    const data: ApiResponse<User[]> = await response.json();
    allProfiles = data.data || [];
    pagination = data.pagination || pagination;
  } catch {}

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
