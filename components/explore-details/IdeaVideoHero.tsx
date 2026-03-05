"use client";

import { Avatar } from "@heroui/avatar";
import { FiCopy } from "react-icons/fi";
import { FaPlay } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";

export function IdeaVideoHero() {
  return (
    <div className="relative w-full aspect-video bg-dark rounded-xl sm:rounded-2xl overflow-hidden group shadow-md">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-black/60 z-10" />
      <img
        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
        alt="Video thumbnail"
        className="w-full h-full object-cover opacity-80"
      />

      <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-start text-white bg-gradient-to-b from-black/70 to-transparent z-20">
        <div className="flex items-center gap-3">
          <Avatar
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            size="sm"
            className="border-2 border-white/20"
          />
          <span className="font-semibold text-sm sm:text-base drop-shadow-md">
            رؤية إيرازون المستقبلية | ريمون إسكتدر
          </span>
        </div>
        <button className="flex flex-col items-center gap-1 hover:text-gray-200 transition-colors">
          <FiCopy className="w-5 h-5 drop-shadow-md" />
          <span className="text-xs font-medium drop-shadow-md">Copy link</span>
        </button>
      </div>

      <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-12 bg-[#ff0000] rounded-xl flex flex-col items-center justify-center text-white hover:bg-red-700 transition-colors shadow-lg z-20">
        <FaPlay className="w-5 h-5 ml-1" />
      </button>

      <div className="absolute bottom-4 right-4 text-white z-20">
        <FaYoutube className="w-8 h-8 drop-shadow-md opacity-90" />
      </div>
    </div>
  );
}
