"use client";

import { Avatar } from "@heroui/avatar";
import { Project } from "@/types/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

interface IdeaTeamProps {
  project: Project;
}

export function IdeaTeam({ project }: IdeaTeamProps) {
  const allTeamMembers = [
    ...(project.owner ? [project.owner] : []),
    ...(project.teamMembers || []),
  ];

  if (allTeamMembers.length === 0) return null;

  return (
    <div className="flex flex-col gap-5 mt-1 w-full overflow-hidden">
      <h3 className="text-lg font-medium text-gray2">Reach out to the team:</h3>

      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={24}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="w-full pb-10 team-swiper [&_.swiper-pagination-bullet-active]:!bg-primary [&_.swiper-pagination]:!bottom-0"
      >
        {allTeamMembers.map((member, index) => (
          <SwiperSlide key={index}>
            <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <Avatar
                src={`${member.avatar}`}
                className="w-14 h-14 text-large shrink-0"
              />
              <div className="flex flex-col gap-0.5 overflow-hidden">
                <span className="font-semibold text-dark text-sm truncate">
                  {member.firstName} {member.lastName}
                </span>
                <span className="text-xs font-medium text-gray truncate">
                  {member.jobTitle}
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
