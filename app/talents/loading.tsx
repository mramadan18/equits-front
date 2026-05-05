import { Skeleton, Card, CardBody } from "@heroui/react";

const TalentCardSkeleton = () => (
  <Card className="border-1 border-gray-200 shadow-sm rounded-xl overflow-hidden bg-white flex flex-col pt-0 p-0 h-full">
    {/* Cover Image Skeleton */}
    <Skeleton className="h-32 md:h-36 w-full" />

    <CardBody className="p-5 pt-0 relative flex flex-col flex-grow overflow-visible h-full">
      {/* Avatar Skeleton */}
      <Skeleton className="relative w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white -mt-10 md:-mt-12 mb-3 z-10" />

      {/* Info Skeleton */}
      <div className="flex flex-col flex-grow gap-2">
        <Skeleton className="h-6 w-3/4 rounded-lg" />
        <Skeleton className="h-4 w-1/2 rounded-lg" />
        <Skeleton className="h-3 w-1/3 rounded-lg mb-2" />

        <div className="space-y-2 mb-6">
          <Skeleton className="h-3 w-full rounded-lg" />
          <Skeleton className="h-3 w-full rounded-lg" />
          <Skeleton className="h-3 w-full rounded-lg" />
          <Skeleton className="h-3 w-4/5 rounded-lg" />
        </div>
      </div>

      {/* Button Skeleton */}
      <div className="mt-auto pt-2">
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>
    </CardBody>
  </Card>
);

export default function TalentsLoading() {
  return (
    <div className="w-full bg-white pb-16 md:pb-24 pt-8 md:pt-12 min-h-screen">
      <div className="container">
        {/* Search Bar Skeleton */}
        <div className="flex flex-row items-center gap-3 md:gap-4 mb-6 md:mb-8 w-full">
          <Skeleton className="flex-1 h-12 md:h-14 rounded-full" />
          <Skeleton className="h-12 w-12 md:hidden rounded-full flex-shrink-0" />
          <Skeleton className="hidden md:flex h-14 w-40 rounded-full flex-shrink-0" />
        </div>

        {/* Filters Skeleton */}
        <div className="flex items-center w-full gap-2 md:gap-4 mb-6 md:mb-10">
          <div className="flex-shrink-0 pe-2 md:pe-4 border-e-2 border-gray-200">
            <Skeleton className="h-10 md:h-11 w-24 md:w-32 rounded-full" />
          </div>
          <div className="flex flex-1 items-center gap-2 md:gap-3">
            <Skeleton className="h-10 md:h-11 w-24 md:w-32 rounded-full" />
          </div>
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <TalentCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
