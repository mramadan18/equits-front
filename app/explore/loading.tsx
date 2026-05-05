"use client";
import { Skeleton, Card, CardBody } from "@heroui/react";

export default function ExploreLoading() {
  return (
    <div className="w-full bg-white pb-16 md:pb-24 pt-8 md:pt-12 min-h-screen">
      <div className="container">
        {/* Search Bar Skeleton */}
        <div className="flex gap-4 mb-8">
          <Skeleton className="flex-1 h-12 md:h-14 rounded-full" />
          <Skeleton className="hidden md:block w-40 h-14 rounded-full" />
        </div>

        {/* Filters Skeleton */}
        <div className="flex gap-3 mb-10 overflow-hidden">
          <div className="flex-shrink-0 pe-4 border-e-2 border-gray-100">
            <Skeleton className="w-24 h-10 rounded-full" />
          </div>
          <div className="flex gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton
                key={i}
                className="w-28 md:w-32 h-10 rounded-full flex-shrink-0"
              />
            ))}
          </div>
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card
              key={i}
              className="h-[430px] shadow-sm border border-gray-100 rounded-2xl overflow-hidden"
            >
              <Skeleton className="h-48" />
              <CardBody className="p-5 flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-2 w-3/4">
                    <Skeleton className="h-6 w-full rounded-lg" />
                    <Skeleton className="h-4 w-2/3 rounded-lg" />
                  </div>
                  <Skeleton className="w-12 h-12 rounded-full flex-shrink-0" />
                </div>

                <div className="flex flex-col gap-2 mt-2">
                  <Skeleton className="h-3 w-full rounded-lg" />
                  <Skeleton className="h-3 w-full rounded-lg" />
                  <Skeleton className="h-3 w-4/5 rounded-lg" />
                </div>

                <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-50">
                  <div className="flex gap-2">
                    <Skeleton className="w-8 h-4 rounded-lg" />
                    <Skeleton className="w-8 h-4 rounded-lg" />
                  </div>
                  <Skeleton className="w-28 h-10 rounded-full" />
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
