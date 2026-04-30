import { Skeleton } from "@heroui/skeleton";
import { Card, CardBody } from "@heroui/card";
import { Divider } from "@heroui/divider";

export const ProjectSkeleton = () => {
  return (
    <div className="w-full bg-white pb-16 md:pb-24 pt-8 md:pt-12 min-h-screen">
      <div className="container flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Main Content Column */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Header Skeleton */}
          <div className="flex items-start justify-between">
            <div className="flex gap-4 items-center">
              <Skeleton className="w-12 h-12 rounded-full" />
              <div className="flex flex-col gap-2">
                <Skeleton className="h-5 w-32 rounded-lg" />
                <Skeleton className="h-3 w-24 rounded-lg" />
              </div>
            </div>
            <div className="flex flex-col gap-2 items-end">
              <Skeleton className="h-4 w-24 rounded-lg" />
              <Skeleton className="h-3 w-16 rounded-lg" />
            </div>
          </div>

          <Skeleton className="h-8 w-2/3 rounded-lg mt-2" />

          {/* Video Hero Skeleton */}
          <Skeleton className="w-full aspect-video rounded-xl mt-2" />

          {/* Engagement Stats Skeleton */}
          <div className="flex justify-between items-center mt-2">
            <div className="flex gap-6">
              <Skeleton className="h-6 w-24 rounded-lg" />
              <Skeleton className="h-6 w-24 rounded-lg" />
            </div>
            <Skeleton className="h-8 w-24 rounded-full" />
          </div>

          <Divider className="my-2 bg-gray-200" />

          {/* Comments/Reviews Section Skeleton */}
          <div className="flex justify-between items-center mt-2">
            <div className="flex gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-6 w-6 rounded-full" />
              ))}
              <Skeleton className="h-6 w-16 rounded-lg ml-2" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-6 w-20 rounded-lg" />
            </div>
          </div>

          {/* Elevator Pitch / Content Skeleton */}
          <div className="flex flex-col gap-3 mt-4">
            <Skeleton className="h-4 w-full rounded-lg" />
            <Skeleton className="h-4 w-full rounded-lg" />
            <Skeleton className="h-4 w-4/5 rounded-lg" />
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-[380px] flex flex-col gap-6">
          <Card className="shadow-md border border-gray-100">
            <CardBody className="p-4 flex flex-col gap-3">
              {/* Sidebar Action Buttons Skeleton */}
              <Skeleton className="h-12 w-full rounded-lg" />
              <Skeleton className="h-12 w-full rounded-lg" />
              <Skeleton className="h-12 w-full rounded-lg" />
              <Skeleton className="h-12 w-full rounded-lg" />
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};
