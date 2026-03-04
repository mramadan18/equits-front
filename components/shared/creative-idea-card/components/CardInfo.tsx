import { IoCalendarOutline, IoLocationOutline } from "react-icons/io5";

interface CardInfoProps {
  date: string;
  location: string;
}

export const CardInfo = ({ date, location }: CardInfoProps) => (
  <div className="flex items-center gap-6 mb-6 text-sm text-gray2 font-medium">
    <div className="flex items-center gap-2">
      <IoCalendarOutline className="text-gray2 text-lg" />
      <span>{date}</span>
    </div>
    <div className="flex items-center gap-2">
      <IoLocationOutline className="text-gray2 text-lg" />
      <span>{location}</span>
    </div>
  </div>
);
