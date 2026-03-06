"use client";

import { Button } from "@heroui/button";
import {
  FiMessageSquare,
  FiBookmark,
  FiExternalLink,
  FiVideo,
} from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa6";

export function IdeaActionSidebar() {
  return (
    <div className="w-full lg:w-[340px] xl:w-[380px] flex-shrink-0 mt-8 lg:mt-0">
      <div className="lg:sticky lg:top-28 flex flex-col gap-5">
        <h3 className="text-sm font-semibold text-gray px-1">Actions:</h3>

        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-card flex flex-col gap-3.5">
          <Button
            variant="bordered"
            className="w-full justify-start py-6 border-gray-200 text-dark2 font-semibold hover:bg-gray-50 transition-colors text-base"
            startContent={<FaStar className="w-5 h-5 text-secondary mr-2" />}
          >
            Give a quick rating
          </Button>

          <Button
            variant="bordered"
            className="w-full justify-start py-6 border-gray-200 text-dark2 font-semibold hover:bg-gray-50 transition-colors text-base"
            startContent={
              <FiMessageSquare className="w-5 h-5 text-[#8ac760] mr-2" />
            }
          >
            Leave your Opinion
          </Button>

          <Button
            variant="bordered"
            className="w-full justify-start py-6 border-gray-200 text-dark2 font-semibold hover:bg-gray-50 transition-colors text-base"
            startContent={
              <FiExternalLink className="w-5 h-5 text-gray-400 mr-2" />
            }
          >
            Demo Link
          </Button>

          <Button
            variant="bordered"
            className="w-full justify-start py-6 border-gray-200 text-dark2 font-semibold hover:bg-gray-50 transition-colors text-base"
            startContent={<FiBookmark className="w-5 h-5 text-gray-400 mr-2" />}
          >
            Save For Later
          </Button>

          <Button
            color="primary"
            className="w-full justify-start py-6 mt-1 font-semibold text-base shadow-md"
            startContent={<FiVideo className="w-5 h-5 mr-2" />}
          >
            Request Meeting
          </Button>
        </div>

        <div className="flex items-center gap-3.5 px-1 mt-2">
          <a
            href="#"
            className="w-11 h-11 rounded-xl bg-[#1877F2] text-white flex items-center justify-center hover:bg-blue-700 transition-colors shadow-sm"
          >
            <FaFacebook className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#FFDC80] via-[#F56040] to-[#833AB4] text-white flex items-center justify-center hover:opacity-90 transition-opacity shadow-sm"
          >
            <FaInstagram className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="w-11 h-11 rounded-xl bg-[#0A66C2] text-white flex items-center justify-center hover:bg-blue-800 transition-colors shadow-sm"
          >
            <FaLinkedin className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="w-11 h-11 rounded-xl bg-[#FF0000] text-white flex items-center justify-center hover:bg-red-700 transition-colors shadow-sm"
          >
            <FaYoutube className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
}
