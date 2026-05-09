import { ProjectSkeleton } from "@/components/explore-details";

export default function Loading() {
  return (
    <div className="w-full bg-gray-50/50 pb-16 md:pb-24 pt-4 md:pt-8 min-h-screen">
      <div className="container">
        <ProjectSkeleton />
      </div>
    </div>
  );
}
