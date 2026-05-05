import { Skeleton, Card, Divider } from "@heroui/react";

export default function TalentLoading() {
  return (
    <div className="w-full bg-slate-50 md:bg-gray-50 pb-16 md:pb-24 pt-8 md:pt-12 min-h-screen">
      <div className="container flex flex-col lg:flex-row gap-8 lg:gap-12 relative">
        {/* Left Content Column */}
        <div className="flex-1 flex flex-col gap-6 w-full">
          {/* Profile Overview Skeleton */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray2 overflow-hidden flex flex-col">
            {/* Cover Skeleton */}
            <Skeleton className="w-full h-48 md:h-64" />

            <div className="relative px-6 md:px-8 pb-8 flex flex-col pt-0">
              {/* Avatar Skeleton */}
              <div className="relative -mt-16 mb-4">
                <Skeleton className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white" />
              </div>

              {/* Bio Skeleton */}
              <div className="flex flex-col gap-3">
                <Skeleton className="h-8 w-1/3 rounded-lg" />
                <Skeleton className="h-5 w-1/4 rounded-lg" />
                <div className="flex flex-col gap-2 mt-2">
                  <Skeleton className="h-4 w-full rounded-lg" />
                  <Skeleton className="h-4 w-5/6 rounded-lg" />
                </div>
              </div>

              {/* Actions Skeleton */}
              <div className="flex gap-4 mt-8 flex-wrap">
                <Skeleton className="h-12 w-32 rounded-full" />
                <Skeleton className="h-12 w-32 rounded-full" />
              </div>

              <Divider className="my-8" />

              {/* About Skeleton */}
              <div className="flex flex-col gap-6">
                <div>
                  <Skeleton className="h-6 w-24 rounded-lg mb-3" />
                  <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-full rounded-lg" />
                    <Skeleton className="h-4 w-full rounded-lg" />
                    <Skeleton className="h-4 w-2/3 rounded-lg" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <Skeleton className="h-6 w-32 rounded-lg mb-3" />
                    <div className="flex flex-wrap gap-2">
                      {[1, 2, 3, 4].map((i) => (
                        <Skeleton key={i} className="h-8 w-20 rounded-full" />
                      ))}
                    </div>
                  </div>
                  <div>
                    <Skeleton className="h-6 w-32 rounded-lg mb-3" />
                    <div className="flex flex-col gap-2">
                      <Skeleton className="h-4 w-full rounded-lg" />
                      <Skeleton className="h-4 w-3/4 rounded-lg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 w-full">
            <Skeleton className="h-8 w-48 rounded-lg mb-2" />
            {[1, 2].map((i) => (
              <Card
                key={i}
                className="shadow-sm border border-gray2 overflow-hidden p-5"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <Skeleton className="w-full md:w-56 h-36 md:h-40 rounded-xl flex-shrink-0" />
                  <div className="flex-1 flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                      <Skeleton className="h-6 w-1/2 rounded-lg" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Skeleton className="h-4 w-full rounded-lg" />
                      <Skeleton className="h-4 w-full rounded-lg" />
                      <Skeleton className="h-4 w-4/5 rounded-lg" />
                    </div>
                    <div className="mt-auto flex justify-between items-center">
                      <div className="flex gap-4">
                        <Skeleton className="h-6 w-12 rounded-lg" />
                        <Skeleton className="h-6 w-12 rounded-lg" />
                        <Skeleton className="h-6 w-12 rounded-lg" />
                      </div>
                      <Skeleton className="h-8 w-32 rounded-lg" />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Sidebar Skeleton */}
        <div className="w-full lg:w-[320px] xl:w-[380px] flex-shrink-0 relative">
          <div className="sticky top-24">
            <Card className="shadow-sm border border-gray2 flex flex-col overflow-hidden">
              <div className="p-6 pb-4">
                <Skeleton className="h-7 w-2/3 rounded-lg" />
              </div>
              <div className="flex flex-col">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex flex-col px-6 py-4">
                    <div className="flex items-start gap-4 mb-3">
                      <Skeleton className="w-14 h-14 md:w-16 md:h-16 rounded-full flex-shrink-0" />
                      <div className="flex-1 flex flex-col justify-center gap-2">
                        <Skeleton className="h-5 w-3/4 rounded-lg" />
                        <Skeleton className="h-4 w-1/2 rounded-lg" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                      <Skeleton className="h-3 w-full rounded-lg" />
                      <Skeleton className="h-3 w-5/6 rounded-lg" />
                    </div>
                    <Skeleton className="h-10 w-full rounded-lg" />
                    {i < 3 && <Divider className="mt-6" />}
                  </div>
                ))}
              </div>
              <div className="p-6 pt-2 pb-6 flex justify-center">
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
