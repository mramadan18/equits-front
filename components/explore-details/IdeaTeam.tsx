import { Avatar } from "@heroui/avatar";

export function IdeaTeam() {
  return (
    <div className="flex flex-col gap-5 mt-1">
      <h3 className="text-lg font-bold text-dark">Reach out to the team:</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="flex items-center gap-4">
          <Avatar
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            className="w-14 h-14 text-large"
          />
          <div className="flex flex-col gap-0.5">
            <span className="font-bold text-dark text-sm">Remon Eskander</span>
            <span className="text-xs font-semibold text-gray">
              Product Manager - CEO
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Avatar
            src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
            className="w-14 h-14 text-large"
          />
          <div className="flex flex-col gap-0.5">
            <span className="font-bold text-dark text-sm">Hisham Maher</span>
            <span className="text-xs font-semibold text-gray">
              Backend Developer
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Avatar
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            className="w-14 h-14 text-large"
          />
          <div className="flex flex-col gap-0.5">
            <span className="font-bold text-dark text-sm">Mahmoud</span>
            <span className="text-xs font-semibold text-gray">
              Frontend Developer
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
