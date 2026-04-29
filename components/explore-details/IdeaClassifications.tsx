import { Chip } from "@heroui/chip";
import { Project } from "@/types/api";

interface IdeaClassificationsProps {
  project: Project;
}

export function IdeaClassifications({ project }: IdeaClassificationsProps) {
  return (
    <div className="flex flex-col gap-5 mt-1">
      <h3 className="text-lg font-medium text-gray2">Classifications:</h3>

      {project?.industry && (
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <span className="text-sm font-semibold text-gray2 min-w-[120px]">
            Industry:
          </span>
          <div className="flex flex-wrap gap-2">
            <Chip
              radius="sm"
              classNames={{
                base: "bg-gray3 text-dark font-semibold h-8 px-1",
              }}
            >
              {project?.industry?.name}
            </Chip>
            {project?.subIndustries?.map((sub) => (
              <Chip
                key={sub.id}
                radius="sm"
                classNames={{
                  base: "bg-gray3 text-dark font-semibold h-8 px-1",
                }}
              >
                {sub.name}
              </Chip>
            ))}
          </div>
        </div>
      )}

      {project?.projectTypes && project?.projectTypes.length > 0 && (
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <span className="text-sm font-semibold text-gray2 min-w-[120px]">
            Type:
          </span>
          <div className="flex flex-wrap gap-2">
            {project.projectTypes.map((type: string, index: number) => (
              <Chip
                key={index}
                radius="sm"
                classNames={{
                  base: "bg-gray3 text-dark font-semibold h-8 px-1",
                }}
              >
                {type}
              </Chip>
            ))}
          </div>
        </div>
      )}

      {project.revenueModel && (
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <span className="text-sm font-semibold text-gray2 min-w-[120px]">
            Revenue Model:
          </span>
          <div className="flex flex-wrap gap-2">
            <Chip
              radius="sm"
              classNames={{
                base: "bg-gray3 text-dark font-semibold h-8 px-1",
              }}
            >
              {project.revenueModel}
            </Chip>
          </div>
        </div>
      )}

      {project?.stage && (
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <span className="text-sm font-semibold text-gray2 min-w-[120px]">
            Stage:
          </span>
          <div className="flex flex-wrap gap-2">
            <Chip
              radius="sm"
              classNames={{
                base: "bg-gray3 text-dark font-semibold h-8 px-1",
              }}
            >
              {project?.stage}
            </Chip>
          </div>
        </div>
      )}
      {project?.marketFocus && (
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <span className="text-sm font-semibold text-gray2 min-w-[120px]">
            Market Focus:
          </span>
          <div className="flex flex-wrap gap-2">
            <Chip
              radius="sm"
              classNames={{
                base: "bg-gray3 text-dark font-semibold h-8 px-1",
              }}
            >
              {project?.marketFocus}
            </Chip>
          </div>
        </div>
      )}
      {project?.serviceArea && (
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <span className="text-sm font-semibold text-gray2 min-w-[120px]">
            Service Area:
          </span>
          <div className="flex flex-wrap gap-2">
            <Chip
              radius="sm"
              classNames={{
                base: "bg-gray3 text-dark font-semibold h-8 px-1",
              }}
            >
              {project?.serviceArea}
            </Chip>
          </div>
        </div>
      )}
    </div>
  );
}
