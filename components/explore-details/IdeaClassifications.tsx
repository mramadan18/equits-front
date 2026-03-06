import { Chip } from "@heroui/chip";

export function IdeaClassifications() {
  return (
    <div className="flex flex-col gap-5 mt-1">
      <h3 className="text-lg font-bold text-dark">Classifications:</h3>

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
            Education
          </Chip>
          <Chip
            radius="sm"
            classNames={{
              base: "bg-gray3 text-dark font-semibold h-8 px-1",
            }}
          >
            Communication
          </Chip>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
        <span className="text-sm font-semibold text-gray2 min-w-[120px]">
          Type:
        </span>
        <div className="flex flex-wrap gap-2">
          <Chip
            radius="sm"
            classNames={{
              base: "bg-gray3 text-dark font-semibold h-8 px-1",
            }}
          >
            Software (SAAS)
          </Chip>
          <Chip
            radius="sm"
            classNames={{
              base: "bg-gray3 text-dark font-semibold h-8 px-1",
            }}
          >
            Web App
          </Chip>
          <Chip
            radius="sm"
            classNames={{
              base: "bg-gray3 text-dark font-semibold h-8 px-1",
            }}
          >
            Mobile App
          </Chip>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
        <span className="text-sm font-semibold text-gray2 min-w-[120px]">
          Business Model:
        </span>
        <div className="flex flex-wrap gap-2">
          <Chip
            radius="sm"
            classNames={{
              base: "bg-gray3 text-dark font-semibold h-8 px-1",
            }}
          >
            Commission Marketplace
          </Chip>
        </div>
      </div>

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
            MVP (Minimum Viable Product)
          </Chip>
        </div>
      </div>
    </div>
  );
}
