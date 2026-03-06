import { FiCalendar, FiMapPin } from "react-icons/fi";

export function IdeaHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <h1 className="text-2xl md:text-3xl font-bold text-dark">
        Academic Social Media
      </h1>
      <div className="flex items-center gap-4 text-sm text-gray font-medium">
        <div className="flex items-center gap-2">
          <FiCalendar className="w-4 h-4" />
          <span>23 / 10 / 2025</span>
        </div>
        <div className="flex items-center gap-2">
          <FiMapPin className="w-4 h-4" />
          <span>Egypt, Cairo</span>
        </div>
      </div>
    </div>
  );
}
