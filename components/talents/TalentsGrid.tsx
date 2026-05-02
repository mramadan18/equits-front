"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { TalentCard } from "./TalentCard";
import { PaginationData, User } from "@/types/api";
import { Pagination } from "@heroui/pagination";

export const TalentsGrid = ({
  profiles,
  pagination,
}: {
  profiles: User[];
  pagination: PaginationData;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`, { scroll: true });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {profiles.map((item) => (
        <TalentCard key={item.id} item={item} />
      ))}{" "}
      {pagination.totalPages > 1 && (
        <div className="col-span-full flex items-center justify-center pt-8 border-t border-gray-100">
          <Pagination
            showControls
            total={pagination.totalPages}
            page={pagination.page}
            onChange={handlePageChange}
            color="primary"
            variant="flat"
            radius="full"
          />
        </div>
      )}
    </div>
  );
};
